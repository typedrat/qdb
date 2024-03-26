<script lang="ts">
    import Reservoir from "reservoir";
    import Quote, { quoteSchema } from "./Quote.svelte";

    export let ids: number[] = [];
    export let len = 25;

    const randomIds = Reservoir<number>(len);
    randomIds.pushSome(...ids);

    const quotesPromise = Promise.all(
        randomIds.map(async (id) => {
            const res = await fetch(`/quote/${id}.json`);
            return quoteSchema.parse(await res.json());
        })
    );
</script>

{#await quotesPromise then quotes}
    {#each quotes as quote}
        <Quote data={quote} />
    {/each}
{/await}
