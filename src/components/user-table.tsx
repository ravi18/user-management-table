"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  FilterFn,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface DataTableProps {
  data: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PaginatedResponse {
  users: User[];
  totalPages: number;
  totalItems: number;
}

const fuzzyFilter: FilterFn<User> = (row, columnId, value) => {
  const searchValue = value.toLowerCase();
  let cellValue = "";

  if (columnId === "company") {
    cellValue = row.getValue(columnId)?.toString().toLowerCase() || "";
  } else {
    cellValue = row.getValue(columnId)?.toString().toLowerCase() || "";
  }

  return cellValue.includes(searchValue);
};

export default function DataTable({
  data = [],
  currentPage,
  totalPages,
  onPageChange,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="p-0 hover:bg-transparent"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <Input
                placeholder="Filter names..."
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="p-0 hover:bg-transparent"
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <Input
                placeholder="Filter emails..."
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
          );
        },
      },
      {
        id: "company",
        accessorFn: (row) => row.company.name,
        header: ({ column }) => {
          return (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="p-0 hover:bg-transparent"
              >
                Company
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <Input
                placeholder="Filter companies..."
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-4xl space-y-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm mx-auto block"
        />

        <div className="rounded-md border shadow-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100 text-gray-700"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="transition-transform hover:scale-105"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
