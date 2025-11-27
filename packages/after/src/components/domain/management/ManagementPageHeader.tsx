import React from "react";
import { ThemeToggle } from "../../ui/theme-toggle";

/**
 * 관리 페이지 헤더 컴포넌트
 * 페이지 제목과 설명을 표시합니다.
 */
export const ManagementPageHeader: React.FC = () => {
  return (
    <header className="mb-5 flex items-start justify-between">
      <div>
        {/* Before: fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', color: '#333' */}
        <h1 className="text-2xl font-bold mb-[5px] text-foreground">
          관리 시스템
        </h1>
        {/* Before: color: '#666', fontSize: '14px' */}
        <p className="text-muted-foreground text-sm">
          사용자와 게시글을 관리하세요
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
};
