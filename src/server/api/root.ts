import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { fakultasRouter } from "./routers/fakultas";
import { jurusanRouter } from "./routers/jurusan";
import { kelasRouter } from "./routers/kelas";
import { mahasiswaRouter } from "./routers/mahasiswa";
import { mataKuliahRouter } from "./routers/matakuliah";
import { semesterRouter } from "./routers/semester";

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
