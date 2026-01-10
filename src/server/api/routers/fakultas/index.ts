import { createTRPCRouter } from "@/server/api/trpc";
import { fakultasDosenRouter } from "./dosen";
import { fakultasMahasiswaRouter } from "./mahasiswa";

export const fakultasRouter = createTRPCRouter({
	mahasiswa: fakultasMahasiswaRouter,
	dosen: fakultasDosenRouter,
});
