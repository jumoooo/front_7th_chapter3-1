# 📦 ManagementPage 컴포넌트 분리 전략

> 🎯 **목표**: 814줄짜리 큰 파일을 재사용 가능하고 유지보수하기 쉬운 작은 컴포넌트로 분리

---

## 🔍 현재 구조 분석

### 현재 ManagementPage.tsx의 구성 요소

1. **상태 관리** (15줄)

   - entityType, data, modal 상태, alert 상태, formData

2. **비즈니스 로직** (125줄)

   - loadData, handleCreate, handleEdit, handleUpdate, handleDelete, handleStatusAction

3. **유틸리티 함수** (55줄)

   - getStats, renderTableColumns

4. **UI 렌더링** (619줄)
   - 페이지 헤더 (제목, 설명)
   - 탭 버튼 (게시글/사용자 전환)
   - 통계 카드들 (4개)
   - 알림 (성공/에러)
   - 테이블
   - 생성 모달
   - 수정 모달

---

## 🎯 분리 전략

### 원칙

1. **UI와 비즈니스 로직 분리**

   - UI 컴포넌트는 순수하게 UI만 담당
   - 비즈니스 로직은 hooks로 분리

2. **역할 기반 폴더 구조**

   - `components/domain/management/` - ManagementPage 전용 컴포넌트
   - `components/ui/` - 재사용 가능한 UI 컴포넌트 (이미 존재)
   - `hooks/` - 비즈니스 로직 hooks

3. **재사용성 고려**
   - 공통 UI는 `components/ui/` 또는 도메인 공통 컴포넌트로
   - 특정 도메인 로직은 도메인 컴포넌트로

---

## 📁 제안하는 컴포넌트 구조

```
src/
├── pages/
│   └── ManagementPage.tsx          # 메인 페이지 (조합만 담당)
│
├── components/
│   ├── ui/                          # shadcn/ui 컴포넌트 (기존)
│   └── domain/
│       └── management/              # ManagementPage 전용 컴포넌트
│           ├── ManagementPageHeader.tsx      # 헤더 (제목, 설명)
│           ├── EntityTypeTabs.tsx            # 탭 버튼 (게시글/사용자)
│           ├── StatsCards.tsx                # 통계 카드 그리드
│           ├── StatsCard.tsx                 # 개별 통계 카드
│           ├── ManagementAlerts.tsx          # 알림 컴포넌트
│           ├── EntityTable.tsx               # 테이블 래퍼
│           ├── CreateEntityModal.tsx         # 생성 모달
│           └── EditEntityModal.tsx           # 수정 모달
│
├── hooks/
│   └── useEntityManagement.ts       # 비즈니스 로직 hook
│
└── types/
    └── domain.ts                     # 타입 정의 (완료됨)
```

---

## 🧩 컴포넌트별 상세 설계

### 1️⃣ ManagementPage.tsx (메인 페이지)

**역할**: 컴포넌트들을 조합만 담당하는 컨테이너

```typescript
// 단순히 컴포넌트들을 조합
export const ManagementPage: React.FC = () => {
  const { ... } = useEntityManagement();

  return (
    <main>
      <ManagementPageHeader />
      <EntityTypeTabs />
      <ManagementAlerts />
      <StatsCards />
      <EntityTable />
      <CreateEntityModal />
      <EditEntityModal />
    </main>
  );
};
```

---

### 2️⃣ hooks/useEntityManagement.ts

**역할**: 모든 비즈니스 로직 관리

**포함할 내용:**

- 상태 관리 (entityType, data, modal, alert, formData)
- CRUD 핸들러들
- getStats 함수
- renderTableColumns 함수

**반환값:**

```typescript
{
  // 상태
  entityType, setEntityType,
  data,
  isCreateModalOpen, setIsCreateModalOpen,
  isEditModalOpen, setIsEditModalOpen,
  selectedItem,
  showSuccessAlert, alertMessage,
  showErrorAlert, errorMessage,
  formData, setFormData,

  // 핸들러
  handleCreate,
  handleEdit,
  handleUpdate,
  handleDelete,
  handleStatusAction,

  // 유틸리티
  stats,
  tableColumns,
}
```

