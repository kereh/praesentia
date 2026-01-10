import { createTRPCRouter } from "@/server/api/trpc";
import { mataKuliahDosenRouter } from "./dosen";

export const mataKuliahRouter = createTRPCRouter({
	dosen: mataKuliahDosenRouter,
});
