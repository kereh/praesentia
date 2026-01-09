import { KelasTable } from "./_components/kelas-table";

export default function page() {
	return (
		<div>
			<div className="mb-10 flex flex-col">
				<h1 className="font-semibold text-xl lg:text-2xl">Kelas</h1>
				<p className="text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
					tempora.
				</p>
			</div>
			<KelasTable />
		</div>
	);
}
