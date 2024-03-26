<script lang="ts" context="module">
    import { z } from "zod";

    export interface QuoteData {
        id: number;
        score: number;
        lines: string[];
    }

    export const quoteSchema = z.object({
        id: z.number(),
        lines: z.array(z.string()),
        score: z.number(),
    });
</script>

<script lang="ts">
    export let data: QuoteData;

    function scoreClass(score: number): "positive" | "neutral" | "negative" {
        if (score > 0) {
            return "positive";
        } else if (score == 0) {
            return "neutral";
        } else {
            return "negative";
        }
    }
</script>

<article>
    <header>
        <a href="/quote/{data.id}">#{data.id}</a>
        (<span class={scoreClass(data.score)}>{data.score}</span>)
    </header>

    {#each data.lines as line}
        <span class="line">{line}</span>
        <br />
    {/each}
</article>

<style>
    article {
        font-family: var(--pico-font-family-monospace);
    }

    header {
        font-size: 1.25rem;
    }

    .positive {
        color: green;
    }

    .neutral {
        color: yellow;
    }

    .negative {
        color: red;
    }
</style>
