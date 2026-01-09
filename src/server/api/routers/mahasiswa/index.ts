import { createTRPCRouter } from "@/server/api/trpc";
import { mahasiswaBaseRouters } from "./mahasiswa-base";
import { mahasiswaSetupRouter } from "./mahasiswa-setup";

export const mahasiswaRouter = createTRPCRouter({
	...mahasiswaBaseRouters._def.procedures,
	...mahasiswaSetupRouter._def.procedures,
});
