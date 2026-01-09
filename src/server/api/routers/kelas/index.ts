import { createTRPCRouter } from "@/server/api/trpc";
import { kelasBaseRouters } from "./kelas-base";
import { kelasDosenRouters } from "./kelas-dosen";

export const kelasRouter = createTRPCRouter({
	...kelasBaseRouters._def.procedures,
	...kelasDosenRouters._def.procedures,
});
