import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { Button } from "../../ui/button";
import { EntityForm } from "./EntityForm";
import type {
  EntityType,
  Entity,
  UserFormData,
  PostFormData,
} from "../../../types/domain";
import type { Post } from "../../../services/postService";

/**
 * EditEntityModal Props
 */
interface EditEntityModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 엔티티 타입 */
  entityType: EntityType;
  /** 선택된 아이템 */
  selectedItem: Entity | null;
  /** 폼 데이터 */
  formData: UserFormData | PostFormData;
  /** 폼 데이터 변경 핸들러 */
  onFormDataChange: (data: UserFormData | PostFormData) => void;
  /** 수정 핸들러 */
  onSubmit: () => void;
}

/**
 * 엔티티 수정 모달 컴포넌트
 * shadcn/ui Dialog를 사용합니다.
 */
export const EditEntityModal: React.FC<EditEntityModalProps> = ({
  isOpen,
  onClose,
  entityType,
  selectedItem,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  const handleClose = () => {
    onClose();
    onFormDataChange({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      {/* Before: max-width: 900px (large), border-radius: 4px */}
      <DialogContent className="max-w-[900px] rounded">
        {/* Before: padding: 16px 24px, border-bottom */}
        <DialogHeader className="px-6 py-4 border-b border-[rgba(0,0,0,0.12)]">
          <DialogTitle className="text-xl font-medium text-[rgba(0,0,0,0.87)]">
            {entityType === "user" ? "사용자" : "게시글"} 수정
          </DialogTitle>
        </DialogHeader>
        {/* Before: padding: 24px */}
        <div className="p-6 space-y-4">
          {selectedItem && (
            <Alert className="bg-[#e3f2fd] border-[#90caf9] text-[#0d47a1]">
              <AlertDescription>
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === "post" &&
                  ` | 조회수: ${(selectedItem as Post).views}`}
              </AlertDescription>
            </Alert>
          )}

          <EntityForm
            entityType={entityType}
            formData={formData}
            onChange={onFormDataChange}
          />
        </div>
        {/* Before: padding: 16px 24px, border-top, gap: 8px */}
        <DialogFooter className="px-6 py-4 border-t border-[rgba(0,0,0,0.12)] gap-2">
          {/* Before: size="md" = padding: 10px 20px, font-size: 14px */}
          <Button variant="secondary" size="default" onClick={handleClose}>
            취소
          </Button>
          <Button variant="default" size="default" onClick={onSubmit}>
            수정 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
