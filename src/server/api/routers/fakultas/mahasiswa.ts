import { createTRPCRouter, mahasiswaProcedure } from "@/server/api/trpc";

export const fakultasMahasiswaRouter = createTRPCRouter({
	list: mahasiswaProcedure.query(
		async ({ ctx }) =>
			await ctx.db.query.fakultas.findMany({
				with: {
					jurusan: {
						columns: {
							id: true,
							nama: true,
						},
					},
				},
				columns: {
					id: true,
					nama: true,
				},
			}),
	),
});
