import { ListChecksIcon } from "lucide-react";
import Link from "next/link";

export function Logo() {
	return (
		<Link
			className="flex items-center gap-2 self-center font-medium text-lg"
			href="/"
		>
			<div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 shadow-md shadow-primary/25">
				<ListChecksIcon className="size-4 text-primary-foreground" />
			</div>
			Praesentia
		</Link>
	);
}
