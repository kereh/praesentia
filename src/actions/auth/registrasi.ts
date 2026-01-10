"use server";

import type { RegistrasiSchema } from "@/schemas/schema-registrasi";
import { auth } from "@/server/better-auth";
import { db } from "@/server/db";
import { mahasiswa } from "@/server/db/schema";

type RegistrasiResult = { success: true } | { success: false; error: string };

const REGISTRASI_ERROR = "Registrasi Gagal";

export async function registrasi(
	data: RegistrasiSchema,
): Promise<RegistrasiResult> {
	const { name, email, password, nim } = data;

	try {
		const result = await auth.api.signUpEmail({
			body: { name, email, password },
		});

		if (!result) return { success: false, error: REGISTRASI_ERROR };

		const { id } = result.user;

		const profile = await db.insert(mahasiswa).values({
			user_id: id,
			nim,
			fakultas_id: null,
			jurusan_id: null,
		});

		if (!profile) return { success: false, error: REGISTRASI_ERROR };

		return { success: true };
	} catch {
		return { success: false, error: REGISTRASI_ERROR };
	}
}
