"use server";

import { headers } from "next/headers";
import type { LoginSchema } from "@/schemas/schema-login";
import { auth } from "@/server/better-auth";

type LoginResult = { success: true } | { success: false; error: string };

const LOGIN_ERROR = "Login Gagal, email atau password salah";

export async function login(data: LoginSchema): Promise<LoginResult> {
	try {
		const result = await auth.api.signInEmail({
			body: data,
			headers: await headers(),
		});

		if (!result) return { success: false, error: LOGIN_ERROR };

		return { success: true };
	} catch {
		return { success: false, error: LOGIN_ERROR };
	}
}
