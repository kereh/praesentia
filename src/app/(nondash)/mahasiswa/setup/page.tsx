import { headers } from "next/headers";
import { auth } from "@/server/better-auth";
import { Setup } from "./_components/setup";

export default async function page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return <Setup id={session?.user.id} />;
}
