# KRDS 스타일 디자인 토큰 사용 가이드

> 📚 **참조:** [KRDS 디자인 토큰 전체 보기](https://www.krds.go.kr/html/site/style/style_07_popup.html)

---

## 📋 목차

1. [토큰 구조 이해](#토큰-구조-이해)
2. [Primitive Tokens 사용법](#primitive-tokens-사용법)
3. [Semantic Tokens 사용법](#semantic-tokens-사용법)
4. [TailwindCSS에서 사용하기](#tailwindcss에서-사용하기)
5. [실전 예제](#실전-예제)

---

## 토큰 구조 이해

KRDS 디자인 토큰은 두 가지 계층으로 구성됩니다:

### 1. Primitive Tokens (기본 토큰)
- **역할**: 디자인의 기본 속성 값 정의
- **예시**: `--krds-color-primary-500`, `--krds-spacing-md`
- **특징**: 의미와 분리된 순수한 값

### 2. Semantic Tokens (의미 기반 토큰)
- **역할**: Primitive 토큰을 조합하여 특정 용도에 맞게 정의
- **예시**: `--color-primary`, `--color-background`
- **특징**: 사용 목적이 명확한 의미 기반 토큰

---

## Primitive Tokens 사용법

### 🎨 색상 토큰

#### Primary 계열
```css
/* CSS에서 직접 사용 */
.my-element {
  background-color: hsl(var(--krds-color-primary-500));
  color: hsl(var(--krds-color-primary-50));
}
```

#### Success, Warning, Error 계열
```css
.success-message {
  background-color: hsl(var(--krds-color-success-100));
  color: hsl(var(--krds-color-success-700));
}

.warning-alert {
  background-color: hsl(var(--krds-color-warning-100));
  color: hsl(var(--krds-color-warning-700));
}

.error-message {
  background-color: hsl(var(--krds-color-error-100));
  color: hsl(var(--krds-color-error-700));
}
```

#### Neutral 계열
```css
.card {
  background-color: hsl(var(--krds-color-neutral-50));
  border-color: hsl(var(--krds-color-neutral-300));
  color: hsl(var(--krds-color-neutral-900));
}
```

### 📏 Spacing Tokens

```css
.container {
  padding: var(--krds-spacing-md);      /* 16px */
  margin-top: var(--krds-spacing-lg);   /* 24px */
  gap: var(--krds-spacing-sm);          /* 8px */
}
```

### 🔤 Typography Tokens

```css
.heading {
  font-size: var(--krds-font-size-2xl);    /* 24px */
  font-weight: var(--krds-font-weight-bold); /* 700 */
  line-height: var(--krds-line-height-tight); /* 1.25 */
}

.body-text {
  font-size: var(--krds-font-size-base);     /* 16px */
  font-weight: var(--krds-font-weight-normal); /* 400 */
  line-height: var(--krds-line-height-normal); /* 1.5 */
}
```

### 🔲 Border Radius Tokens

```css
.button {
  border-radius: var(--krds-radius-md);  /* 8px */
}

.card {
  border-radius: var(--krds-radius-lg);   /* 12px */
}

.pill {
  border-radius: var(--krds-radius-full); /* 완전히 둥글게 */
}
```

---

## Semantic Tokens 사용법

Semantic 토큰은 **의미 기반**으로 사용하므로, 용도에 맞게 자동으로 적절한 색상이 적용됩니다.

```css
/* 배경과 텍스트 */
.page {
  background-color: hsl(var(--color-background));
  color: hsl(var(--color-foreground));
}

/* Primary 버튼 */
.primary-button {
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-primary-foreground));
}

/* 카드 */
.card {
  background-color: hsl(var(--color-card));
  color: hsl(var(--color-card-foreground));
  border-color: hsl(var(--color-border));
}
```

---

## TailwindCSS에서 사용하기

### 색상 사용

```tsx
// Semantic Colors (권장)
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

// Primitive Colors (세밀한 조정 필요 시)
<div className="bg-krds-primary-500 text-krds-primary-50">
  Custom Primary
</div>

// Success, Warning, Error
<div className="bg-krds-success-100 text-krds-success-700">
  Success Message
</div>
<div className="bg-krds-warning-100 text-krds-warning-700">
  Warning Alert
</div>
<div className="bg-krds-error-100 text-krds-error-700">
  Error Message
</div>
```

### Spacing 사용

```tsx
// KRDS Spacing Tokens
<div className="p-krds-md m-krds-lg gap-krds-sm">
  Container with KRDS spacing
</div>

// 기존 Tailwind spacing도 사용 가능
<div className="p-4 m-6 gap-2">
  Container with default spacing
</div>
```

### Typography 사용

```tsx
// KRDS Typography Tokens
<h1 className="text-krds-2xl font-krds-bold leading-krds-tight">
  Heading
</h1>

<p className="text-krds-base font-krds-normal leading-krds-normal">
  Body text
</p>
```

### Border Radius 사용

```tsx
// KRDS Radius Tokens
<button className="rounded-krds-md">
  Rounded Button
</button>

<div className="rounded-krds-lg">
  Rounded Card
</div>

<span className="rounded-krds-full px-4 py-2">
  Pill Badge
</span>
```

### Shadow 사용

```tsx
// KRDS Shadow Tokens
<div className="shadow-krds-md">
  Card with shadow
</div>

<div className="shadow-krds-lg">
  Elevated card
</div>
```

---

## 실전 예제

### 예제 1: Primary Button

```tsx
// Semantic Token 사용 (권장)
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-krds-md">
  Primary Button
</button>

// Primitive Token 사용 (커스터마이징 필요 시)
<button className="bg-krds-primary-600 text-krds-primary-50 px-4 py-2 rounded-krds-md hover:bg-krds-primary-700">
  Custom Primary Button
</button>
```

### 예제 2: Alert 컴포넌트

```tsx
// Success Alert
<div className="bg-krds-success-50 border border-krds-success-200 text-krds-success-700 p-krds-md rounded-krds-md">
  ✅ 작업이 성공적으로 완료되었습니다.
</div>

// Warning Alert
<div className="bg-krds-warning-50 border border-krds-warning-200 text-krds-warning-700 p-krds-md rounded-krds-md">
  ⚠️ 주의가 필요한 항목이 있습니다.
</div>

// Error Alert
<div className="bg-krds-error-50 border border-krds-error-200 text-krds-error-700 p-krds-md rounded-krds-md">
  ❌ 오류가 발생했습니다.
</div>
```

### 예제 3: Card 컴포넌트

```tsx
<div className="bg-card text-card-foreground border border-border rounded-krds-lg p-krds-lg shadow-krds-md">
  <h2 className="text-krds-xl font-krds-bold mb-krds-md">
    Card Title
  </h2>
  <p className="text-krds-base text-muted-foreground">
    Card content goes here...
  </p>
</div>
```

### 예제 4: Form Input

```tsx
<div className="space-y-krds-sm">
  <label className="text-krds-sm font-krds-medium text-foreground">
    이름
  </label>
  <input
    type="text"
    className="w-full px-krds-md py-krds-sm border border-input rounded-krds-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="이름을 입력하세요"
  />
</div>
```

---

## 🎯 사용 가이드라인

### ✅ 권장 사항

1. **일반적인 경우**: Semantic Tokens 사용
   - `bg-primary`, `text-foreground` 등
   - 다크 모드 자동 지원
   - 일관성 유지 용이

2. **세밀한 조정 필요 시**: Primitive Tokens 사용
   - `bg-krds-primary-500`, `text-krds-neutral-700` 등
   - 특정 색상 단계가 필요한 경우

3. **상태별 색상**: Status Colors 사용
   - Success: `bg-krds-success-*`
   - Warning: `bg-krds-warning-*`
   - Error: `bg-krds-error-*`

### ❌ 피해야 할 것

1. 하드코딩된 색상 값 사용 금지
   ```tsx
   // ❌ 나쁜 예
   <div style={{ color: '#1976d2' }}>
   
   // ✅ 좋은 예
   <div className="text-primary">
   ```

2. Primitive Token을 남용하지 않기
   - Semantic Token으로 충분한 경우 Primitive 사용 지양

3. 토큰 체계 무시하고 임의 값 사용 금지

---

## 📝 토큰 추가/수정 방법

### 새로운 색상 추가

1. `packages/after/src/styles/globals.css`의 `:root`에 Primitive Token 추가
2. 필요시 Semantic Token도 추가
3. `packages/after/tailwind.config.js`의 `theme.extend.colors`에 매핑

### Spacing/Typography 수정

1. `globals.css`의 해당 토큰 값 수정
2. Tailwind config는 자동으로 반영됨

---

## 🔗 참고 자료

- [KRDS 디자인 토큰 전체 보기](https://www.krds.go.kr/html/site/style/style_07_popup.html)
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [CVA (Class Variance Authority)](https://cva.style/docs)

---

> 💡 **팁**: Semantic Tokens를 우선 사용하고, 정말 필요한 경우에만 Primitive Tokens를 사용하세요. 이렇게 하면 다크 모드 지원과 일관성 유지가 자동으로 됩니다!

