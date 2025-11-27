import React, { useState, useEffect } from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
// 레거시 컴포넌트이지만 any 타입은 제거
interface TableProps {
  columns?: Column[];
  data?: Record<string, unknown>[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: Record<string, unknown>) => void;

  // 🚨 도메인 관심사 추가
  entityType?: "user" | "post";
  onEdit?: (item: Record<string, unknown> & { id?: number }) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<Record<string, unknown>[]>(
    data || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    "table",
    striped && "table-striped",
    bordered && "table-bordered",
    hover && "table-hover",
  ]
    .filter(Boolean)
    .join(" ");

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

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

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (
    row: Record<string, unknown>,
    columnKey: string
  ): React.ReactNode => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === "user") {
      if (columnKey === "role") {
        // 타입 가드를 사용하여 userRole 타입 확인
        if (isUserRole(value)) {
          return <Badge userRole={value} showIcon />;
        }
        return <span>{String(value || "-")}</span>;
      }
      if (columnKey === "status") {
        // User status를 Badge status로 변환
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
        const rowId = isNumber(row.id) ? row.id : undefined;
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {rowId !== undefined && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete?.(rowId)}>
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
        // 타입 가드를 사용하여 status 타입 확인
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
        const rowId = isNumber(row.id) ? row.id : undefined;
        const rowStatus = isString(row.status) ? row.status : "";
        return (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
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
                variant="primary"
                onClick={() => onRestore?.(rowId)}>
                복원
              </Button>
            )}
            {rowId !== undefined && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete?.(rowId)}>
                삭제
              </Button>
            )}
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    // 기본값: unknown을 안전하게 문자열로 변환
    return String(value ?? "-");
  };

  return (
    <div className="table-container">
      {searchable && (
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "300px",
            }}
          />
        </div>
      )}

      <table className={tableClasses}>
        <thead>
          <tr>
            {actualColumns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: sortable ? "pointer" : "default",
                  }}>
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}>
              {actualColumns.map((column) => {
                const cellValue = entityType
                  ? renderCell(row, column.key)
                  : row[column.key];
                // ReactNode로 안전하게 변환
                return (
                  <td key={column.key}>
                    {React.isValidElement(cellValue)
                      ? cellValue
                      : cellValue !== null && cellValue !== undefined
                      ? String(cellValue)
                      : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              background: "white",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}>
            이전
          </button>
          <span style={{ padding: "6px 12px" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              background: "white",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}>
            다음
          </button>
        </div>
      )}
    </div>
  );
};
