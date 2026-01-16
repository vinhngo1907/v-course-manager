"use client";

import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/libs/utils";
// import { useCreatorSidebar } from "@/hooks/use-creator-sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

export function Container({ children }: { children: React.ReactNode }) {
  const { collapsed, onCollapse, onExpand } = useSidebar(
    (state) => state
  );
  const matches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    // if (matches) {
    //   onCollapse();
    // } else {
    //   onExpand();
    // }
    matches ? onCollapse() : onExpand()
  }, [matches]);

  return (
    // <div
    //   className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    // >
    //   {children}
    // </div>
    <>{children}</>
  );
}
