import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { renameSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  base: "/tolpar/",
  publicDir: "public",
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    {
      name: "rename-html",
      closeBundle() {
        const out = resolve(__dirname, "dist-tolpar-static");
        renameSync(`${out}/static-tolpar.html`, `${out}/index.html`);
      },
    },
  ],
  build: {
    outDir: "dist-tolpar-static",
    emptyOutDir: true,
    rollupOptions: {
      input: "static-tolpar.html",
    },
  },
});
