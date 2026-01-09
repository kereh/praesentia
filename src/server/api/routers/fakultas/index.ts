import { fakultasBaseRouters } from "@/server/api/routers/fakultas/fakultas-base";
import { createTRPCRouter } from "@/server/api/trpc";

export const fakultasRouter = createTRPCRouter({
	...fakultasBaseRouters._def.procedures,
});
