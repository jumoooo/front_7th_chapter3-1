/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(new URL(import.meta.url).pathname);

// GitHub Pages 배포를 위한 base 경로 설정
// 프로덕션 환경에서는 /3-1/ 경로로 배포
const base: string = process.env.NODE_ENV === "production" ? "/3-1/" : "";

export default defineConfig({
  base, // GitHub Pages 배포 경로 설정
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    // Storybook 테스트는 별도로 실행하거나 필요시 활성화
    // projects: [{
    //   extends: true,
    //   plugins: [
    //   storybookTest({
    //     configDir: path.join(dirname, '.storybook')
    //   })],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: playwright({}),
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.ts']
    //   }
    // }]
  },
});
