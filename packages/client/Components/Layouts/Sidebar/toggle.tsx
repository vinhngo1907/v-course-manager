// sidebar/toggle.tsx
"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import Button from "../Button";

export default function SidebarToggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar(state => state);

  if (collapsed) {
    return (
      <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
        <Button
          onClick={onExpand}
          className="h-9 w-9 p-0 rounded-full"
          size="sm"
          variant="outline"
        >
          <ArrowRightFromLine className="w-5 h-5 text-[#F5A028] stroke-current fill-transparent" /> 
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3 pl-6 mb-2 flex items-center w-full">
      <p className="font-semibold text-[#FFB347]">For you</p>

      <Button
        // className="h-10 w-10 ml-auto rounded-full flex items-center justify-center"
        className="ml-auto h-10 w-10"
        onClick={onCollapse}
        intent="secondary"
        variant="outline"
        size="sm"
      >
        <ArrowLeftFromLine className="w-100 h-5 text-[#F5A028]" />
      </Button>
    </div>
  );
}
