"use client";

import { Command } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import type {
	NavItem,
	Role,
	UserData,
} from "@/components/navigations/navigation.types";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { SidebarUser } from "@/components/sidebar/sidebar-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarMainProps = React.ComponentProps<typeof Sidebar> & {
	items: NavItem[];
	user: UserData;
	homeUrl?: string;
	role: Role;
};

export function SidebarMain({
	items,
	user,
	homeUrl = "/",
	role,
	...props
}: SidebarMainProps) {
	return (
		<Sidebar
			className="top-(--header-height) hidden h-[calc(100svh-var(--header-height))]! md:flex"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="lg">
							<Link href={homeUrl}>
								<div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Praesentia</span>
									<span className="truncate text-muted-foreground text-xs">
										Login Sebagai {role.toUpperCase()}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="px-2">
				<SidebarNav items={items} />
			</SidebarContent>
			<SidebarFooter className="border-sidebar-border/50 border-t">
				<SidebarUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
