"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon } from "@/components/navigations/icons";
import type { NavItem } from "@/components/navigations/navigation.types";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function SidebarNav({ items }: { items: NavItem[] }) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel className="text-muted-foreground/70 text-xs uppercase tracking-wider">
				Platform
			</SidebarGroupLabel>
			<SidebarMenu className="gap-0.5">
				{items.map((item) => {
					const hasSubItems = item.items && item.items.length > 0;
					const isActive = hasSubItems
						? pathname === item.url ||
							pathname.startsWith(`${item.url}/`) ||
							item.items?.some(
								(sub) =>
									pathname === sub.url || pathname.startsWith(`${sub.url}/`),
							)
						: pathname === item.url;
					const Icon = getIcon(item.icon);

					return (
						<Collapsible asChild defaultOpen={isActive} key={item.title}>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									className={cn(
										"relative",
										isActive && "bg-accent text-accent-foreground",
									)}
									tooltip={item.title}
								>
									<Link href={item.url}>
										{isActive && (
											<span className="absolute left-0 h-full w-0.5 rounded-full bg-primary" />
										)}
										<Icon className="size-4" />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className="data-[state=open]:rotate-90">
												<ChevronRight className="size-4" />
												<span className="sr-only">Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => {
													const isSubActive =
														pathname === subItem.url ||
														pathname.startsWith(`${subItem.url}/`);

													return (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton
																asChild
																isActive={isSubActive}
															>
																<Link href={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													);
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
