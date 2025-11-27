import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";

/**
 * EntityFormField Props
 */
interface EntityFormFieldProps {
  /** 필드 타입 */
  type: "input" | "select" | "textarea";
  /** 필드 이름 */
  name: string;
  /** 필드 값 */
  value: string;
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 라벨 */
  label: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 필수 여부 */
  required?: boolean;
  /** input 타입 (input일 때만) */
  inputType?: "text" | "email" | "password" | "number" | "url";
  /** 선택 옵션 (select일 때만) */
  options?: Array<{ value: string; label: string }>;
  /** 행 수 (textarea일 때만) */
  rows?: number;
}

/**
 * 엔티티 폼 필드 컴포넌트
 * shadcn/ui 컴포넌트를 사용하는 순수 UI 컴포넌트입니다.
 */
export const EntityFormField: React.FC<EntityFormFieldProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  required,
  inputType = "text",
  options = [],
  rows = 6,
}) => {
  const fieldId = `field-${name}`;

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="필수 항목">
            *
          </span>
        )}
      </Label>

      {type === "input" && (
        <Input
          id={fieldId}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-describedby={placeholder ? `${fieldId}-description` : undefined}
        />
      )}

      {type === "select" && (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={fieldId} aria-required={required}>
            <SelectValue placeholder={placeholder || "선택하세요"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === "textarea" && (
        <Textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          aria-required={required}
          aria-describedby={placeholder ? `${fieldId}-description` : undefined}
        />
      )}

      {placeholder && (
        <span id={`${fieldId}-description`} className="sr-only">
          {placeholder}
        </span>
      )}
    </div>
  );
};

