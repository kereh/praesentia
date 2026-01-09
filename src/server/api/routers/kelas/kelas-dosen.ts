import { eq } from "drizzle-orm";
import { kelasDosenAddSchema } from "@/schemas/schema-kelas";
import { createTRPCRouter, dosenProcedure } from "@/server/api/trpc";
import { kelas } from "@/server/db/schema";

export const kelasDosenRouters = createTRPCRouter({
	listForDosen: dosenProcedure.query(async ({ ctx }) => {
		if (!ctx.session.profile.dosen) return [];
		return await ctx.db.query.kelas.findMany({
			where: eq(kelas.dosen_id, ctx.session.profile.dosen.id),
		});
	}),

	createForDosen: dosenProcedure
		.input(kelasDosenAddSchema)
		.mutation(async ({ ctx, input }) => {
			const [newKelas] = await ctx.db
				.insert(kelas)
				.values({
					nama: input.nama,
					kode: input.kode,
					dosen_id: input.dosen_id,
					semester_id: input.semester_id,
					mata_kuliah_id: input.mata_kuliah_id,
					fakultas_id: input.fakultas_id,
					jurusan_id: input.jurusan_id,
				})
				.returning();
			return newKelas;
		}),
});
