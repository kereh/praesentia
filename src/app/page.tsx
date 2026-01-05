"use client";

import { ArrowRightIcon, ListChecksIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/better-auth/client";

export default function page() {
	const { data, isPending } = auth.useSession();

	return (
		<main className="relative min-h-screen overflow-hidden bg-background">
			<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
						<ListChecksIcon className="h-8 w-8 text-primary-foreground" />
					</div>
				</div>

				<h1 className="mb-4 bg-linear-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-center font-bold text-5xl text-transparent tracking-tight md:text-7xl">
					Praesentia
				</h1>

				<p className="mb-10 max-w-md text-center text-lg text-muted-foreground md:text-xl">
					Modern attendance management system. Track, manage, and analyze
					presence data with ease and precision.
				</p>

				<Link href={`${!data ? "/login" : "/"}`}>
					<Button
						className="group relative h-auto gap-3 overflow-hidden rounded-md px-8 py-2 text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-primary/30 hover:shadow-xl"
						size="lg"
					>
						<span className="relative z-10">
							{isPending
								? "Loading..."
								: !data?.session
									? "Login"
									: "Dashboard"}
						</span>
						<ArrowRightIcon className="relative z-10 size-5 transition-transform duration-300 group-hover:translate-x-1" />
						<div className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</Button>
				</Link>

				<div className="mt-16 flex items-center gap-6 text-muted-foreground text-sm">
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
						<span>Always Online</span>
					</div>
					<div className="h-4 w-px bg-border" />
					<span>Fast & Reliable</span>
					<div className="h-4 w-px bg-border" />
					<span>Secure</span>
				</div>
			</div>

			<div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
		</main>
	);
}
