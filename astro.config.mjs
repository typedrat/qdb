import { defineConfig } from "astro/config";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [icon()],
    output: "hybrid",
    adapter: cloudflare({
        imageService: "cloudflare",
        runtime: { mode: "local", type: "pages" },
    }),
});
