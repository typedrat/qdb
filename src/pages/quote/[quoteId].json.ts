import type { APIRoute, GetStaticPaths } from "astro";

import quotes from "../_quotes.json";

export const getStaticPaths = (() => {
    return quotes.map(({ id }) => ({
        params: {
            quoteId: id.toString(),
        },
    }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
    const rawQuoteId = params.quoteId!;
    const quoteId = parseInt(rawQuoteId, 10);
    const quoteData = quotes.find((quote) => quote.id === quoteId)!;

    return new Response(JSON.stringify(quoteData), {
        headers: { "Content-Type": "application/json" },
    });
};
