import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

/**
 * EntityDialog Props
 */
interface EntityDialogProps {
  /** 다이얼로그 열림 여부 */
  open: boolean;
  /** 다이얼로그 닫기 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 다이얼로그 제목 */
  title: string;
  /** 다이얼로그 설명 */
  description?: string;
  /** 다이얼로그 내용 */
  children: React.ReactNode;
  /** 푸터 버튼들 */
  footer?: React.ReactNode;
  /** 크기 */
  size?: "small" | "medium" | "large";
}

/**
 * 엔티티 다이얼로그 컴포넌트
 * shadcn/ui Dialog를 래핑한 컴포넌트입니다.
 */
export const EntityDialog: React.FC<EntityDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-lg",
    large: "max-w-2xl",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

