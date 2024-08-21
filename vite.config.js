import { defineConfig } from "vite";

import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "/Social-Media-Post-Manager/",
  server: {},
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
