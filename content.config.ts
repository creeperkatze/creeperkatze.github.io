import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blogs: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        date: z.date(),
        lang: z.string(),
        tags: z.array(z.string()),
      }),
    }),
    legal: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
  },
});
