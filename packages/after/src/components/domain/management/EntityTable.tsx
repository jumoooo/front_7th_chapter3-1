import React from "react";
import { EntityTableContent } from "./EntityTableContent";
import type { EntityType, Entity } from "../../../types/domain";

/**
 * 테이블 컬럼 타입
 */
interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

/**
 * EntityTable Props
 */
interface EntityTableProps {
  /** 테이블 컬럼 정의 */
  columns: TableColumn[];
  /** 테이블 데이터 */
  data: Entity[];
  /** 엔티티 타입 */
  entityType: EntityType;
  /** 수정 핸들러 */
  onEdit: (item: Entity) => void;
  /** 삭제 핸들러 */
  onDelete: (id: number) => void;
  /** 게시 핸들러 (게시글만) */
  onPublish?: (id: number) => void;
  /** 보관 핸들러 (게시글만) */
  onArchive?: (id: number) => void;
  /** 복원 핸들러 (게시글만) */
  onRestore?: (id: number) => void;
}

/**
 * 엔티티 테이블 래퍼 컴포넌트
 * shadcn/ui Table을 사용하여 렌더링합니다.
 */
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
  // Before: border: '1px solid #ddd', background: 'white', overflow: 'auto'
  return (
    <div className="border border-border bg-card overflow-auto">
      <EntityTableContent
        columns={columns}
        data={data}
        entityType={entityType}
        onEdit={onEdit}
        onDelete={onDelete}
        onPublish={onPublish}
        onArchive={onArchive}
        onRestore={onRestore}
        striped
        hover
      />
    </div>
  );
};

