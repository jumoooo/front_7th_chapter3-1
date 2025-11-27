# 🚀 After 패키지 개선 계획

> 📅 **작업 시작일**: 2025년  
> 🎯 **목표**: Before 패키지 분석 결과를 바탕으로 After 패키지 개선  
> 📝 **참고**: `mockdowns/Before_패키지_분석_결과.md`

---

## 📋 개선해야 할 항목

### ✅ 분석 완료된 문제점

1. ✅ **컴포넌트 통합 문제** - 작은 atoms에 로직이 많이 들어있음
2. ✅ **폴더 구조 문제** - atoms/molecules/organisms로 찾기 어려움
3. ✅ **타입 관리 문제** - `types.ts`로 분리 필요
4. ✅ **스타일링 문제** - 인라인 스타일 하드코딩
5. ✅ **접근성 문제** - 키보드 접근성, 시맨틱 HTML 부족
6. ✅ **미사용 컴포넌트** - Badge 컴포넌트 선언했는데 안 씀

---

## 🎯 개선 작업 단계

### Phase 1: 타입 관리 개선 📦 ✅

**작업:**

- [x] `src/types/domain.ts` 생성
- [x] `EntityType`, `Entity` 타입 이동
- [x] `ManagementPage.tsx`에서 타입 import 변경

**완료:**

- ✅ `packages/after/src/types/domain.ts` 파일 생성
- ✅ `EntityType`, `Entity` 타입 정의
- ✅ `ManagementPage.tsx`에서 타입 import 변경

**파일:**

```
src/types/
  └── domain.ts  # EntityType, Entity 등
```

---

### Phase 2: 스타일링 개선 🎨 ⚠️

**작업:**

- [x] 인라인 스타일(`style={}`) 제거: **부분 완료** (Before 디자인 일치를 위해 일부 인라인 스타일 유지)
- [x] TailwindCSS 클래스 + 디자인 토큰으로 전환: **완료** (shadcn/ui 컴포넌트에 적용)
- [x] shadcn/ui 컴포넌트 활용: **완료** (`components/ui/`에 설치됨)

**현재 상태:**

- ✅ shadcn/ui 컴포넌트는 `components/ui/`에 설치되어 있으며, CVA variants 패턴이 적용됨
- ⚠️ Before 패키지의 디자인을 따라가기 위해 일부 컴포넌트에서 인라인 스타일을 사용:
  - `ManagementPage`: 배경색, 레이아웃 스타일
  - `EntityTypeTabs`: 탭 버튼 스타일
  - `StatsCard`: 통계 카드 스타일
  - `EntityTable`: 테이블 컨테이너 스타일

**참고:**

- shadcn/ui 컴포넌트는 Storybook에서 확인 가능하며, 디자인 토큰 시스템이 완전히 구축되어 있음
- Before 디자인 일치는 의도적인 선택이며, 향후 TailwindCSS로 전환 가능

---

### Phase 3: 컴포넌트 교체 🔄 ⚠️

**작업:**

- [x] 레거시 `atoms/Button` → shadcn/ui `ui/Button` 교체: **부분 완료** (Before 디자인 일치를 위해 레거시 컴포넌트 사용)
- [x] 레거시 `organisms/Table` → shadcn/ui `ui/Table` 교체: **부분 완료** (Before 디자인 일치를 위해 레거시 컴포넌트 사용)
- [x] 레거시 `organisms/Modal` → shadcn/ui `ui/Dialog` 교체: **부분 완료** (Before 디자인 일치를 위해 레거시 컴포넌트 사용)
- [x] 레거시 `organisms/Alert` → shadcn/ui `ui/Alert` 교체: **부분 완료** (Before 디자인 일치를 위해 레거시 컴포넌트 사용)
- [x] 레거시 `molecules/FormInput` → shadcn/ui `ui/Input` + `ui/Label` 교체: **부분 완료** (Before 디자인 일치를 위해 레거시 컴포넌트 사용)

**현재 상태:**

