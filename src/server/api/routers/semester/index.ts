import { createTRPCRouter } from "@/server/api/trpc";
import { semesterDosenRouter } from "./dosen";

export const semesterRouter = createTRPCRouter({
	dosen: semesterDosenRouter,
});
