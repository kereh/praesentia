import { createTRPCRouter } from "@/server/api/trpc";
import { setupRouter } from "./setup";

export const mahasiswaRouter = createTRPCRouter({
	...setupRouter._def.procedures,
});
