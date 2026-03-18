"use client";

import * as React from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function CourseTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="space-y-4 text-white">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <input
                    placeholder="Filter courses..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(e.target.value)
                    }
                    // className="w-full max-w-sm rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    className=" w-full max-w-sm
                            rounded-md
                            border border-[#3a3a3a]
                            bg-[#484848]
                            px-3 py-2
                            text-sm text-white
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:ring-2 focus:ring-[#ffb347]"/>

                <Link href="/admin/courses">
                    {/* <button className="ml-4 inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"> */}
                    <button className=" ml-4 inline-flex items-center
        rounded-md
        bg-[#ffb347]
        px-4 py-2
        text-sm font-medium
        text-black
        hover:opacity-90">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New course
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-[#3a3a3a] bg-[#2C2C2C]">
                <table className="w-full border-collapse">
                    <thead className="bg-[#2C2C2C]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="hover:bg-[#3a3a3a] transition-colors">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        // className="border-b px-4 py-3 text-left text-sm font-medium text-gray-600"
                                        className="border-b border-[#3a3a3a] px-4 py-3 text-left text-sm font-medium text-[#ffb347]"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => {
                                // console.log({row: row.original})
                                return (
                                    <tr
                                        key={row.id}
                                        className="transition-colors hover:bg-[#3a3a3a] data-[state=selected]:bg-[#404040]
"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="border-b px-4 py-3 text-sm"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-10 text-center text-sm text-gray-400"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="rounded-md border border-[#3a3a3a] bg-[#2C2C2C] px-3 py-1.5 text-sm text-white    hover:bg-[#3a3a3a]    disabled:opacity-40"
                >
                    Previous
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="rounded-md
                            border border-[#3a3a3a]
                            bg-[#2C2C2C]
                            px-3 py-1.5
                            text-sm text-white
                            hover:bg-[#3a3a3a]
                            disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
