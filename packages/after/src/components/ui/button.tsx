import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Before: font-family: Arial, sans-serif, font-weight: normal, line-height: 1.5, border-radius: 3px, cursor: pointer, border: 1px solid, white-space: nowrap
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-normal leading-[1.5] transition-all disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-[Arial,sans-serif] cursor-pointer border",
  {
    variants: {
      variant: {
        // Before: btn-primary = background: #1976d2, color: #fff, border: #1565c0, hover: #1565c0
        default: "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 hover:border-primary/90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
        // Before: btn-danger = background: #d32f2f, color: #fff, border: #c62828, hover: #c62828
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90 hover:border-destructive/90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-background shadow-xs hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer",
        // Before: btn-secondary = background: #f5f5f5, color: #333, border: #ddd, hover: #e0e0e0
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:border-border cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
        // Before: btn-success = background: #388e3c, color: #fff, border: #2e7d32, hover: #2e7d32
        success:
          "bg-[#388e3c] text-white border border-[#2e7d32] hover:bg-[#2e7d32] hover:border-[#2e7d32] dark:bg-[#4caf50] dark:border-[#4caf50] dark:hover:bg-[#66bb6a] dark:hover:border-[#66bb6a] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
      },
      size: {
        // Before: btn-md = padding: 10px 20px, font-size: 14px
        default: "px-5 py-[10px] text-sm has-[>svg]:px-3 rounded-sm",
        // Before: btn-sm = padding: 6px 12px, font-size: 13px
        sm: "px-3 py-[6px] text-[13px] rounded-sm gap-1.5 has-[>svg]:px-2.5",
        // Before: btn-lg = padding: 12px 24px, font-size: 15px
        lg: "px-6 py-3 text-[15px] rounded-sm has-[>svg]:px-4",
        icon: "size-9 rounded-sm",
        "icon-sm": "size-8 rounded-sm",
        "icon-lg": "size-10 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PrimitiveButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, PrimitiveButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
