import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-[#FFB347]",
                success: "bg-emerald-100",
            },
            size: {
                xs: "p-1",
                sm: "p-1.5",
                default: "p-2",
                lg: "p-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "text-white", // 🔥 better contrast
            success: "text-emerald-700",
        },
        size: {
            xs: "h-4 w-4",
            sm: "h-6 w-6",
            default: "h-8 w-8",
            lg: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps
    extends BackgroundVariantsProps,
        IconVariantsProps {
    icon: LucideIcon;
    className?: string;        // ✅ wrapper override
    iconClassName?: string;    // ✅ icon override
}

export const IconBadge = ({
    icon: Icon,
    variant,
    size,
    className,
    iconClassName,
}: IconBadgeProps) => {
    return (
        <div
            className={cn(
                backgroundVariants({ variant, size }),
                className
            )}
        >
            <Icon
                className={cn(
                    iconVariants({ variant, size }),
                    iconClassName
                )}
            />
        </div>
    );
};