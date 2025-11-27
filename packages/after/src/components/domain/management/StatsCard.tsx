import React from "react";
import { Card, CardContent } from "../../ui/card";
import { cn } from "@/lib/utils";

/**
 * 통계 카드 Props
 */
interface StatsCardProps {
  /** 카드 라벨 */
  label: string;
  /** 카드 값 */
  value: number;
  /** 값의 색상 클래스 (선택사항) */
  valueColorClass?: string;
  /** 배경색 클래스 (선택사항) */
  backgroundColorClass?: string;
  /** 테두리 색상 클래스 (선택사항) */
  borderColorClass?: string;
}

/**
 * 개별 통계 카드 컴포넌트
 * 재사용 가능한 순수 UI 컴포넌트입니다.
 * TailwindCSS 디자인 토큰을 사용합니다.
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  valueColorClass,
  backgroundColorClass,
  borderColorClass,
}) => {
  // CSS 변수를 직접 사용하여 스타일 생성
  const getBackgroundColor = () => {
    if (backgroundColorClass?.includes("primary-50")) return "hsl(var(--krds-color-primary-50))";
    if (backgroundColorClass?.includes("success-50")) return "hsl(var(--krds-color-success-50))";
    if (backgroundColorClass?.includes("warning-50")) return "hsl(var(--krds-color-warning-50))";
    if (backgroundColorClass?.includes("error-50")) return "hsl(var(--krds-color-error-50))";
    if (backgroundColorClass?.includes("neutral-100")) return "hsl(var(--krds-color-neutral-100))";
    return undefined;
  };

  const getBorderColor = () => {
    if (borderColorClass?.includes("primary-200")) return "hsl(var(--krds-color-primary-200))";
    if (borderColorClass?.includes("success-200")) return "hsl(var(--krds-color-success-200))";
    if (borderColorClass?.includes("warning-200")) return "hsl(var(--krds-color-warning-200))";
    if (borderColorClass?.includes("error-200")) return "hsl(var(--krds-color-error-200))";
    if (borderColorClass?.includes("neutral-400")) return "hsl(var(--krds-color-neutral-400))";
    return undefined;
  };

  const getTextColor = () => {
    if (valueColorClass?.includes("primary-500")) return "hsl(var(--krds-color-primary-500))";
    if (valueColorClass?.includes("success-500")) return "hsl(var(--krds-color-success-500))";
    if (valueColorClass?.includes("warning-500")) return "hsl(var(--krds-color-warning-500))";
    if (valueColorClass?.includes("error-500")) return "hsl(var(--krds-color-error-500))";
    if (valueColorClass?.includes("neutral-600")) return "hsl(var(--krds-color-neutral-600))";
    return undefined;
  };

  return (
    <Card
      className={cn(
        "rounded-sm border",
        "px-[15px] py-3", // Before: padding: '12px 15px'
        // TailwindCSS 클래스가 작동하지 않을 경우를 대비해 인라인 스타일도 함께 사용
        !backgroundColorClass && "bg-card",
        !borderColorClass && "border-border"
      )}
      style={{
        ...(getBackgroundColor() && { backgroundColor: getBackgroundColor() }),
        ...(getBorderColor() && { borderColor: getBorderColor() }),
      }}
      role="region"
      aria-label={`${label} 통계`}>
      <CardContent className="p-0">
        {/* Before: fontSize: '12px', color: '#666', marginBottom: '4px' */}
        <div className="text-xs text-muted-foreground mb-[4px]" aria-hidden="true">
          {label}
        </div>
        <div
          className={cn(
            "text-2xl font-bold",
            !valueColorClass && "text-foreground"
          )}
          style={{
            ...(getTextColor() && { color: getTextColor() }),
          }}
          aria-live="polite"
          aria-atomic="true">
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

