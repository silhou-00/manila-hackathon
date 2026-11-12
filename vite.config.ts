// Vite config. React plus Tailwind v4, the @ alias for src, and a relative base so the
// built site in docs/ works from GitHub Pages under /manila-hackathon/.
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "docs",
        emptyOutDir: true,
    },
});
