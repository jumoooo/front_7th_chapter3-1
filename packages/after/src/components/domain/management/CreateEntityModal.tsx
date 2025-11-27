import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { EntityForm } from "./EntityForm";
import type { EntityType, UserFormData, PostFormData } from "../../../types/domain";

/**
 * CreateEntityModal Props
 */
interface CreateEntityModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 엔티티 타입 */
  entityType: EntityType;
  /** 폼 데이터 */
  formData: UserFormData | PostFormData;
  /** 폼 데이터 변경 핸들러 */
  onFormDataChange: (data: UserFormData | PostFormData) => void;
  /** 생성 핸들러 */
  onSubmit: () => void;
}

/**
 * 엔티티 생성 모달 컴포넌트
 * shadcn/ui Dialog를 사용합니다.
 */
export const CreateEntityModal: React.FC<CreateEntityModalProps> = ({
  isOpen,
  onClose,
  entityType,
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
            새 {entityType === "user" ? "사용자" : "게시글"} 만들기
          </DialogTitle>
        </DialogHeader>
        {/* Before: padding: 24px */}
        <div className="p-6">
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
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

