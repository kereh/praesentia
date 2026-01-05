import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

export const getUserSession = async (id: string) => {
	const userData = await db.query.user.findFirst({
		where: eq(user.id, id),
		columns: { role: true },
		with: {
			adminProfile: true,
			pegawaiProfile: true,
			dosenProfile: true,
			mahasiswaProfile: true,
		},
	});

	if (!userData?.role) return { role: null, profile: null };

	const profileMap = {
		admin: userData.adminProfile,
		pegawai: userData.pegawaiProfile,
		dosen: userData.dosenProfile,
		mahasiswa: userData.mahasiswaProfile,
	} as const;

	return {
		role: userData.role,
		profile: profileMap[userData.role] ?? null,
	};
};
