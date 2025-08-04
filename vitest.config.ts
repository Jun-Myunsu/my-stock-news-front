import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [], // setup 파일 필요 시 여기에 지정
  },
});
