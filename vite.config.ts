import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      // '/dart-api': {
      //   target: 'https://opendart.fss.or.kr',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/dart-api/, ''),
      // },
      "/api": {
        target: "https://my-stock-new-server.onrender.com/",
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/dart-api/, ''),
      },
    },
  },
});
