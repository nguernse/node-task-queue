import { Page } from "puppeteer";

export default async function scrapePDF(page: Page): Promise<Buffer> {
  const pdf = await page.pdf();

  return pdf;
}