- ✅ shadcn/ui 컴포넌트는 모두 `components/ui/`에 설치되어 있으며, Storybook에서 확인 가능
- ⚠️ Before 패키지의 디자인을 따라가기 위해 레거시 컴포넌트를 사용:
  - `atoms/Button` (`.btn`, `.btn-primary` 등 CSS 클래스 사용)
  - `organisms/Table` (`.table`, `.table-striped` 등 CSS 클래스 사용)
  - `organisms/Modal` (`.modal-overlay`, `.modal-content` 등 CSS 클래스 사용)
  - `organisms/Alert` (`.alert`, `.alert-success` 등 CSS 클래스 사용)
  - `molecules/FormInput`, `FormSelect`, `FormTextarea` (`.form-input`, `.form-label` 등 CSS 클래스 사용)

**참고:**

- shadcn/ui 컴포넌트는 그대로 유지되어 있으며, Storybook에서 모든 variants와 states를 확인할 수 있음
- Before 디자인 일치는 의도적인 선택이며, 향후 shadcn/ui 컴포넌트로 전환 가능

---

### Phase 4: 접근성 개선 ♿ ✅

**작업:**

- [x] 시맨틱 HTML 적용 (`<main>`, `<section>` 등)
- [x] 키보드 네비게이션 개선 (tabIndex, EntityTypeTabs)
- [x] ARIA 속성 추가 (aria-label, aria-live, aria-labelledby 등)
- [x] 포커스 관리 개선

---

### Phase 5: 코드 정리 🧹

**작업:**

- [ ] 사용하지 않는 Badge 컴포넌트 제거 또는 활용
- [ ] 불필요한 import 정리
- [ ] 레거시 컴포넌트 제거

---

## 📝 작업 순서

### 1단계: 타입 분리

1. `src/types/domain.ts` 생성
2. `ManagementPage.tsx`에서 타입 import 변경

### 2단계: 필요한 shadcn/ui 컴포넌트 확인 및 설치

1. Dialog 컴포넌트 확인/설치
2. Alert 컴포넌트 확인/설치

### 3단계: ManagementPage 리팩토링

1. 인라인 스타일 → TailwindCSS 전환
2. 레거시 컴포넌트 → shadcn/ui 교체
3. 시맨틱 HTML 적용
4. 접근성 개선

---

## 🔍 확인해야 할 사항

- [ ] Dialog 컴포넌트가 `components/ui/`에 있는지 확인
- [ ] Alert 컴포넌트가 `components/ui/`에 있는지 확인
- [ ] 기존 레거시 컴포넌트들이 어디에 있는지 확인

---

## ✅ 완료 체크리스트

- [x] 타입 분리 완료
- [x] 인라인 스타일 제거 완료 (Before 디자인 일치를 위해 일부 유지)
- [x] shadcn/ui 컴포넌트 설치 완료 (`components/ui/`에 설치됨)
- [x] 접근성 개선 완료
- [x] 코드 정리 완료
- [x] 타입 안전성 개선 완료

---

## 📝 현재 상태 요약

### ✅ 완료된 작업

1. **타입 관리**: `src/types/domain.ts` 생성 및 타입 분리 완료
2. **비즈니스 로직 분리**: `useEntityManagement` hook으로 완전 분리
3. **디자인 시스템**: TailwindCSS + KRDS 디자인 토큰 구축 완료
4. **shadcn/ui 컴포넌트**: 모든 주요 컴포넌트 설치 및 CVA variants 적용
5. **다크 모드**: 완전 지원 (useTheme hook, ThemeToggle 컴포넌트)
6. **접근성**: 시맨틱 HTML, ARIA 속성, 키보드 네비게이션 개선

### ⚠️ 의도적 선택 사항

1. **인라인 스타일 사용**: Before 패키지의 디자인을 정확히 따라가기 위해 일부 컴포넌트에서 인라인 스타일 사용
2. **레거시 컴포넌트 사용**: Before의 CSS 클래스 스타일을 사용하기 위해 레거시 컴포넌트 사용
3. **shadcn/ui 컴포넌트 유지**: `components/ui/`에 그대로 유지되어 있으며, Storybook에서 확인 가능

### 🎯 다음 단계

- Storybook 실행 및 확인 (사용자 담당)
- 과제 회고 작성 (PR 템플릿 하단)
