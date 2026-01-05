import { z } from "zod";

export const registrasiSchema = z
	.object({
		name: z.string().min(2, "Nama harus diisi."),
		nim: z.string().length(8, "Nim hanya bisa berjumlah 8 digit"),
		email: z.string().email("Harap masukan email yang valid."),
		password: z.string().min(4, "Password minimal 8 karakter."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Konfirmasi password tidak sama",
		path: ["confirmPassword"],
	});

export type RegistrasiSchema = z.infer<typeof registrasiSchema>;
