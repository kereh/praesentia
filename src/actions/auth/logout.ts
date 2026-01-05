"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";

export const logout = async () => {
	const res = await auth.api.signOut({
		headers: await headers(),
	});

	if (res.success) {
		revalidatePath("/", "layout");
		redirect("/login?logout=success");
	}
};
