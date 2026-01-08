"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registrasi } from "@/actions/auth/registrasi";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	type RegistrasiSchema,
	registrasiSchema,
} from "@/schemas/schema-registrasi";

export function RegistrasiForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegistrasiSchema>({
		resolver: zodResolver(registrasiSchema),
		defaultValues: {
			name: "",
			nim: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = useCallback(
		async (data: RegistrasiSchema) => {
			const registrasiPromise = registrasi(data).then((result) => {
				if (!result.success) throw new Error(result.error);

				return router.push("/login");
			});

			toast.promise(registrasiPromise, {
				loading: "Registrasi sedang diproses...",
				position: "top-center",
				success: "Registrasi berhasil!",
				duration: 2000,
				error: (err: Error) => err.message,
			});

			return registrasiPromise;
		},
		[router],
	);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Buat Akun Baru</CardTitle>
					<CardDescription>
						Daftar menggunakan email dan password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							{errors.root && <FieldError>{errors.root.message}</FieldError>}
							<Field data-invalid={!!errors.name}>
								<FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
								<Input
									id="name"
									placeholder=""
									type="text"
									{...register("name")}
									disabled={isSubmitting}
								/>
								<FieldError>{errors.name?.message}</FieldError>
							</Field>
							<Field data-invalid={!!errors.nim}>
								<FieldLabel htmlFor="nim">Nomor Induk Mahasiswa</FieldLabel>
								<Input
									id="nim"
									placeholder="8 Digit NIM"
									type="text"
									{...register("nim")}
									disabled={isSubmitting}
								/>
								<FieldError>{errors.name?.message}</FieldError>
							</Field>
							<Field data-invalid={!!errors.email}>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									placeholder="mybini@example.com"
									type="email"
									{...register("email")}
									disabled={isSubmitting}
								/>
								<FieldError>{errors.email?.message}</FieldError>
							</Field>
							<Field data-invalid={!!errors.password}>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									type="password"
									{...register("password")}
									disabled={isSubmitting}
								/>
								<FieldError>{errors.password?.message}</FieldError>
							</Field>
							<Field data-invalid={!!errors.confirmPassword}>
								<FieldLabel htmlFor="confirmPassword">
									Konfirmasi Password
								</FieldLabel>
								<Input
									id="confirmPassword"
									type="password"
									{...register("confirmPassword")}
									disabled={isSubmitting}
								/>
								<FieldError>{errors.confirmPassword?.message}</FieldError>
							</Field>
							<Field>
								<Button disabled={isSubmitting} type="submit">
									{isSubmitting ? "Mendaftar..." : "Daftar"}
								</Button>
								<FieldDescription className="text-center">
									Sudah punya akun? <a href="/login">Login</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
				and <a href="/">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
