import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/tolpar/",
  publicDir: "public",
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  build: {
    outDir: "dist-tolpar-static",
    emptyOutDir: true,
    rollupOptions: {
      input: "static-tolpar.html",
    },
  },
});
