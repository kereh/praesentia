/** biome-ignore-all lint/suspicious/noArrayIndexKey: index as key */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { kelasDosenAddSchema } from "@/schemas/schema-kelas";
import { api } from "@/trpc/react";

function generateKode(): string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < 6; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

type FormSchema = z.infer<typeof kelasDosenAddSchema>;

function FormSkeleton() {
	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<Skeleton className="h-6 w-48" />
			</CardHeader>
			<CardContent className="space-y-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div className="space-y-2" key={`skeleton-${i}`}>
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-9 w-full" />
					</div>
				))}
				<Skeleton className="h-9 w-full" />
			</CardContent>
		</Card>
	);
}

export function KelasAddForm({ dosenId }: { dosenId: string }) {
	const router = useRouter();

	const { data: fakultas, isPending: fakultasPending } =
		api.fakultas.dosen.list.useQuery();

	const { data: semester, isPending: semesterPending } =
		api.semester.dosen.list.useQuery();

	const { data: mataKuliah, isPending: mataKuliahPending } =
		api.mataKuliah.dosen.list.useQuery();

	const form = useForm<FormSchema>({
		resolver: zodResolver(kelasDosenAddSchema),
		defaultValues: {
			nama: "",
			kode: generateKode(),
			dosen_id: dosenId,
			semester_id: "",
			mata_kuliah_id: "",
			fakultas_id: "",
			jurusan_id: "",
		},
	});

	const watchFakultasId = form.watch("fakultas_id");

	const { mutate: createKelas, isPending: createPending } =
		api.kelas.dosen.create.useMutation({
			onSuccess: () => {
				toast.success("Kelas berhasil dibuat!");
				router.push("/dosen/kelas");
				router.refresh();
			},
			onError: ({ message }) => {
				toast.error(message);
			},
		});

	if (fakultasPending || semesterPending || mataKuliahPending) {
		return <FormSkeleton />;
	}

	const fakultasOptions =
		fakultas?.map((f) => ({
			value: f.id,
			label: f.nama,
		})) ?? [];

	const selectedFakultasData = fakultas?.find((f) => f.id === watchFakultasId);

	const jurusanOptions =
		selectedFakultasData?.jurusan.map((j) => ({
			value: j.id,
			label: j.nama,
		})) ?? [];

	const semesterOptions =
		semester?.map((s) => ({
			value: s.id,
			label: s.name ?? "",
		})) ?? [];

	const mataKuliahOptions =
		mataKuliah?.map((m) => ({
			value: m.id,
			label: m.nama ?? "",
		})) ?? [];

	const handleFakultasChange = (value: string) => {
		form.setValue("fakultas_id", value);
		form.setValue("jurusan_id", "");
	};

	const onSubmit = (data: FormSchema) => {
		createKelas(data);
	};

	const isFormValid =
		form.watch("nama") &&
		form.watch("kode") &&
		form.watch("semester_id") &&
		form.watch("mata_kuliah_id") &&
		form.watch("fakultas_id") &&
		form.watch("jurusan_id");

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Tambah Kelas Baru</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<FieldLabel htmlFor="nama">Nama Kelas</FieldLabel>
						<Input
							disabled={createPending}
							id="nama"
							placeholder="Masukkan nama kelas..."
							{...form.register("nama")}
						/>
						{form.formState.errors.nama && (
							<FieldError>{form.formState.errors.nama.message}</FieldError>
						)}
					</FieldGroup>

					<FieldGroup>
						<FieldLabel htmlFor="kode">Kode Kelas</FieldLabel>
						<div className="flex gap-2">
							<Input
								className="font-mono"
								id="kode"
								readOnly
								value={form.watch("kode")}
							/>
							<Button
								disabled={createPending}
								onClick={() => form.setValue("kode", generateKode())}
								type="button"
								variant="outline"
							>
								Generate
							</Button>
						</div>
						{form.formState.errors.kode && (
							<FieldError>{form.formState.errors.kode.message}</FieldError>
						)}
					</FieldGroup>

					<FieldGroup>
						<FieldLabel>Semester</FieldLabel>
						<Combobox
							disabled={createPending}
							emptyText="Semester tidak ditemukan."
							onChange={(value) => form.setValue("semester_id", value)}
							options={semesterOptions}
							placeholder="Pilih semester..."
							searchPlaceholder="Cari semester..."
							value={form.watch("semester_id")}
						/>
						{form.formState.errors.semester_id && (
							<FieldError>
								{form.formState.errors.semester_id.message}
							</FieldError>
						)}
					</FieldGroup>

					<FieldGroup>
						<FieldLabel>Mata Kuliah</FieldLabel>
						<Combobox
							disabled={createPending}
							emptyText="Mata kuliah tidak ditemukan."
							onChange={(value) => form.setValue("mata_kuliah_id", value)}
							options={mataKuliahOptions}
							placeholder="Pilih mata kuliah..."
							searchPlaceholder="Cari mata kuliah..."
							value={form.watch("mata_kuliah_id")}
						/>
						{form.formState.errors.mata_kuliah_id && (
							<FieldError>
								{form.formState.errors.mata_kuliah_id.message}
							</FieldError>
						)}
					</FieldGroup>

					<FieldGroup>
						<FieldLabel>Fakultas</FieldLabel>
						<Combobox
							disabled={createPending}
							emptyText="Fakultas tidak ditemukan."
							onChange={handleFakultasChange}
							options={fakultasOptions}
							placeholder="Pilih fakultas..."
							searchPlaceholder="Cari fakultas..."
							value={watchFakultasId}
						/>
						{form.formState.errors.fakultas_id && (
							<FieldError>
								{form.formState.errors.fakultas_id.message}
							</FieldError>
						)}
					</FieldGroup>

					<FieldGroup>
						<FieldLabel>Jurusan</FieldLabel>
						<Combobox
							disabled={!watchFakultasId || createPending}
							emptyText="Jurusan tidak ditemukan."
							onChange={(value) => form.setValue("jurusan_id", value)}
							options={jurusanOptions}
							placeholder="Pilih jurusan..."
							searchPlaceholder="Cari jurusan..."
							value={form.watch("jurusan_id")}
						/>
						{form.formState.errors.jurusan_id && (
							<FieldError>
								{form.formState.errors.jurusan_id.message}
							</FieldError>
						)}
					</FieldGroup>

					<Button
						className="w-full"
						disabled={!isFormValid || createPending}
						type="submit"
					>
						{createPending ? "Menyimpan..." : "Simpan Kelas"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
