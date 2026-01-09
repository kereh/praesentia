import { z } from "zod";

export const kelasDosenAddSchema = z.object({
	nama: z.string(),
	kode: z.string(),
	dosen_id: z.string(),
	semester_id: z.string(),
	mata_kuliah_id: z.string(),
	fakultas_id: z.string(),
	jurusan_id: z.string(),
});
