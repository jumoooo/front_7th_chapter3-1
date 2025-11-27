import { useState, useEffect, useCallback } from "react";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import type {
  EntityType,
  Entity,
  UserFormData,
  PostFormData,
} from "../types/domain";

/**
 * 통계 데이터 타입
 */
interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface Stats {
  total: number;
  stat1: StatItem;
  stat2: StatItem;
  stat3: StatItem;
  stat4: StatItem;
}

/**
 * 테이블 컬럼 타입
 */
interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

/**
 * Entity 관리 비즈니스 로직을 담당하는 Hook
 *
 * @returns Entity 관리에 필요한 모든 상태와 핸들러 함수들
 */
export const useEntityManagement = () => {
  // ============================================
  // 상태 관리
  // ============================================
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<UserFormData | PostFormData>({});

  // ============================================
  // 데이터 로딩
  // ============================================
  const loadData = useCallback(async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "데이터를 불러오는데 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  }, [entityType]);

  // ============================================
  // entityType 변경 시 초기화
  // ============================================
  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, loadData]);

  // ============================================
  // CRUD 핸들러 함수들
  // ============================================

  /**
   * 새 엔티티 생성
   */
  const handleCreate = useCallback(async () => {
    try {
      if (entityType === "user") {
        const userData = formData as UserFormData;
        await userService.create({
          username: userData.username || "",
          email: userData.email || "",
          role: userData.role || "user",
          status: userData.status || "active",
        });
      } else {
        const postData = formData as PostFormData;
        await postService.create({
          title: postData.title || "",
          content: postData.content || "",
          author: postData.author || "",
          category: postData.category || "",
          status: postData.status || "draft",
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "생성에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  }, [entityType, formData, loadData]);

  /**
   * 엔티티 수정 준비 (모달 열기 및 폼 데이터 설정)
   */
  const handleEdit = useCallback(
    (item: Entity) => {
      setSelectedItem(item);

      if (entityType === "user") {
        const user = item as User;
        setFormData({
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        } as UserFormData);
      } else {
        const post = item as Post;
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
          status: post.status,
        } as PostFormData);
      }

      setIsEditModalOpen(true);
    },
    [entityType]
  );

  /**
   * 엔티티 수정 실행
   */
  const handleUpdate = useCallback(async () => {
    if (!selectedItem) return;

    try {
      if (entityType === "user") {
        const userData = formData as UserFormData;
        await userService.update(selectedItem.id, userData);
      } else {
        const postData = formData as PostFormData;
        await postService.update(selectedItem.id, postData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "수정에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  }, [entityType, selectedItem, formData, loadData]);

  /**
   * 엔티티 삭제
   */
  const handleDelete = useCallback(
    async (id: number) => {
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
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "삭제에 실패했습니다";
        setErrorMessage(message);
        setShowErrorAlert(true);
      }
    },
    [entityType, loadData]
  );

  /**
   * 게시글 상태 변경 (게시/보관/복원)
   */
  const handleStatusAction = useCallback(
    async (id: number, action: "publish" | "archive" | "restore") => {
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
          action === "publish"
            ? "게시"
            : action === "archive"
            ? "보관"
            : "복원";
        setAlertMessage(`${message}되었습니다`);
        setShowSuccessAlert(true);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "작업에 실패했습니다";
        setErrorMessage(message);
        setShowErrorAlert(true);
      }
    },
    [entityType, loadData]
  );

  // ============================================
  // 유틸리티 함수들
  // ============================================

  /**
   * 통계 데이터 계산
   */
  const getStats = useCallback((): Stats => {
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
  }, [entityType, data]);

  /**
   * 테이블 컬럼 정의
   */
  const renderTableColumns = useCallback((): TableColumn[] => {
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
  }, [entityType]);

  // ============================================
  // 반환값
  // ============================================
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
    setSelectedItem,
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
