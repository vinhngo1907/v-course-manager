import React from "react";

const Field = ({ children }: { children: React.ReactNode }) => (
    <div className='my-2 flex flex-col text-[#FFB347]'>
        {children}
    </div>
)

export default Field;