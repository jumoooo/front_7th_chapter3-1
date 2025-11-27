/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // class 기반 다크 모드 활성화
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic Colors (의미 기반 색상) */
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover))",
          foreground: "hsl(var(--color-popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
        },
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        
        /* KRDS Primitive Colors (기본 색상 팔레트) */
        krds: {
          primary: {
            50: "hsl(var(--krds-color-primary-50))",
            100: "hsl(var(--krds-color-primary-100))",
            200: "hsl(var(--krds-color-primary-200))",
            300: "hsl(var(--krds-color-primary-300))",
            400: "hsl(var(--krds-color-primary-400))",
            500: "hsl(var(--krds-color-primary-500))",
            600: "hsl(var(--krds-color-primary-600))",
            700: "hsl(var(--krds-color-primary-700))",
            800: "hsl(var(--krds-color-primary-800))",
            900: "hsl(var(--krds-color-primary-900))",
          },
          success: {
            50: "hsl(var(--krds-color-success-50))",
            100: "hsl(var(--krds-color-success-100))",
            200: "hsl(var(--krds-color-success-200))",
            300: "hsl(var(--krds-color-success-300))",
            400: "hsl(var(--krds-color-success-400))",
            500: "hsl(var(--krds-color-success-500))",
            600: "hsl(var(--krds-color-success-600))",
            700: "hsl(var(--krds-color-success-700))",
            800: "hsl(var(--krds-color-success-800))",
            900: "hsl(var(--krds-color-success-900))",
          },
          warning: {
            50: "hsl(var(--krds-color-warning-50))",
            100: "hsl(var(--krds-color-warning-100))",
            200: "hsl(var(--krds-color-warning-200))",
            300: "hsl(var(--krds-color-warning-300))",
            400: "hsl(var(--krds-color-warning-400))",
            500: "hsl(var(--krds-color-warning-500))",
            600: "hsl(var(--krds-color-warning-600))",
            700: "hsl(var(--krds-color-warning-700))",
            800: "hsl(var(--krds-color-warning-800))",
            900: "hsl(var(--krds-color-warning-900))",
          },
          error: {
            50: "hsl(var(--krds-color-error-50))",
            100: "hsl(var(--krds-color-error-100))",
            200: "hsl(var(--krds-color-error-200))",
            300: "hsl(var(--krds-color-error-300))",
            400: "hsl(var(--krds-color-error-400))",
            500: "hsl(var(--krds-color-error-500))",
            600: "hsl(var(--krds-color-error-600))",
            700: "hsl(var(--krds-color-error-700))",
            800: "hsl(var(--krds-color-error-800))",
            900: "hsl(var(--krds-color-error-900))",
          },
          neutral: {
            50: "hsl(var(--krds-color-neutral-50))",
            100: "hsl(var(--krds-color-neutral-100))",
            200: "hsl(var(--krds-color-neutral-200))",
            300: "hsl(var(--krds-color-neutral-300))",
            400: "hsl(var(--krds-color-neutral-400))",
            500: "hsl(var(--krds-color-neutral-500))",
            600: "hsl(var(--krds-color-neutral-600))",
            700: "hsl(var(--krds-color-neutral-700))",
            800: "hsl(var(--krds-color-neutral-800))",
            900: "hsl(var(--krds-color-neutral-900))",
          },
        },
      },
      spacing: {
        /* KRDS Spacing Tokens */
        "krds-xs": "var(--krds-spacing-xs)",
        "krds-sm": "var(--krds-spacing-sm)",
        "krds-md": "var(--krds-spacing-md)",
        "krds-lg": "var(--krds-spacing-lg)",
        "krds-xl": "var(--krds-spacing-xl)",
        "krds-2xl": "var(--krds-spacing-2xl)",
        "krds-3xl": "var(--krds-spacing-3xl)",
      },
      fontSize: {
        /* KRDS Typography Tokens */
        "krds-xs": "var(--krds-font-size-xs)",
        "krds-sm": "var(--krds-font-size-sm)",
        "krds-base": "var(--krds-font-size-base)",
        "krds-lg": "var(--krds-font-size-lg)",
        "krds-xl": "var(--krds-font-size-xl)",
        "krds-2xl": "var(--krds-font-size-2xl)",
        "krds-3xl": "var(--krds-font-size-3xl)",
        "krds-4xl": "var(--krds-font-size-4xl)",
      },
      fontWeight: {
        "krds-normal": "var(--krds-font-weight-normal)",
        "krds-medium": "var(--krds-font-weight-medium)",
        "krds-semibold": "var(--krds-font-weight-semibold)",
        "krds-bold": "var(--krds-font-weight-bold)",
      },
      lineHeight: {
        "krds-tight": "var(--krds-line-height-tight)",
        "krds-normal": "var(--krds-line-height-normal)",
        "krds-relaxed": "var(--krds-line-height-relaxed)",
      },
      borderRadius: {
        /* KRDS Radius Tokens */
        "krds-none": "var(--krds-radius-none)",
        "krds-sm": "var(--krds-radius-sm)",
        "krds-md": "var(--krds-radius-md)",
        "krds-lg": "var(--krds-radius-lg)",
        "krds-xl": "var(--krds-radius-xl)",
        "krds-full": "var(--krds-radius-full)",
        /* 기존 호환성 유지 */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        /* KRDS Shadow Tokens */
        "krds-sm": "var(--krds-shadow-sm)",
        "krds-md": "var(--krds-shadow-md)",
        "krds-lg": "var(--krds-shadow-lg)",
        "krds-xl": "var(--krds-shadow-xl)",
      },
    },
  },
  plugins: [],
}

