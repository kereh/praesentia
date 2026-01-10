"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Text } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { api, type RouterOutputs } from "@/trpc/react";

type Data = RouterOutputs["kelas"]["dosen"]["list"][number];

export function KelasTable() {
	const { data: kelas } = api.kelas.dosen.list.useQuery();

	const columns = React.useMemo<ColumnDef<Data>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						aria-label="Select all"
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						aria-label="Select row"
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
					/>
				),
				size: 32,
				enableSorting: false,
				enableHiding: false,
			},
			{
				id: "nama",
				accessorKey: "nama",
				header: ({ column }: { column: Column<Data, unknown> }) => (
					<DataTableColumnHeader column={column} label="Nama Kelas" />
				),
				cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
				meta: {
					label: "Nama",
					placeholder: "Cari nama kelas...",
					variant: "text",
					icon: Text,
				},
				enableColumnFilter: true,
			},
			{
				id: "mata_kuliah",
				accessorKey: "mata_kuliah",
				header: ({ column }: { column: Column<Data, unknown> }) => (
					<DataTableColumnHeader column={column} label="Mata Kuliah" />
				),
				cell: ({ row }) => <div>{row.original.mata_kuliah?.nama}</div>,
				enableColumnFilter: true,
			},
			{
				id: "kode",
				accessorKey: "kode",
				header: ({ column }: { column: Column<Data, unknown> }) => (
					<DataTableColumnHeader column={column} label="Kode Kelas" />
				),
				cell: ({ cell }) => (
					<code className="rounded bg-muted px-2 py-1 font-mono text-sm">
						{cell.getValue<string>()}
					</code>
				),
				enableColumnFilter: true,
			},
			{
				id: "actions",
				cell: function Cell({ row }) {
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="ghost">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link href={`/dosen/kelas/${row.original.id}`}>Detail</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href={`/dosen/kelas/${row.original.id}/edit`}>
										Edit
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				size: 32,
			},
		],
		[],
	);

	const { table } = useDataTable({
		data: kelas ?? [],
		columns,
		pageCount: 1,
		initialState: {
			sorting: [{ id: "nama", desc: false }],
			columnPinning: { right: ["actions"] },
		},
		getRowId: (row) => row.id,
	});

	return (
		<div className="data-table-container">
			<Link href="/dosen/kelas/add">
				<Button className="mb-10">Buat Kelas</Button>
			</Link>
			<DataTable table={table}>
				<DataTableToolbar table={table} />
			</DataTable>
		</div>
	);
}
