import { defineConfig } from "astro/config";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
    integrations: [icon(), svelte(), pagefind()],
    output: "static",
    prefetch: {
        prefetchAll: true,
    },
});
