import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock window.confirm for delete operations
global.confirm = vi.fn(() => true);

// Mock window.matchMedia for theme detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => {
    return {
      matches: false, // 기본값: light 모드
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }),
});
