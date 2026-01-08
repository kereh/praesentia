import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

export const getUserSession = async (id: string) => {
	const userData = await db.query.user.findFirst({
		where: eq(user.id, id),
		columns: { role: true },
		with: {
			admin: true,
			pegawai: {
				with: {
					fakultas: { columns: { nama: true } },
				},
			},
			dosen: {
				with: {
					fakultas: { columns: { nama: true } },
				},
			},
			mahasiswa: {
				with: {
					fakultas: { columns: { nama: true } },
					jurusan: { columns: { nama: true } },
				},
			},
		},
	});

	if (!userData?.role)
		return {
			role: null,
			admin: null,
			pegawai: null,
			dosen: null,
			mahasiswa: null,
		};

	return {
		role: userData.role,
		admin: userData.admin,
		pegawai: userData.pegawai,
		dosen: userData.dosen,
		mahasiswa: userData.mahasiswa,
	};
};
