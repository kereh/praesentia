import { createTRPCRouter } from "@/server/api/trpc";
import { jurusanBaseRouters } from "./jurusan-base";

export const jurusanRouter = createTRPCRouter({
	...jurusanBaseRouters._def.procedures,
});
