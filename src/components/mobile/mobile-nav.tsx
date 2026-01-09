"use client";

import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon } from "@/components/navigations/icons";
import type { NavItem } from "@/components/navigations/navigation.types";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const VISIBLE_ITEMS = 3;

type MobileNavProps = {
	items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
	const pathname = usePathname();
	const visibleItems = items.slice(0, VISIBLE_ITEMS);
	const moreItems = items.slice(VISIBLE_ITEMS);

	return (
		<nav className="fixed inset-x-0 bottom-0 z-50 flex h-(--bottom-nav-height,4.5rem) items-stretch justify-around border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
			{visibleItems.map((item) => {
				const isActive =
					pathname === item.url || pathname.startsWith(`${item.url}/`);
				const Icon = getIcon(item.icon);

				return (
					<Link
						className={cn(
							"flex min-w-16 flex-1 flex-col items-center justify-center gap-0.5 active:bg-accent/50",
							isActive ? "text-primary" : "text-muted-foreground",
						)}
						href={item.url}
						key={item.title}
					>
						<span
							className={cn(
								"flex size-8 items-center justify-center rounded-lg",
								isActive && "bg-primary/10",
							)}
						>
							<Icon className="size-5" />
						</span>
						<span className="font-medium text-[0.625rem] leading-tight">
							{item.title}
						</span>
					</Link>
				);
			})}

			{moreItems.length > 0 && (
				<Sheet>
					<SheetTrigger asChild>
						<button
							className="flex min-w-16 flex-1 flex-col items-center justify-center gap-0.5 text-muted-foreground active:bg-accent/50"
							type="button"
						>
							<span className="flex size-8 items-center justify-center rounded-lg">
								<Ellipsis className="size-5" />
							</span>
							<span className="font-medium text-[0.625rem] leading-tight">
								More
							</span>
						</button>
					</SheetTrigger>
					<SheetContent
						className="pb-[env(safe-area-inset-bottom)]"
						side="bottom"
					>
						<SheetHeader>
							<SheetTitle>Menu Lainnya</SheetTitle>
						</SheetHeader>
						<div className="grid gap-2 px-4 pb-4">
							{moreItems.map((item) => {
								const isActive =
									pathname === item.url || pathname.startsWith(`${item.url}/`);
								const Icon = getIcon(item.icon);

								return (
									<Link
										className={cn(
											"flex items-center gap-3 rounded-lg px-3 py-2.5 active:bg-accent/50",
											isActive
												? "bg-primary/10 text-primary"
												: "text-foreground hover:bg-accent",
										)}
										href={item.url}
										key={item.title}
									>
										<Icon className="size-5" />
										<span className="font-medium">{item.title}</span>
									</Link>
								);
							})}
						</div>
					</SheetContent>
				</Sheet>
			)}
		</nav>
	);
}
