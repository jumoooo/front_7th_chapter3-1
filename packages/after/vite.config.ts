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

export default defineConfig(({ command }) => {
  // 빌드 모드에서는 test 설정 제외
  const isBuild = command === "build";

  return {
    base, // GitHub Pages 배포 경로 설정
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src"),
      },
    },
    // test 설정은 개발/테스트 환경에서만 사용
    ...(isBuild
      ? {}
      : {
          test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/test/setup.ts",
            css: true,
          },
        }),
  };
});
