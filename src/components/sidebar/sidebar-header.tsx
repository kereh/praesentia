"use client";

import { SidebarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import { navConfig } from "@/components/navigations/navigation.data";
import type { NavItem, Role } from "@/components/navigations/navigation.types";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

function buildTitleMap(
	config: Record<Role, NavItem[]>,
): Record<string, string> {
	const map: Record<string, string> = {};
	for (const items of Object.values(config)) {
		for (const item of items) {
			map[item.url] = item.title;
			for (const sub of item.items ?? []) {
				map[sub.url] = sub.title;
			}
		}
	}
	return map;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SiteHeader() {
	const { toggleSidebar } = useSidebar();
	const pathname = usePathname();

	const breadcrumbs = useMemo(() => {
		const titleMap = buildTitleMap(navConfig);
		const segments = pathname.split("/").filter(Boolean);
		return segments.map((segment, index) => {
			const href = `/${segments.slice(0, index + 1).join("/")}`;
			const title = titleMap[href] ?? capitalize(segment);
			return { href, title };
		});
	}, [pathname]);

	return (
		<header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
			<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
				<Button
					className="h-8 w-8"
					onClick={toggleSidebar}
					size="icon"
					variant="ghost"
				>
					<SidebarIcon />
				</Button>
				<Separator className="mr-2 h-4" orientation="vertical" />
				<Breadcrumb className="hidden sm:block">
					<BreadcrumbList>
						{breadcrumbs.map((crumb, index) => {
							const isLast = index === breadcrumbs.length - 1;
							return (
								<Fragment key={crumb.href}>
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>{crumb.title}</BreadcrumbPage>
										) : (
											<BreadcrumbLink href={crumb.href}>
												{crumb.title}
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
