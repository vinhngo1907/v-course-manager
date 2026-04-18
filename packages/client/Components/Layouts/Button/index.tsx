import clsx from "clsx";
import React from "react";

type Intent = "primary" | "secondary" | "danger" | "highlight" | "success";
type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: React.ReactNode;
  intent?: Intent;
  variant?: Variant;
  size?: Size;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyle =
  "inline-flex items-center justify-center rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizeStyle: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const intentStyle: Record<Intent, Record<Variant, string>> = {
  primary: {
    solid:
      "bg-[#FFB347] text-[#2C2C2C] hover:bg-[#F5A028] focus:ring-[#FFB347]",
    outline:
      "border border-[#FFB347] text-[#FFB347] hover:bg-[#FFF1DC] focus:ring-[#FFB347]",
    ghost:
      "text-[#FFB347] hover:bg-[#FFF1DC] focus:ring-[#FFB347]",
  },

  secondary: {
    solid:
      "bg-[#F5A028] text-[#2C2C2C] hover:bg-[#FFB347] focus:ring-[#F5A028]",
    outline:
      "border border-[#F5A028] text-[#F5A028] hover:bg-[#FFF1DC] focus:ring-[#F5A028]",
    ghost:
      "text-[#F5A028] hover:bg-[#FFF1DC] focus:ring-[#F5A028]",
  },

  danger: {
    solid: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    outline: "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-600",
    ghost: "text-red-600 hover:bg-red-50 focus:ring-red-600",
  },

  highlight: {
    solid:
      "bg-[#FFF1DC] text-[#2C2C2C] hover:bg-[#FFB347] focus:ring-[#FFB347]",
    outline:
      "border border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#FFF1DC] focus:ring-[#2C2C2C]",
    ghost:
      "text-[#2C2C2C] hover:bg-[#FFF1DC] focus:ring-[#2C2C2C]",
  },

  success: {
    solid:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-600",
    ghost:
      "text-green-600 hover:bg-green-50 focus:ring-green-600",
  },
};

const Button = ({
  children,
  intent = "primary",
  variant = "solid",
  size = "md",
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx(
        baseStyle,
        sizeStyle[size],
        intentStyle[intent][variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;