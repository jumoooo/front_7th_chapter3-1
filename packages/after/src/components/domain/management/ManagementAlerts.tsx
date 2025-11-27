import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { X } from "lucide-react";
import { Button } from "../../ui/button";

/**
 * ManagementAlerts Props
 */
interface ManagementAlertsProps {
  /** 성공 알림 표시 여부 */
  showSuccess: boolean;
  /** 성공 메시지 */
  successMessage: string;
  /** 성공 알림 닫기 핸들러 */
  onCloseSuccess: () => void;
  /** 에러 알림 표시 여부 */
  showError: boolean;
  /** 에러 메시지 */
  errorMessage: string;
  /** 에러 알림 닫기 핸들러 */
  onCloseError: () => void;
}

/**
 * 관리 페이지 알림 컴포넌트
 * 성공/에러 알림을 표시합니다.
 * shadcn/ui Alert를 사용합니다.
 */
export const ManagementAlerts: React.FC<ManagementAlertsProps> = ({
  showSuccess,
  successMessage,
  onCloseSuccess,
  showError,
  errorMessage,
  onCloseError,
}) => {
  return (
    <>
      {/* Before: marginBottom: '10px' */}
      {showSuccess && (
        <div className="mb-[10px]">
          {/* Before: 배경 #e8f5e9, 테두리 #81c784, 텍스트 #1b5e20 */}
          <Alert className="bg-krds-success-50 border-krds-success-200">
            <AlertTitle className="text-krds-success-800 font-bold">
              성공
            </AlertTitle>
            <AlertDescription className="text-krds-success-800">
              {successMessage}
            </AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={onCloseSuccess}>
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}

      {/* Before: marginBottom: '10px' */}
      {showError && (
        <div className="mb-[10px]">
          {/* Before: 배경 #ffebee, 테두리 #e57373, 텍스트 #b71c1c */}
          <Alert className="bg-krds-error-50 border-krds-error-200">
            <AlertTitle className="text-krds-error-700 font-bold">
              오류
            </AlertTitle>
            <AlertDescription className="text-krds-error-700">
              {errorMessage}
            </AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={onCloseError}>
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}
    </>
  );
};

