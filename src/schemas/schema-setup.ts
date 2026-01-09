import { z } from "zod";

export const setupSchema = z.object({
	mahasiswa_id: z.string(),
	fakultas_id: z.string(),
	jurusan_id: z.string(),
});

export type SetupSchema = z.infer<typeof setupSchema>;
