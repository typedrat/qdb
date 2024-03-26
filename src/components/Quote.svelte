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
        <h1>
            <a href="/quote/{data.id}">#{data.id}</a>
            (<span class={scoreClass(data.score)}>{data.score}</span>)
        </h1>
    </header>

    {#each data.lines as line}
        <span class="line">{line} <br /></span>
    {/each}
</article>

<style>
    article,
    h1 {
        font-family: var(--pico-font-family-monospace);
    }

    header {
        font-size: 1.25rem;
    }

    h1 {
        font-size: unset;
        font-weight: unset;
        line-height: unset;
        margin-bottom: unset;
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
