import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const fakultasBase = createTRPCRouter({
	list: publicProcedure.query(
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
