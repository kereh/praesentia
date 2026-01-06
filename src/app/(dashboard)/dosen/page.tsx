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
			<h1>Login as {JSON.stringify(session)}</h1>
			<Button onClick={logout}>Signout</Button>
		</div>
	);
}
