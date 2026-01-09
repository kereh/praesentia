import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import type { NavItem, UserData } from "./navigation.types";

export const navItems: NavItem[] = [
	{
		title: "Playground",
		url: "#",
		icon: SquareTerminal,
	},
	{
		title: "Models",
		url: "#",
		icon: Bot,
	},
	{
		title: "Documentation",
		url: "#",
		icon: BookOpen,
	},
	{
		title: "Kelas",
		url: "#",
		icon: BookOpen,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings2,
	},
];

export const userData: UserData = {
	name: "shadcn",
	email: "m@example.com",
	avatar: "",
};
