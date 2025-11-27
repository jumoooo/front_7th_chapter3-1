# 🎣 useEntityManagement Hook 구성 내용

> 📍 **목적**: ManagementPage.tsx에서 hook으로 분리해야 할 부분을 명확히 정리

---

## ✅ Hook에 들어가야 할 부분

### 1️⃣ 상태 관리 (useState) - 13줄~23줄

```typescript
// ✅ Hook으로 이동
const [entityType, setEntityType] = useState<EntityType>("post");
const [data, setData] = useState<Entity[]>([]);
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
const [showSuccessAlert, setShowSuccessAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [showErrorAlert, setShowErrorAlert] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [formData, setFormData] = useState<any>({});
```

---

### 2️⃣ useEffect (entityType 변경 시 초기화) - 25줄~31줄

```typescript
// ✅ Hook으로 이동
useEffect(() => {
  loadData();
  setFormData({});
  setIsCreateModalOpen(false);
  setIsEditModalOpen(false);
  setSelectedItem(null);
}, [entityType]);
```

---

### 3️⃣ 데이터 로딩 함수 - 33줄~48줄

```typescript
// ✅ Hook으로 이동
const loadData = async () => {
  try {
    let result: Entity[];

    if (entityType === "user") {
      result = await userService.getAll();
    } else {
      result = await postService.getAll();
    }

    setData(result);
  } catch (error: any) {
    setErrorMessage("데이터를 불러오는데 실패했습니다");
    setShowErrorAlert(true);
  }
};
```

---

### 4️⃣ CRUD 핸들러 함수들

#### 4-1. handleCreate - 50줄~80줄

```typescript
// ✅ Hook으로 이동
const handleCreate = async () => {
  try {
    if (entityType === "user") {
      await userService.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || "user",
        status: formData.status || "active",
      });
    } else {
      await postService.create({
        title: formData.title,
        content: formData.content || "",
        author: formData.author,
        category: formData.category,
        status: formData.status || "draft",
      });
    }

    await loadData();
    setIsCreateModalOpen(false);
    setFormData({});
    setAlertMessage(
      `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`
    );
    setShowSuccessAlert(true);
  } catch (error: any) {
    setErrorMessage(error.message || "생성에 실패했습니다");
    setShowErrorAlert(true);
  }
};
```

#### 4-2. handleEdit - 82줄~105줄

```typescript
// ✅ Hook으로 이동
const handleEdit = (item: Entity) => {
  setSelectedItem(item);

  if (entityType === "user") {
    const user = item as User;
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } else {
    const post = item as Post;
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      status: post.status,
    });
  }

  setIsEditModalOpen(true);
};
```

#### 4-3. handleUpdate - 107줄~129줄

```typescript
// ✅ Hook으로 이동
const handleUpdate = async () => {
  if (!selectedItem) return;

  try {
    if (entityType === "user") {
      await userService.update(selectedItem.id, formData);
    } else {
      await postService.update(selectedItem.id, formData);
    }

    await loadData();
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedItem(null);
    setAlertMessage(
      `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`
    );
    setShowSuccessAlert(true);
  } catch (error: any) {
    setErrorMessage(error.message || "수정에 실패했습니다");
    setShowErrorAlert(true);
  }
};
```

#### 4-4. handleDelete - 131줄~148줄

```typescript
// ✅ Hook으로 이동
const handleDelete = async (id: number) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    if (entityType === "user") {
      await userService.delete(id);
    } else {
      await postService.delete(id);
    }

    await loadData();
    setAlertMessage("삭제되었습니다");
    setShowSuccessAlert(true);
  } catch (error: any) {
    setErrorMessage(error.message || "삭제에 실패했습니다");
    setShowErrorAlert(true);
  }
};
```

#### 4-5. handleStatusAction - 150줄~174줄

```typescript
// ✅ Hook으로 이동
const handleStatusAction = async (
  id: number,
  action: "publish" | "archive" | "restore"
) => {
  if (entityType !== "post") return;

  try {
    if (action === "publish") {
      await postService.publish(id);
    } else if (action === "archive") {
      await postService.archive(id);
    } else if (action === "restore") {
      await postService.restore(id);
    }

    await loadData();
    const message =
      action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
    setAlertMessage(`${message}되었습니다`);
    setShowSuccessAlert(true);
  } catch (error: any) {
    setErrorMessage(error.message || "작업에 실패했습니다");
    setShowErrorAlert(true);
  }
};
```

---

### 5️⃣ 유틸리티 함수들

