import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
  },
  envPrefix: "VITE_",
  define: {
    global: "globalThis",
    "process.env": "import.meta.env",
  },
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  optimizeDeps: {
    include: ["process", "moment"],
  },
  esbuild: {
    target: "esnext",
  },
});
