import { eq } from "drizzle-orm";
import { setupSchema } from "@/schemas/schema-setup";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { mahasiswaProfile } from "@/server/db/schema";

export const mahasiswaSetupRouter = createTRPCRouter({
	setup: protectedProcedure
		.input(setupSchema)
		.mutation(async ({ ctx, input }) => {
			const { mahasiswa_id, ...data } = input;

			return await ctx.db
				.update(mahasiswaProfile)
				.set(data)
				.where(eq(mahasiswaProfile.user_id, mahasiswa_id))
				.returning();
		}),
});
