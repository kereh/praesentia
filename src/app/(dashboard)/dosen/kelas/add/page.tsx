import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/server/better-auth";
import { KelasAddForm } from "../_components/form/kelas-add-form";

export default async function page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.profile.dosen) {
		redirect("/dosen");
	}

	return (
		<div>
			<div className="mb-10 flex flex-col">
				<h1 className="font-semibold text-xl lg:text-2xl">Tambah Kelas</h1>
				<p className="text-muted-foreground">
					Isi form di bawah untuk membuat kelas baru.
				</p>
			</div>
			<KelasAddForm dosenId={session.profile.dosen.id} />
		</div>
	);
}
