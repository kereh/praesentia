import { headers } from "next/headers";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/better-auth";
import Setup from "./_components/setup";

export default async function page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (
		!session?.profile.mahasiswa?.fakultas_id &&
		!session?.profile?.mahasiswa?.jurusan_id
	)
		return <Setup />;

	return (
		<div>
			<h1>
				Login as {session?.user.name} - {session?.profile?.mahasiswa?.nim} -{" "}
				{session?.role}
			</h1>
			<pre className="text-sm">{JSON.stringify(session, null, 4)}</pre>
			<br />
			<Button onClick={logout}>Signout</Button>
		</div>
	);
}
