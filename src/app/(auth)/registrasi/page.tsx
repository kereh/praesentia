import { RegistrasiForm } from "@/app/(auth)/registrasi/_components/registrasi-form";
import { Logo } from "@/components/logo";

export default function page() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Logo />
				<RegistrasiForm />
			</div>
		</div>
	);
}
