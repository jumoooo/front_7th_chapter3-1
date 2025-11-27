import React from "react";
import { Button } from "./button";
import { useTheme } from "../../hooks/useTheme";

/**
 * 테마 토글 버튼 컴포넌트
 * 다크 모드와 라이트 모드를 전환할 수 있는 버튼입니다.
 */
export const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        resolvedTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
      }
      className="relative"
      style={{
        color: resolvedTheme === "dark" ? "#fff" : "#333",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color =
          resolvedTheme === "dark" ? "#fff" : "#333";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color =
          resolvedTheme === "dark" ? "#fff" : "#333";
      }}>
      {/* 라이트 모드 아이콘 (태양) - 검은색 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={resolvedTheme === "dark" ? "#fff" : "#333"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-5 w-5 transition-all ${
          resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      {/* 다크 모드 아이콘 (달) - 검은색 (라이트 모드에서 보일 때), 흰색 (다크 모드에서 보일 때) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={resolvedTheme === "dark" ? "#fff" : "#333"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-5 w-5 transition-all ${
          resolvedTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <span className="sr-only">테마 전환</span>
    </Button>
  );
};
