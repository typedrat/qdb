import { z, defineCollection } from "astro:content";

const quotesCollection = defineCollection({
    type: 'data',
    schema: z.object({
         id: z.number(),
         score: z.number(),
         lines: z.string().array()
    })
});

export const collections = {
    quotes: quotesCollection
};
