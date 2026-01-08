import { fakultasBase } from "@/server/api/routers/fakultas/base";
import { createTRPCRouter } from "@/server/api/trpc";

export const fakultasRouter = createTRPCRouter({
	...fakultasBase._def.procedures,
});
