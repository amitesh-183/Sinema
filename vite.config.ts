import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom")) return "vendor-react-dom";
          if (id.includes("node_modules/react/")) return "vendor-react";
          if (id.includes("node_modules/react-router")) return "vendor-router";
          if (id.includes("node_modules/motion")) return "vendor-motion";
          if (id.includes("node_modules/@tanstack/react-query")) return "vendor-query";
          if (id.includes("node_modules/axios")) return "vendor-axios";
          if (id.includes("node_modules/embla-carousel")) return "vendor-embla";
          if (id.includes("node_modules/@radix-ui")) return "vendor-radix";
          if (id.includes("node_modules/lucide-react")) return "vendor-lucide";
        },
      },
    },
    chunkSizeWarningLimit: 200,
  },
});
