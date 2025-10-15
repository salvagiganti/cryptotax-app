import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "outline" | "secondary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary text-white",
  success: "bg-accent text-white",
  outline: "border border-foreground/20 text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}


