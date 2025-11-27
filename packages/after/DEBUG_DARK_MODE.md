# 다크 모드 디버깅 가이드

## 🔍 문제 진단 체크리스트

### 1. 브라우저 개발자 도구에서 확인할 사항

#### A. `dark` 클래스가 추가되는지 확인
```javascript
// 콘솔에서 실행
document.documentElement.classList.contains('dark')
// true면 dark 클래스가 있음, false면 없음
```

#### B. CSS 변수 값 확인
```javascript
// 콘솔에서 실행
getComputedStyle(document.documentElement).getPropertyValue('--color-background')
// 라이트 모드: "0 0% 94%" (또는 유사한 값)
// 다크 모드: "0 0% 11%" (또는 유사한 값)
```

#### C. 실제 적용된 배경색 확인
```javascript
// 콘솔에서 실행
const body = document.querySelector('body');
getComputedStyle(body).backgroundColor
// 라이트 모드: rgb(240, 240, 240) 또는 유사한 값
// 다크 모드: rgb(28, 28, 28) 또는 유사한 값
```

### 2. 코드 레벨에서 확인할 사항

#### A. `useTheme` hook이 제대로 작동하는지
- `toggleTheme` 함수가 호출되는지 확인
- `resolvedTheme` 상태가 변경되는지 확인
- `localStorage`에 테마가 저장되는지 확인

#### B. CSS 변수 정의 확인
- `globals.css`에서 `.dark` 클래스 내부의 CSS 변수가 올바르게 정의되어 있는지
- CSS 변수 이름이 `--color-background`, `--color-card` 등으로 일치하는지

#### C. TailwindCSS 설정 확인
- `tailwind.config.js`에서 `darkMode: ["class"]`가 설정되어 있는지
- 색상 정의에서 `hsl(var(--color-background))` 형식이 올바른지

### 3. 가능한 문제점들

#### 문제 1: CSS 변수 참조 문제
- **증상**: `dark` 클래스가 추가되어도 색상이 변경되지 않음
- **원인**: CSS 변수가 중첩 참조(`var(--krds-color-neutral-900)`)로 되어 있어서 값이 제대로 전달되지 않을 수 있음
- **해결**: CSS 변수 값을 직접 확인

#### 문제 2: TailwindCSS 클래스 생성 문제
- **증상**: `bg-background` 같은 클래스가 생성되지 않음
- **원인**: TailwindCSS가 CSS 변수를 제대로 인식하지 못함
- **해결**: 빌드 캐시 삭제 후 재빌드

#### 문제 3: 상태 업데이트 타이밍 문제
- **증상**: 버튼 클릭 후 약간의 지연이 있음
- **원인**: React 상태 업데이트가 비동기적으로 처리됨
- **해결**: `toggleTheme`에서 DOM 조작을 먼저 수행 (이미 구현됨)

#### 문제 4: CSS 우선순위 문제
- **증상**: 일부 요소만 다크 모드가 적용됨
- **원인**: 인라인 스타일이나 더 높은 우선순위의 CSS가 덮어씀
- **해결**: `!important` 사용 또는 CSS 우선순위 조정

### 4. 디버깅 코드 추가 위치

#### `useTheme.ts`에 디버깅 로그 추가
```typescript
const toggleTheme = () => {
  console.log('🔵 toggleTheme 호출됨');
  console.log('현재 resolvedTheme:', resolvedTheme);
  
  const currentResolved = resolvedTheme;
  const newTheme: Theme = currentResolved === "dark" ? "light" : "dark";
  const newResolvedTheme: "light" | "dark" = newTheme;
  
  console.log('새로운 테마:', newTheme);
  console.log('새로운 resolvedTheme:', newResolvedTheme);

  // 즉시 DOM에 적용
  const root = document.documentElement;
  if (newResolvedTheme === "dark") {
    root.classList.add("dark");
    console.log('✅ dark 클래스 추가됨');
  } else {
    root.classList.remove("dark");
    console.log('✅ dark 클래스 제거됨');
  }
  
  // 상태 업데이트
  setTheme(newTheme);
  setResolvedTheme(newResolvedTheme);
  localStorage.setItem("theme", newTheme);
  
  // 확인
  setTimeout(() => {
    console.log('확인 - dark 클래스:', root.classList.contains('dark'));
    console.log('확인 - CSS 변수:', getComputedStyle(root).getPropertyValue('--color-background'));
  }, 100);
};
```

#### `globals.css`에 디버깅 스타일 추가
```css
.dark {
  /* 디버깅용 - 다크 모드가 활성화되면 이 배경색이 보여야 함 */
  --color-background: var(--krds-color-neutral-900);
  /* ... */
}

/* 디버깅용 - 다크 모드 확인 */
.dark body {
  border: 3px solid red !important; /* 다크 모드일 때 빨간 테두리 */
}
```

### 5. 사용자가 직접 확인해야 할 사항

1. **브라우저 콘솔 확인**
   - F12를 눌러 개발자 도구 열기
   - Console 탭에서 에러 메시지 확인
   - 위의 JavaScript 코드들을 실행하여 값 확인

2. **네트워크 탭 확인**
   - CSS 파일이 제대로 로드되는지 확인
   - `globals.css` 파일이 200 상태로 로드되는지 확인

3. **Elements 탭 확인**
   - `<html>` 태그에 `dark` 클래스가 있는지 확인
   - CSS 변수 값이 올바르게 설정되어 있는지 확인

4. **Application 탭 확인 (Chrome)**
   - Local Storage에서 `theme` 키의 값을 확인
   - 버튼 클릭 후 값이 변경되는지 확인

### 6. 빠른 테스트 방법

브라우저 콘솔에서 직접 실행:
```javascript
// 다크 모드 강제 활성화
document.documentElement.classList.add('dark');

// 라이트 모드 강제 활성화
document.documentElement.classList.remove('dark');
```

이렇게 해도 색상이 변경되지 않으면 CSS 변수나 TailwindCSS 설정 문제입니다.

