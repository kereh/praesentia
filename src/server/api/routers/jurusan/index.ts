import { createTRPCRouter } from "@/server/api/trpc";
import { jurusanMahasiswaRouter } from "./mahasiswa";

export const jurusanRouter = createTRPCRouter({
	mahasiswa: jurusanMahasiswaRouter,
});
