import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/globals.css'
import './styles/components.css'

// 초기 테마 설정 (useTheme hook과 중복 방지를 위해 최소한만 설정)
// useTheme hook이 마운트되면 자동으로 올바른 테마가 적용됩니다
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
  const root = document.documentElement;
  
  // 초기 렌더링 시 깜빡임 방지를 위한 최소한의 설정
  if (savedTheme === 'dark') {
    root.classList.remove('light');
    root.classList.add('dark');
  } else if (savedTheme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    // system 모드인 경우 시스템 설정에 따라
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
};

// 초기 테마 적용 (useTheme hook이 나중에 정확한 테마를 적용함)
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)