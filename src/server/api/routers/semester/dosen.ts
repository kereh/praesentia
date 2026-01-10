import { createTRPCRouter, dosenProcedure } from "@/server/api/trpc";

export const semesterDosenRouter = createTRPCRouter({
	list: dosenProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.semester.findMany();
	}),
});
