import { createTRPCRouter, mahasiswaProcedure } from "@/server/api/trpc";

export const jurusanMahasiswaRouter = createTRPCRouter({
	list: mahasiswaProcedure.query(
		async ({ ctx }) => await ctx.db.query.jurusan.findMany(),
	),
});