#### 5-1. getStats - 176줄~228줄

```typescript
// ✅ Hook으로 이동
const getStats = () => {
  if (entityType === "user") {
    const users = data as User[];
    return {
      total: users.length,
      stat1: {
        label: "활성",
        value: users.filter((u) => u.status === "active").length,
        color: "#2e7d32",
      },
      stat2: {
        label: "비활성",
        value: users.filter((u) => u.status === "inactive").length,
        color: "#ed6c02",
      },
      stat3: {
        label: "정지",
        value: users.filter((u) => u.status === "suspended").length,
        color: "#d32f2f",
      },
      stat4: {
        label: "관리자",
        value: users.filter((u) => u.role === "admin").length,
        color: "#1976d2",
      },
    };
  } else {
    const posts = data as Post[];
    return {
      total: posts.length,
      stat1: {
        label: "게시됨",
        value: posts.filter((p) => p.status === "published").length,
        color: "#2e7d32",
      },
      stat2: {
        label: "임시저장",
        value: posts.filter((p) => p.status === "draft").length,
        color: "#ed6c02",
      },
      stat3: {
        label: "보관됨",
        value: posts.filter((p) => p.status === "archived").length,
        color: "rgba(0, 0, 0, 0.6)",
      },
      stat4: {
        label: "총 조회수",
        value: posts.reduce((sum, p) => sum + p.views, 0),
        color: "#1976d2",
      },
    };
  }
};
```

#### 5-2. renderTableColumns - 231줄~255줄

```typescript
// ✅ Hook으로 이동
const renderTableColumns = () => {
  if (entityType === "user") {
    return [
      { key: "id", header: "ID", width: "60px" },
      { key: "username", header: "사용자명", width: "150px" },
      { key: "email", header: "이메일" },
      { key: "role", header: "역할", width: "120px" },
      { key: "status", header: "상태", width: "120px" },
      { key: "createdAt", header: "생성일", width: "120px" },
      { key: "lastLogin", header: "마지막 로그인", width: "140px" },
      { key: "actions", header: "관리", width: "200px" },
    ];
  } else {
    return [
      { key: "id", header: "ID", width: "60px" },
      { key: "title", header: "제목" },
      { key: "author", header: "작성자", width: "120px" },
      { key: "category", header: "카테고리", width: "140px" },
      { key: "status", header: "상태", width: "120px" },
      { key: "views", header: "조회수", width: "100px" },
      { key: "createdAt", header: "작성일", width: "120px" },
      { key: "actions", header: "관리", width: "250px" },
    ];
  }
};
```

---

## ❌ Hook에 들어가지 않아야 할 부분

### UI 렌더링 부분 (259줄~813줄)

```typescript
// ❌ Hook에 들어가지 않음 - ManagementPage 컴포넌트에 남겨둠
return (
  <div style={{ minHeight: "100vh", background: "#f0f0f0" }}>
    {/* 모든 JSX 렌더링 코드 */}
  </div>
);
```

---

## 📋 Hook 반환값 구조

```typescript
export const useEntityManagement = () => {
  // ... 모든 상태와 함수들 ...

  return {
    // 상태
    entityType,
    setEntityType,
    data,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    showSuccessAlert,
    setShowSuccessAlert,
    alertMessage,
    showErrorAlert,
    setShowErrorAlert,
    errorMessage,
    formData,
    setFormData,

    // 핸들러
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleStatusAction,

    // 유틸리티 결과
    stats: getStats(),
    tableColumns: renderTableColumns(),
  };
};
```

---

## 📊 정리

### Hook에 들어가는 줄 수

- 상태 관리: 13줄~23줄 (11줄)
- useEffect: 25줄~31줄 (7줄)
- loadData: 33줄~48줄 (16줄)
- handleCreate: 50줄~80줄 (31줄)
- handleEdit: 82줄~105줄 (24줄)
- handleUpdate: 107줄~129줄 (23줄)
- handleDelete: 131줄~148줄 (18줄)
- handleStatusAction: 150줄~174줄 (25줄)
- getStats: 176줄~228줄 (53줄)
- renderTableColumns: 231줄~255줄 (25줄)

**총 약 233줄**이 hook으로 이동합니다.

### ManagementPage에 남는 부분

- import 문들
- return 문 안의 JSX (약 555줄)
- **총 약 580줄**이 컴포넌트에 남습니다.

---

> 🎯 **다음 액션**: `hooks/useEntityManagement.ts` 파일 생성 및 위 내용 구현
