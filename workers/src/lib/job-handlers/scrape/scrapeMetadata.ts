import { Metadata } from "@/lib/definitions";
import { Page } from "puppeteer";

export default async function scrapeMetadata(page: Page): Promise<Metadata> {
  const metadata: Metadata = {
    url: page.url(),
    title: await parseTitle(page),
    description: await parseDescription(page),
    image_url: await parseImageUrl(page),
  };

  return Object.fromEntries(
    Object.entries(metadata).filter(
      ([_, value]) => typeof value !== "undefined"
    )
  );
}

const getValue = async (
  page: Page,
  selectors: string[]
): Promise<string | undefined> => {
  try {
    for (let i = 0; i < selectors.length; i += 1) {
      const value = await page.$eval(selectors[i], (el: any) => {
        if (el.hasAttribute("content")) {
          return el.getAttribute("content");
        } else if (el.textContent !== "") {
          return el.textContent;
        }

        return undefined;
      });

      if (value) return value;
    }
  } catch (error: any) {
    console.log("Failed to get value:", error.message);
  }

  return undefined;
};

const parseTitle = async (page: Page): Promise<string | undefined> => {
  return getValue(page, [
    'meta[name^="og:title"],[property^="og:title"]',
    'meta[name^="twitter:title"],[property^="twitter:title"]',
    'meta[name^="DC.title"],[property^="DC.title"]',
    "title",
  ]);
};

const parseDescription = async (page: Page): Promise<string | undefined> => {
  return getValue(page, [
    'meta[name^="og:description"],[property^="og:description"]',
    'meta[name^="twitter:description"],[property^="twitter:description"]',
    'meta[name^="DC.description"],[property^="DC.description"]',
    "description",
  ]);
};

const parseImageUrl = async (page: Page): Promise<string | undefined> => {
  return getValue(page, [
    'meta[name^="og:image"],[property^="og:image"]',
    'meta[name^="twitter:image"],[property^="twitter:image"]',
    'meta[name^="DC.image"],[property^="DC.image"]',
    "image",
  ]);
};
