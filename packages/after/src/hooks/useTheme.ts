import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

/**
 * 테마 관리 Hook
 * 다크 모드 토글 및 시스템 설정 감지 기능 제공
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // localStorage에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  });

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    setResolvedTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  // HTML 요소에 dark/light 클래스 추가/제거
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [resolvedTheme]);

  // 테마 변경 함수
  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 다크 모드 토글
  const toggleTheme = () => {
    console.log("🔵 [useTheme] toggleTheme 호출됨");
    console.log("🔵 [useTheme] 현재 theme:", theme);
    console.log("🔵 [useTheme] 현재 resolvedTheme:", resolvedTheme);

    const currentResolved = resolvedTheme;
    const newTheme: Theme = currentResolved === "dark" ? "light" : "dark";
    const newResolvedTheme: "light" | "dark" = newTheme;

    console.log("🔵 [useTheme] 새로운 theme:", newTheme);
    console.log("🔵 [useTheme] 새로운 resolvedTheme:", newResolvedTheme);

    // 즉시 DOM에 적용 (상태 업데이트보다 먼저)
    const root = document.documentElement;
    if (newResolvedTheme === "dark") {
      root.classList.remove("light"); // 라이트 클래스 제거
      root.classList.add("dark"); // 다크 클래스 추가
      console.log("✅ [useTheme] dark 클래스 추가됨, light 클래스 제거됨");
    } else {
      root.classList.remove("dark"); // 다크 클래스 제거
      root.classList.add("light"); // 라이트 클래스 추가 (미디어 쿼리 오버라이드)
      console.log("✅ [useTheme] light 클래스 추가됨, dark 클래스 제거됨");
    }

    // 상태 업데이트
    setTheme(newTheme);
    setResolvedTheme(newResolvedTheme);
    localStorage.setItem("theme", newTheme);

    console.log("🔵 [useTheme] localStorage에 저장됨:", newTheme);

    // 확인 (약간의 지연 후)
    setTimeout(() => {
      const hasDark = root.classList.contains("dark");
      const bgColor =
        getComputedStyle(root).getPropertyValue("--color-background");
      console.log("🔍 [useTheme] 확인 - dark 클래스:", hasDark);
      console.log(
        "🔍 [useTheme] 확인 - CSS 변수 (--color-background):",
        bgColor
      );
      console.log(
        "🔍 [useTheme] 확인 - 실제 배경색:",
        getComputedStyle(document.body).backgroundColor
      );
    }, 100);
  };

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeValue,
    toggleTheme,
  };
};
