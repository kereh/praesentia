import { createTRPCRouter } from "@/server/api/trpc";
import { kelasDosenRouter } from "./dosen";
import { kelasMahasiswaRouter } from "./mahasiswa";

export const kelasRouter = createTRPCRouter({
	dosen: kelasDosenRouter,
	protected: kelasMahasiswaRouter,
});
