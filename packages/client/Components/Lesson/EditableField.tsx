import Button from "@/Components/Layouts/Button";
import React, { useState } from "react";

type Props = {
    title: string;
    view: React.ReactNode;
    children: React.ReactNode;
}
const EditableField = ({ title, view, children }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="mt-4 bg-[#FFF1DC] border
                border-[#FFB347]/40
                rounded-lg
                p-4 mb-4"
            >
            <div className="font-medium flex items-center justify-between">
                <h3 className="text-[#2C2C2C] font-semibold">
                    {title}
                </h3>
                <Button 
                    type="button" 
                    variant="ghost" onClick={() => setIsEditing(!isEditing)}
                    className="text-[#F5A028]
                    text-sm
                    font-medium
                    hover:text-[#FFB347]
                    transition"
                    >
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </div>

             {isEditing ? children : view}
        </div>
    )
}

export default EditableField