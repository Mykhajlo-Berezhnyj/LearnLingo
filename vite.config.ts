import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  define: {
    "import.meta.env.BUILD_VERSION": JSON.stringify(Date.now()),
  },
});
