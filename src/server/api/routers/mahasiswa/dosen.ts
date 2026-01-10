import { createTRPCRouter, dosenProcedure } from "@/server/api/trpc";

export const mahasiswaDosenProcedure = createTRPCRouter({
	list: dosenProcedure.query(
		async ({ ctx }) => await ctx.db.query.mahasiswaProfile.findMany(),
	),
});