---

### 3️⃣ components/domain/management/ManagementPageHeader.tsx

**역할**: 페이지 헤더 (제목, 설명)

```typescript
export const ManagementPageHeader: React.FC = () => {
  return (
    <header>
      <h1>관리 시스템</h1>
      <p>사용자와 게시글을 관리하세요</p>
    </header>
  );
};
```

**특징:**

- 순수 UI 컴포넌트
- props 없음 (정적 콘텐츠)
- 나중에 props로 제목/설명 받을 수 있도록 확장 가능

---

### 4️⃣ components/domain/management/EntityTypeTabs.tsx

**역할**: 게시글/사용자 탭 전환 버튼

```typescript
interface EntityTypeTabsProps {
  entityType: EntityType;
  onEntityTypeChange: (type: EntityType) => void;
}

export const EntityTypeTabs: React.FC<EntityTypeTabsProps> = ({
  entityType,
  onEntityTypeChange,
}) => {
  return (
    <div role="tablist">
      <button
        role="tab"
        aria-selected={entityType === "post"}
        onClick={() => onEntityTypeChange("post")}>
        게시글
      </button>
      <button
        role="tab"
        aria-selected={entityType === "user"}
        onClick={() => onEntityTypeChange("user")}>
        사용자
      </button>
    </div>
  );
};
```

**특징:**

- shadcn/ui의 Tabs 컴포넌트 활용 고려 가능
- 접근성 개선 (ARIA 속성)

---

### 5️⃣ components/domain/management/StatsCards.tsx

**역할**: 통계 카드 그리드 컨테이너

```typescript
interface StatsCardsProps {
  stats: {
    total: number;
    stat1: { label: string; value: number; color: string };
    stat2: { label: string; value: number; color: string };
    stat3: { label: string; value: number; color: string };
    stat4: { label: string; value: number; color: string };
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-krds-sm">
      <StatsCard label="전체" value={stats.total} />
      <StatsCard {...stats.stat1} />
      <StatsCard {...stats.stat2} />
      <StatsCard {...stats.stat3} />
      <StatsCard {...stats.stat4} />
    </div>
  );
};
```

---

### 6️⃣ components/domain/management/StatsCard.tsx

**역할**: 개별 통계 카드

```typescript
interface StatsCardProps {
  label: string;
  value: number;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  color,
}) => {
  return (
    <div className="bg-card border border-border p-krds-md rounded-krds-md">
      <div className="text-krds-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
};
```

**특징:**

- 재사용 가능한 순수 UI 컴포넌트
- 디자인 토큰 사용

---

### 7️⃣ components/domain/management/ManagementAlerts.tsx

**역할**: 성공/에러 알림 표시

```typescript
interface ManagementAlertsProps {
  showSuccess: boolean;
  successMessage: string;
  onCloseSuccess: () => void;
  showError: boolean;
  errorMessage: string;
  onCloseError: () => void;
}

export const ManagementAlerts: React.FC<ManagementAlertsProps> = ({
  showSuccess,
  successMessage,
  onCloseSuccess,
  showError,
  errorMessage,
  onCloseError,
}) => {
  return (
    <>
      {showSuccess && (
        <Alert variant="success" onClose={onCloseSuccess}>
          {successMessage}
        </Alert>
      )}
      {showError && (
        <Alert variant="error" onClose={onCloseError}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};
```

---

### 8️⃣ components/domain/management/EntityTable.tsx

**역할**: 테이블 래퍼 (데이터와 컬럼 전달)

```typescript
interface EntityTableProps {
  columns: TableColumn[];
  data: Entity[];
  entityType: EntityType;
  onEdit: (item: Entity) => void;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const EntityTable: React.FC<EntityTableProps> = ({
  columns,
  data,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  return (
    <div className="border border-border bg-card overflow-auto">
      <Table
        columns={columns}
        data={data}
        striped
        hover
        entityType={entityType}
        onEdit={onEdit}
        onDelete={onDelete}
        onPublish={onPublish}
        onArchive={onArchive}
        onRestore={onRestore}
      />
    </div>
  );
};
```

