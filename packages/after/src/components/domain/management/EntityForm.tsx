import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import type {
  EntityType,
  UserFormData,
  PostFormData,
} from "../../../types/domain";

/**
 * EntityForm Props
 */
interface EntityFormProps {
  /** 엔티티 타입 */
  entityType: EntityType;
  /** 폼 데이터 */
  formData: UserFormData | PostFormData;
  /** 폼 데이터 변경 핸들러 */
  onChange: (data: UserFormData | PostFormData) => void;
}

/**
 * 엔티티 폼 컴포넌트
 * User 또는 Post에 따라 다른 폼을 렌더링합니다.
 * shadcn/ui Input, Select, Textarea, Label을 사용합니다.
 */
export const EntityForm: React.FC<EntityFormProps> = ({
  entityType,
  formData,
  onChange,
}) => {
  const handleFieldChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value } as UserFormData | PostFormData);
  };

  if (entityType === "user") {
    // 타입 가드: entityType이 "user"일 때 formData는 UserFormData
    const userFormData = formData as UserFormData;
    // Before: form-group = margin-bottom: 16px
    return (
      <div className="space-y-4">
        {/* Before: form-label = margin-bottom: 6px */}
        <div className="mb-4">
          <Label htmlFor="username">
            사용자명 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            value={userFormData.username || ""}
            onChange={(e) => handleFieldChange("username", e.target.value)}
            placeholder="사용자명을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">
            이메일 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userFormData.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        {/* Before: gap: 16px */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <Label htmlFor="role">역할</Label>
            <Select
              value={userFormData.role || "user"}
              onValueChange={(value) => handleFieldChange("role", value)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="역할 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">사용자</SelectItem>
                <SelectItem value="moderator">운영자</SelectItem>
                <SelectItem value="admin">관리자</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="status">상태</Label>
            <Select
              value={userFormData.status || "active"}
              onValueChange={(value) => handleFieldChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="inactive">비활성</SelectItem>
                <SelectItem value="suspended">정지</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  } else {
    // 타입 가드: entityType이 "post"일 때 formData는 PostFormData
    const postFormData = formData as PostFormData;
    // Before: form-group = margin-bottom: 16px
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="title">
            제목 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            value={postFormData.title || ""}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>
        {/* Before: gap: 16px */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <Label htmlFor="author">
              작성자 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={postFormData.author || ""}
              onChange={(e) => handleFieldChange("author", e.target.value)}
              placeholder="작성자명"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="category">카테고리</Label>
            <Select
              value={postFormData.category || ""}
              onValueChange={(value) => handleFieldChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="accessibility">Accessibility</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            name="content"
            value={postFormData.content || ""}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            placeholder="게시글 내용을 입력하세요"
            rows={6}
          />
        </div>
      </div>
    );
  }
};
