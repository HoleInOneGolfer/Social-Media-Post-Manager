import { defineConfig } from "vite";

export default defineConfig({
  base: "/Social-Media-Post-Manager/",
  server: {
    host: "localhost",
    port: 8080,
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
