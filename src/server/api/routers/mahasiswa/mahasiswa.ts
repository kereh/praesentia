import { eq } from "drizzle-orm";
import { setupSchema } from "@/schemas/schema-setup";
import { createTRPCRouter, mahasiswaProcedure } from "@/server/api/trpc";
import { mahasiswa } from "@/server/db/schema";

export const mahasiswaProtectedRouter = createTRPCRouter({
	setup: mahasiswaProcedure
		.input(setupSchema)
		.mutation(async ({ ctx, input }) => {
			const { mahasiswa_id, ...data } = input;

			return await ctx.db
				.update(mahasiswa)
				.set(data)
				.where(eq(mahasiswa.user_id, mahasiswa_id))
				.returning();
		}),
});
