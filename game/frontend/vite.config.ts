/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3331,
    },
    base: "/graph-algorithm-game/",
    plugins: [vue()],
    test: {
        globals: true,
        environment: "jsdom",
    },
});
