import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

type Fakultas = { nama: string };
type Jurusan = { nama: string };

type AdminProfile = {
	id: string;
	user_id: string;
	createdAt: Date;
	updatedAt: Date;
} | null;

type ProfileWithFakultas = {
	id: string;
	user_id: string;
	fakultas_id: string;
	createdAt: Date;
	updatedAt: Date;
	fakultas: Fakultas | null;
} | null;

type MahasiswaProfileType = {
	id: string;
	user_id: string;
	nim: string;
	fakultas_id: string | null;
	jurusan_id: string | null;
	createdAt: Date;
	updatedAt: Date;
	fakultas: Fakultas | null;
	jurusan: Jurusan | null;
} | null;

type UserSession =
	| { role: null; profile: null }
	| { role: "admin"; profile: AdminProfile }
	| { role: "pegawai"; profile: ProfileWithFakultas }
	| { role: "dosen"; profile: ProfileWithFakultas }
	| { role: "mahasiswa"; profile: MahasiswaProfileType };

export const getUserSession = async (id: string): Promise<UserSession> => {
	const userData = await db.query.user.findFirst({
		where: eq(user.id, id),
		columns: { role: true },
		with: {
			adminProfile: true,
			pegawaiProfile: {
				with: {
					fakultas: { columns: { nama: true } },
				},
			},
			dosenProfile: {
				with: {
					fakultas: { columns: { nama: true } },
				},
			},
			mahasiswaProfile: {
				with: {
					fakultas: { columns: { nama: true } },
					jurusan: { columns: { nama: true } },
				},
			},
		},
	});

	if (!userData?.role) return { role: null, profile: null };

	switch (userData.role) {
		case "admin":
			return { role: "admin", profile: userData.adminProfile };
		case "pegawai":
			return { role: "pegawai", profile: userData.pegawaiProfile };
		case "dosen":
			return { role: "dosen", profile: userData.dosenProfile };
		case "mahasiswa":
			return { role: "mahasiswa", profile: userData.mahasiswaProfile };
		default:
			return { role: null, profile: null };
	}
};
