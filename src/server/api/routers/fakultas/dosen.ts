import { createTRPCRouter, dosenProcedure } from "@/server/api/trpc";

export const fakultasDosenRouter = createTRPCRouter({
	list: dosenProcedure.query(
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
