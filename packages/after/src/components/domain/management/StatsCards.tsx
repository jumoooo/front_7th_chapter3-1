import React from "react";
import { StatsCard } from "./StatsCard";

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
 * StatsCards Props
 */
interface StatsCardsProps {
  /** 통계 데이터 */
  stats: Stats;
}

/**
 * 통계 카드 그리드 컴포넌트
 * 여러 개의 StatsCard를 그리드 형태로 표시합니다.
 * TailwindCSS 디자인 토큰을 사용합니다.
 */
export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    // Before: display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '15px'
    <section
      className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px] mb-[15px]"
      aria-label="통계 정보">
      {/* 전체 - Before: 배경 #e3f2fd, 테두리 #90caf9, 텍스트 #1976d2 */}
      <StatsCard
        label="전체"
        value={stats.total}
        backgroundColorClass="bg-krds-primary-50"
        borderColorClass="border-krds-primary-200"
        valueColorClass="text-krds-primary-500"
      />
      {/* Success - Before: 배경 #e8f5e9, 테두리 #81c784, 텍스트 #388e3c */}
      <StatsCard
        label={stats.stat1.label}
        value={stats.stat1.value}
        backgroundColorClass="bg-krds-success-50"
        borderColorClass="border-krds-success-200"
        valueColorClass="text-krds-success-500"
      />
      {/* Warning - Before: 배경 #fff3e0, 테두리 #ffb74d, 텍스트 #f57c00 */}
      <StatsCard
        label={stats.stat2.label}
        value={stats.stat2.value}
        backgroundColorClass="bg-krds-warning-50"
        borderColorClass="border-krds-warning-200"
        valueColorClass="text-krds-warning-500"
      />
      {/* Error - Before: 배경 #ffebee, 테두리 #e57373, 텍스트 #d32f2f */}
      <StatsCard
        label={stats.stat3.label}
        value={stats.stat3.value}
        backgroundColorClass="bg-krds-error-50"
        borderColorClass="border-krds-error-200"
        valueColorClass="text-krds-error-500"
      />
      {/* Neutral - Before: 배경 #f5f5f5, 테두리 #bdbdbd, 텍스트 #424242 */}
      <StatsCard
        label={stats.stat4.label}
        value={stats.stat4.value}
        backgroundColorClass="bg-krds-neutral-100"
        borderColorClass="border-krds-neutral-400"
        valueColorClass="text-krds-neutral-600"
      />
    </section>
  );
};

