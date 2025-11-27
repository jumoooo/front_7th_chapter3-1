import React from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import type { EntityType } from "../../../types/domain";

/**
 * EntityTypeTabs Props
 */
interface EntityTypeTabsProps {
  /** 현재 선택된 엔티티 타입 */
  entityType: EntityType;
  /** 엔티티 타입 변경 핸들러 */
  onEntityTypeChange: (type: EntityType) => void;
}

/**
 * 엔티티 타입 탭 컴포넌트
 * 게시글/사용자 전환 버튼을 제공합니다.
 */
export const EntityTypeTabs: React.FC<EntityTypeTabsProps> = ({
  entityType,
  onEntityTypeChange,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, targetType: EntityType) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEntityTypeChange(targetType);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const types: EntityType[] = ["post", "user"];
      const currentIndex = types.indexOf(entityType);
      const nextIndex =
        e.key === "ArrowLeft"
          ? (currentIndex - 1 + types.length) % types.length
          : (currentIndex + 1) % types.length;
      onEntityTypeChange(types[nextIndex]);
    }
  };

  return (
    // Before: marginBottom: '15px', borderBottom: '2px solid #ccc', paddingBottom: '5px'
    <div
      className="mb-[15px] border-b-2 border-border pb-[5px]"
      role="tablist"
      aria-label="엔티티 타입 선택">
      {/* Before: padding: '8px 16px', marginRight: '5px', fontSize: '14px', fontWeight: 선택시 'bold' 아니면 'normal', border: '1px solid #999', background: 선택시 '#1976d2' 아니면 '#f5f5f5', color: 선택시 'white' 아니면 '#333', borderRadius: '3px' */}
      <Button
        id="tab-post"
        role="tab"
        aria-selected={entityType === "post"}
        aria-controls="entity-content"
        tabIndex={entityType === "post" ? 0 : -1}
        onClick={() => onEntityTypeChange("post")}
        onKeyDown={(e) => handleKeyDown(e, "post")}
        variant={entityType === "post" ? "default" : "secondary"}
        size="default"
        className={cn(
          // Before: padding: '8px 16px' (세로 8px, 가로 16px) - size="default"의 padding 오버라이드
          "!px-4 !py-2 mr-[5px] text-sm rounded-sm border",
          entityType === "post"
            ? "bg-primary text-primary-foreground font-bold border-primary"
            : "bg-secondary text-secondary-foreground font-normal border-border"
        )}>
        게시글
      </Button>
      <Button
        id="tab-user"
        role="tab"
        aria-selected={entityType === "user"}
        aria-controls="entity-content"
        tabIndex={entityType === "user" ? 0 : -1}
        onClick={() => onEntityTypeChange("user")}
        onKeyDown={(e) => handleKeyDown(e, "user")}
        variant={entityType === "user" ? "default" : "secondary"}
        size="default"
        className={cn(
          // Before: padding: '8px 16px' (세로 8px, 가로 16px) - size="default"의 padding 오버라이드
          "!px-4 !py-2 text-sm rounded-sm border",
          entityType === "user"
            ? "bg-primary text-primary-foreground font-bold border-primary"
            : "bg-secondary text-secondary-foreground font-normal border-border"
        )}>
        사용자
      </Button>
    </div>
  );
};

