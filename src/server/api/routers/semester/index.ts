import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const semesterRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.semester.findMany();
	}),
});
