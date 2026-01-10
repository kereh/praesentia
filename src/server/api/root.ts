import { fakultasRouter } from "@/server/api/routers/fakultas";
import { jurusanRouter } from "@/server/api/routers/jurusan";
import { mahasiswaRouter } from "@/server/api/routers/mahasiswa";
import { mataKuliahRouter } from "@/server/api/routers/matakuliah";
import { semesterRouter } from "@/server/api/routers/semester";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { kelasRouter } from "./routers/kelas";

export const appRouter = createTRPCRouter({
	fakultas: fakultasRouter,
	jurusan: jurusanRouter,
	mahasiswa: mahasiswaRouter,
	kelas: kelasRouter,
	semester: semesterRouter,
	mataKuliah: mataKuliahRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
