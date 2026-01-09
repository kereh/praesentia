import { headers } from "next/headers";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/better-auth";

export default async function page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<div>
			<h1>Login as {session?.user.name}</h1>
			<br />
			<Button onClick={logout}>Signout</Button>
		</div>
	);
}
