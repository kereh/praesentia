"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { type SetupSchema, setupSchema } from "@/schemas/schema-setup";
import { api } from "@/trpc/react";

interface SetupProps {
	id: string | undefined;
}

function SetupSkeleton() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<Skeleton className="h-6 w-48" />
					<Skeleton className="mt-2 h-4 w-64" />
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-9 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-9 w-full" />
					</div>
					<Skeleton className="h-9 w-full" />
				</CardContent>
			</Card>
		</div>
	);
}

export function Setup({ id }: SetupProps) {
	const { data: fakultas, isPending } = api.fakultas.list.useQuery();
	const { refresh } = useRouter();

	const form = useForm<SetupSchema>({
		resolver: zodResolver(setupSchema),
		defaultValues: {
			mahasiswa_id: id,
			fakultas_id: "",
			jurusan_id: "",
		},
	});

	const watchFakultasId = form.watch("fakultas_id");

	const { mutate: setupMutation, isPending: setupPending } =
		api.mahasiswa.setup.useMutation({
			onSuccess: () => {
				toast.success("Setup berhasil!");
				refresh();
			},
			onError: ({ data, message }) => {
				console.log(data?.zodError, message);
			},
			onMutate: () => form.reset(),
		});

	if (isPending) return <SetupSkeleton />;

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

	const handleFakultasChange = (value: string) => {
		form.setValue("fakultas_id", value);
		form.setValue("jurusan_id", "");
	};

	const onSubmit = (data: SetupSchema) => {
		setupMutation(data);
	};

	return (
		<div className="flex min-h-svh w-full flex-col items-center justify-center gap-10">
			<Logo />
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Setup Akun Mahasiswa</CardTitle>
					<CardDescription>
						Anda harus menyelesaikan setup akun mahasiswa.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<FieldLabel>Fakultas</FieldLabel>
							<Combobox
								disabled={setupPending}
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
								disabled={!watchFakultasId || setupPending}
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
							disabled={
								!watchFakultasId || !form.watch("jurusan_id") || setupPending
							}
							type="submit"
						>
							{setupPending ? "Mohon Tunggu..." : "Simpan"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
