import { createTRPCRouter } from "@/server/api/trpc";
import { mahasiswaDosenProcedure } from "./dosen";
import { mahasiswaProtectedRouter } from "./mahasiswa";

export const mahasiswaRouter = createTRPCRouter({
	dosen: mahasiswaDosenProcedure,
	protected: mahasiswaProtectedRouter,
});
