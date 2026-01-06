"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "@/actions/auth/login";
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
import { type LoginSchema, loginSchema } from "@/schemas/schema-login";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get("logout") === "success") {
			toast.success("Anda telah logout", {
				position: "top-center",
				duration: 3000,
			});
		}
	}, [searchParams]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = useCallback(
		async (data: LoginSchema) => {
			const loginPromise = login(data).then((result) => {
				if (!result.success) throw new Error(result.error);
				return router.refresh();
			});

			toast.promise(loginPromise, {
				loading: "Login sedang diproses...",
				position: "top-center",
				success: "Login berhasil!",
				duration: 2000,
				error: (err: Error) => err.message,
			});

			return loginPromise;
		},
		[router],
	);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Selamat Datang</CardTitle>
					<CardDescription>
						Login menggunakan email dan password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							{errors.root && <FieldError>{errors.root.message}</FieldError>}
							<Field data-invalid={!!errors.email}>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									placeholder="m@example.com"
									type="email"
									{...register("email")}
								/>
								<FieldError>{errors.email?.message}</FieldError>
							</Field>
							<Field data-invalid={!!errors.password}>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										className="ml-auto text-sm underline-offset-4 hover:underline"
										href="/"
									>
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									{...register("password")}
								/>
								<FieldError>{errors.password?.message}</FieldError>
							</Field>
							<Field>
								<Button disabled={isSubmitting} type="submit">
									{isSubmitting ? "Logging in..." : "Login"}
								</Button>
								<FieldDescription className="text-center">
									Buat akun baru di <Link href="/registrasi">sini</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our{" "}
				<Link href="/">Terms of Service</Link> and{" "}
				<Link href="/">Privacy Policy</Link>.
			</FieldDescription>
		</div>
	);
}
