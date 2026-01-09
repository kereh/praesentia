import type { LucideIcon } from "lucide-react";

export type NavSubItem = {
	title: string;
	url: string;
};

export type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	items?: NavSubItem[];
};

export type UserData = {
	name: string;
	email: string;
	avatar: string;
};
