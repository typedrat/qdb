<script lang="ts" context="module">
    import { onMount } from "svelte";

    interface Pagefind {
        search: (query: string) => Promise<PagefindResponse>;
        debouncedSearch: (query: string) => Promise<PagefindResponse | null>;
        init: () => void;
    }

    interface PagefindResponse {
        results: PagefindResult[];
    }

    interface PagefindResult {
        id: string;
        data: () => Promise<PagefindDocument>;
    }

    interface PagefindDocument {
        url: string;
        excerpt: string;
        meta: {
            title: string;
            image: string;
        };
    }

    async function importPagefind(): Promise<Pagefind> {
        const url = new URL("/pagefind/pagefind.js", window.location.href).href;
        console.log("url", url);
        return await import(/* @vite-ignore */ url);
    }
</script>

<script lang="ts">
    let pagefind: Pagefind;

    onMount(async () => {
        pagefind = await importPagefind();
    });

    import type { FormEventHandler } from "svelte/elements";

    let searchResults: PagefindResult[] = [];

    const search: FormEventHandler<HTMLInputElement> = async (event) => {
        const results = await pagefind.debouncedSearch(
            event.currentTarget.value
        );

        if (results) {
            searchResults = results.results;
        }
    };
</script>

<input
    class="search-bar"
    type="search"
    placeholder="Search"
    aria-label="Search"
    on:focusin|once={() => pagefind.init()}
    on:input={search}
/>
<div class="results-wrapper">
    <div class="search-results">
        {#each searchResults as result}
            {#await result.data() then resultData}
                <a class="search-result" href={resultData.url}>
                    <h6>{resultData.meta.title}</h6>
                    {@html resultData.excerpt}
                </a>
            {/await}
        {/each}
    </div>
</div>

<style>
    h6 {
        margin-bottom: calc(0.5 * var(--pico-typography-spacing-vertical));
    }

    .results-wrapper {
        position: relative;
    }

    .search-results {
        position: absolute;
        top: var(--pico-block-spacing-vertical);
        right: 0;
        z-index: 10;

        background: var(--pico-card-background-color);
        box-shadow: var(--pico-box-shadow);
        font-size: 0.875rem;
    }

    .search-result {
        margin: 0 var(--pico-block-spacing-horizontal);
        color: unset;
    }

    .search-result:not(:last-of-type) {
        border-radius: unset;
        border-bottom: solid 1px;
    }

    .search-result:hover {
        text-decoration: none;
    }
</style>
