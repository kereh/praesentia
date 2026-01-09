"use client";

import {
	BookOpen,
	Building2,
	Calendar,
	ClipboardList,
	GraduationCap,
	LayoutDashboard,
	type LucideIcon,
	Settings2,
	Users,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
	BookOpen,
	Building2,
	Calendar,
	ClipboardList,
	GraduationCap,
	LayoutDashboard,
	Settings2,
	Users,
};

export function getIcon(name: string): LucideIcon {
	return iconMap[name] ?? LayoutDashboard;
}
