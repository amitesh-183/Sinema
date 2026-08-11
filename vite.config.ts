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
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          data: ["@tanstack/react-query", "axios"],
          ui: [
            "embla-carousel-react",
            "embla-carousel-autoplay",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-dialog",
            "lucide-react",
          ],
        },
      },
    },
  },
});
