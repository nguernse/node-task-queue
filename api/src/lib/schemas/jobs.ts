import { z } from "zod";

export const ScrapeJobSchema = z.object({
  name: z.enum(["metadata", "pdf", "screenshot"], {
    invalid_type_error: "Invalid Scrape Job",
  }),
  data: z.object({
    url: z.string().url({
      message: "Invalid URL",
    }),
  }),
});
