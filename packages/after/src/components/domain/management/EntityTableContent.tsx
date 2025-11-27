import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../atoms/Badge"; // Badge는 나중에 shadcn/ui로 교체 예정
import { cn } from "@/lib/utils";
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
 * EntityTableContent Props
 */
interface EntityTableContentProps {
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
  /** 줄무늬 표시 여부 */
  striped?: boolean;
  /** 호버 효과 여부 */
  hover?: boolean;
}

// 타입 가드 함수들
const isUserRole = (
  value: unknown
): value is "admin" | "moderator" | "user" | "guest" => {
  return (
    typeof value === "string" &&
    ["admin", "moderator", "user", "guest"].includes(value)
  );
};

const isPostStatus = (
  value: unknown
): value is "draft" | "published" | "archived" => {
  return (
    typeof value === "string" &&
    ["draft", "published", "archived"].includes(value)
  );
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * 엔티티 테이블 콘텐츠 컴포넌트
 * shadcn/ui Table을 사용하여 렌더링합니다.
 */
export const EntityTableContent: React.FC<EntityTableContentProps> = ({
  columns,
  data,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
  striped = false,
  hover = false,
}) => {
  // 셀 렌더링 함수 (도메인별 로직 포함)
  const renderCell = (
    row: Entity,
    columnKey: string
  ): React.ReactNode => {
    const value = (row as Record<string, unknown>)[columnKey];

    if (entityType === "user") {
      if (columnKey === "role") {
        if (isUserRole(value)) {
          return <Badge userRole={value} showIcon />;
        }
        return <span>{String(value || "-")}</span>;
      }
      if (columnKey === "status") {
        const badgeStatus =
          value === "active"
            ? "published"
            : value === "inactive"
            ? "draft"
            : "rejected";
        return (
          <Badge
            status={badgeStatus as "published" | "draft" | "rejected"}
            showIcon
          />
        );
      }
      if (columnKey === "lastLogin") {
        return isString(value) ? value : "-";
      }
      if (columnKey === "actions") {
        const rowId = isNumber((row as Record<string, unknown>).id)
          ? (row as Record<string, unknown>).id as number
          : undefined;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="default" onClick={() => onEdit(row)}>
              수정
            </Button>
            {rowId !== undefined && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(rowId)}>
                삭제
              </Button>
            )}
          </div>
        );
      }
    }

    if (entityType === "post") {
      if (columnKey === "category") {
        const type =
          value === "development"
            ? "primary"
            : value === "design"
            ? "info"
            : value === "accessibility"
            ? "danger"
            : "secondary";
        return (
          <Badge type={type} pill>
            {isString(value) ? value : String(value || "")}
          </Badge>
        );
      }
      if (columnKey === "status") {
        if (isPostStatus(value)) {
          return <Badge status={value} showIcon />;
        }
        return <span>{String(value || "-")}</span>;
      }
      if (columnKey === "views") {
        if (isNumber(value)) {
          return value.toLocaleString();
        }
        return "0";
      }
      if (columnKey === "actions") {
        const rowId = isNumber((row as Record<string, unknown>).id)
          ? (row as Record<string, unknown>).id as number
          : undefined;
        const rowStatus = isString((row as Record<string, unknown>).status)
          ? (row as Record<string, unknown>).status
          : "";
        return (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="default" onClick={() => onEdit(row)}>
              수정
            </Button>
            {rowStatus === "draft" && rowId !== undefined && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(rowId)}>
                게시
              </Button>
            )}
            {rowStatus === "published" && rowId !== undefined && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(rowId)}>
                보관
              </Button>
            )}
            {rowStatus === "archived" && rowId !== undefined && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onRestore?.(rowId)}>
                복원
              </Button>
            )}
            {rowId !== undefined && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(rowId)}>
                삭제
              </Button>
            )}
          </div>
        );
      }
    }

    // 기본값: unknown을 안전하게 문자열로 변환
    return String(value ?? "-");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              style={column.width ? { width: column.width } : undefined}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={cn(
              striped && rowIndex % 2 === 1 && "bg-muted",
              hover && "hover:bg-muted/50"
            )}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {renderCell(row, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
