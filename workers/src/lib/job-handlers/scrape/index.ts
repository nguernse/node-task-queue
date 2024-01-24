import puppeteer, { Page } from "puppeteer";
import scrapeMetadata from "./scrapeMetadata";
import scrapePDF from "./scrapePDF";

import Config from "@/lib/config";
import { ScrapeAction, ScrapeJob } from "@/lib/definitions";

export default async function scrape(job: ScrapeJob, retries: number = 3) {
  const {
    name,
    data: { url },
  } = job;
  let browser;

  try {
    // connect to browserless, running on docker container
    browser = await puppeteer.connect({
      browserWSEndpoint: Config.browserlessConnection,
    });

    // create a page instance with puppeteer
    const page = await browser.newPage();

    // limit the resources loaded, since we only need metadata
    // we don't care about styling, fonts, images, etc.,
    // just load html and javascript (JS sometimes inserts additional metadata - like ld+json)
    await page.setRequestInterception(true);

    page.on("request", (interceptedRequest) => {
      if (
        /image|stylesheet|font|media/.test(interceptedRequest.resourceType()) &&
        !interceptedRequest.isInterceptResolutionHandled()
      ) {
        return interceptedRequest.respond({ status: 200, body: "ignored" });
      }

      return interceptedRequest.continue();
    });

    // navigate to URL prior to processing
    await page.goto(url, { waitUntil: "networkidle2" });

    // process scrape based on action type
    const result = await handleScrape(name, page);

    return result;
  } catch (e: any) {
    console.log("Error scraping:", e.message);

    if (retries > 0) {
      return scrape(job, retries - 1);
    }
  } finally {
    // close browse once done
    if (browser) {
      await browser.close();
    }
  }

  return null;
}

function handleScrape(action: ScrapeAction, page: Page) {
  switch (action) {
    case "metadata":
      return scrapeMetadata(page);
    case "pdf":
      return scrapePDF(page);
    default:
      return null;
  }
}
