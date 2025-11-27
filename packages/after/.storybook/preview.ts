import type { Preview } from '@storybook/react-vite';
// TailwindCSS 스타일 import
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    // 배경색 옵션 추가
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'hsl(var(--color-background))',
        },
        {
          name: 'dark',
          value: 'hsl(var(--krds-color-neutral-900))',
        },
      ],
    },
  },
};

export default preview;