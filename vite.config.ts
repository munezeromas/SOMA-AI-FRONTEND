import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    react(),
    tsConfigPaths(),
    tailwindcss(),
    process.env.NODE_ENV === "production" && cloudflare(),
  ].filter(Boolean),
  optimizeDeps: {
    exclude: ["@met4citizen/talkinghead"],
  },
});
