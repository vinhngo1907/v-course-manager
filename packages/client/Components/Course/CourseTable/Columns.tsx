"use client";

import Link from "next/link";
// import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Course } from "@/types";

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="flex items-center gap-2 text-sm font-medium hover:text-orange-600"
            >
                Title
                <ArrowUpDown className="h-4 w-4" />
            </button>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="flex items-center gap-2 text-sm font-medium hover:text-orange-600"
            >
                Price
                <ArrowUpDown className="h-4 w-4" />
            </button>
        ),
        cell: ({ row }) => {
            const price = Number(row.getValue("price") || 0);
            return (
                <span>
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(price)}
                </span>
            );
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="flex items-center gap-2 text-sm font-medium hover:text-orange-600"
            >
                Published
                <ArrowUpDown className="h-4 w-4" />
            </button>
        ),
        cell: ({ row }) => {
            const isPublished = Boolean(row.getValue("isPublished"));

            return (
                <span
                    className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${
                        isPublished ? "bg-sky-600" : "bg-slate-500"
                    }`}
                >
                    {isPublished ? "Published" : "Draft"}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return <ActionsMenu courseId={id} />;
        },
    },
];

/* ------------------------------------------------------------------ */
/* Actions dropdown (Tailwind only)                                    */
/* ------------------------------------------------------------------ */

export default function ActionsMenu({ courseId }: { courseId: string }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen(v => !v)}
                className="
                    rounded p-1
                    text-gray-300
                    hover:bg-[#3a3a3a]
                    hover:text-white
                    transition
                "
            >
                <MoreHorizontal className="h-4 w-4" />
            </button>

            {/* Menu */}
            {open && (
                <div
                    className="
                        absolute right-0 z-50 mt-2 w-36
                        rounded-md
                        bg-[#2C2C2C]
                        border border-[#3a3a3a]
                        shadow-lg
                    "
                >
                    <Link
                        href={`/admin/courses/${courseId}`}
                        className="
                            flex items-center gap-2
                            px-3 py-2
                            text-sm font-medium
                            text-[#ffb347]
                            hover:bg-[#3a3a3a]
                            hover:text-[#ffd18b]
                            transition-colors
                        "
                        onClick={() => setOpen(false)}
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Link>
                </div>
            )}
        </div>
    );
}