"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Heading = ({ children, as = "h1", className = "" }: Props) => {
  const base = "text-textMain font-montserrat";

  switch (as) {
    case "h1":
      return (
        <h1 className={`text-[50px] font-bold leading-tight ${base} ${className}`}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`text-[42px] font-bold ${base} ${className}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={`text-[32px] font-bold ${base} ${className}`}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={`text-[25px] font-medium ${base} ${className}`}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={`text-[18px] ${base} ${className}`}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={`text-[16px] ${base} ${className}`}>
          {children}
        </h6>
      );
  }
};

export default Heading;