---

### 9️⃣ components/domain/management/CreateEntityModal.tsx

**역할**: 생성 모달

```typescript
interface CreateEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: EntityType;
  formData: any;
  onFormDataChange: (data: any) => void;
  onSubmit: () => void;
}

export const CreateEntityModal: React.FC<CreateEntityModalProps> = ({
  isOpen,
  onClose,
  entityType,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            생성
          </Button>
        </>
      }>
      <EntityForm
        entityType={entityType}
        formData={formData}
        onChange={onFormDataChange}
      />
    </Modal>
  );
};
```

---

### 🔟 components/domain/management/EditEntityModal.tsx

**역할**: 수정 모달

```typescript
interface EditEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: EntityType;
  selectedItem: Entity | null;
  formData: any;
  onFormDataChange: (data: any) => void;
  onSubmit: () => void;
}

export const EditEntityModal: React.FC<EditEntityModalProps> = ({
  isOpen,
  onClose,
  entityType,
  selectedItem,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${entityType === "user" ? "사용자" : "게시글"} 수정`}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            수정 완료
          </Button>
        </>
      }>
      {selectedItem && (
        <Alert variant="info">
          ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
        </Alert>
      )}
      <EntityForm
        entityType={entityType}
        formData={formData}
        onChange={onFormDataChange}
      />
    </Modal>
  );
};
```

---

### 1️⃣1️⃣ components/domain/management/EntityForm.tsx (추가 제안)

**역할**: User/Post 폼 공통 컴포넌트

```typescript
interface EntityFormProps {
  entityType: EntityType;
  formData: any;
  onChange: (data: any) => void;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  entityType,
  formData,
  onChange,
}) => {
  if (entityType === "user") {
    return <UserForm formData={formData} onChange={onChange} />;
  } else {
    return <PostForm formData={formData} onChange={onChange} />;
  }
};
```

**더 나아가:**

- `UserForm.tsx`, `PostForm.tsx`로 완전 분리 가능
- 각 폼을 독립적으로 테스트/재사용 가능

---

## 📋 분리 작업 순서 추천

### Phase 1: 비즈니스 로직 분리 (우선)

1. ✅ `hooks/useEntityManagement.ts` 생성
   - 모든 상태와 핸들러 이동
   - ManagementPage에서 hook 사용

### Phase 2: 작은 UI 컴포넌트부터

2. ✅ `ManagementPageHeader.tsx` (가장 간단)
3. ✅ `StatsCard.tsx` (재사용 가능)
4. ✅ `StatsCards.tsx` (StatsCard 사용)

### Phase 3: 중간 크기 컴포넌트

5. ✅ `EntityTypeTabs.tsx`
6. ✅ `ManagementAlerts.tsx`

### Phase 4: 큰 컴포넌트

7. ✅ `EntityTable.tsx`
8. ✅ `CreateEntityModal.tsx`
9. ✅ `EditEntityModal.tsx`
10. ✅ `EntityForm.tsx` (선택)

### Phase 5: 최종 정리

11. ✅ `ManagementPage.tsx` 리팩토링
    - 단순히 컴포넌트 조합만 담당하도록

---

## 💡 추가 개선 사항

### 1. 스타일링 개선

- 인라인 스타일(`style={}`) → TailwindCSS 클래스로 전환
- 디자인 토큰 활용

### 2. 접근성 개선

- 시맨틱 HTML 적용 (`<main>`, `<section>` 등)
- ARIA 속성 추가
- 키보드 네비게이션 개선

### 3. 타입 안전성

- `any` 타입 제거
- formData 타입 명확히 정의

---

## ✅ 예상 효과

### Before (현재)

- 814줄의 거대한 파일
- 유지보수 어려움
- 테스트하기 어려움
- 재사용 불가능

### After (분리 후)

- 작은 단위의 컴포넌트들
- 각 컴포넌트가 단일 책임
- 독립적으로 테스트 가능
- 재사용 가능한 컴포넌트들
- 유지보수 용이

---

> 🎯 **다음 액션**: Phase 1부터 시작 - `useEntityManagement` hook 생성
