import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["1722-2406-7400-9a-c8d6-3447-ea03-177f-3d1d.ngrok-free.app"],
  },
});
