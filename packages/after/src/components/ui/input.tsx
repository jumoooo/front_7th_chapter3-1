import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Before: padding: 8px 10px, font-size: 14px, border-radius: 3px, border: 1px solid #ccc, color: #000
          "flex w-full py-2 px-[10px] rounded-sm border border-[#ccc] bg-white text-sm text-[#000] font-[Arial,sans-serif] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#1976d2] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f5f5f5]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
