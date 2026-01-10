import { eq } from "drizzle-orm";
import { createTRPCRouter, dosenProcedure } from "@/server/api/trpc";
import { mataKuliah } from "@/server/db/schema";

export const mataKuliahRouter = createTRPCRouter({
	list: dosenProcedure.query(async ({ ctx }) => {
		if (!ctx.session.profile.dosen) return [];
		return await ctx.db.query.mataKuliah.findMany({
			where: eq(mataKuliah.dosen_id, ctx.session.profile.dosen.id),
		});
	}),
});
