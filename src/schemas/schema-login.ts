import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Harap masukan email yang valid."),
	password: z.string().min(4, "Password minimal 8 karakter."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
