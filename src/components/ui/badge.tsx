import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-success/20 text-success",
        warning: "border-transparent bg-warning/20 text-warning",
        trustHigh: "border-success/30 bg-success/15 text-success",
        trustMedium: "border-warning/30 bg-warning/15 text-warning",
        trustLow: "border-destructive/30 bg-destructive/15 text-destructive",
        supplier: "border-role-supplier/30 bg-role-supplier/15 text-role-supplier",
        buyer: "border-role-buyer/30 bg-role-buyer/15 text-role-buyer",
        admin: "border-role-admin/30 bg-role-admin/15 text-role-admin",
        active: "border-success/30 bg-success/15 text-success",
        pending: "border-warning/30 bg-warning/15 text-warning",
        inactive: "border-muted-foreground/30 bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
