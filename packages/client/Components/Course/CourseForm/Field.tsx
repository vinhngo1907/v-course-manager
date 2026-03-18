import React from "react";

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 my-3">
    {children}
  </div>
);

export default Field;