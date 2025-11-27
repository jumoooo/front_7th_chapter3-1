import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
        className={cn(
          // Before: padding: 16.5px 14px, font-size: 16px, border-radius: 4px, border: 1px solid rgba(0, 0, 0, 0.23), color: rgba(0, 0, 0, 0.87)
          "flex min-h-[6em] w-full rounded border border-[rgba(0,0,0,0.23)] bg-white py-[16.5px] px-[14px] text-base text-[rgba(0,0,0,0.87)] font-['Roboto','Helvetica','Arial',sans-serif] font-normal leading-[1.1876em] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#1976d2] focus-visible:border-2 focus-visible:py-[15.5px] focus-visible:px-[13px] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[rgba(0,0,0,0.12)] resize-y",
          className
        )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
