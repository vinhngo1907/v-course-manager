import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {

        // Primary - Orange #FFB347
        default:
          "border-transparent bg-[#FFB347] text-[#2C2C2C] hover:opacity-90",

        // Secondary - Darker Orange #F5A028
        secondary:
          "border-transparent bg-[#F5A028] text-white hover:opacity-90",

        // Light background - Cream #FFF1DC
        light:
          "border-transparent bg-[#FFF1DC] text-[#2C2C2C]",

        // Outline - Neutral
        outline:
          "border-[#2C2C2C]/30 text-[#2C2C2C] bg-transparent",

        // Dark badge
        dark:
          "border-transparent bg-[#2C2C2C] text-white",

        // Danger (giữ lại)
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }