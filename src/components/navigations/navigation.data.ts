import type { NavConfig, Role, UserData } from "./navigation.types";

export const navConfig: NavConfig = {
	admin: [
		{ title: "Dashboard", url: "/admin", icon: "LayoutDashboard" },
		{ title: "Users", url: "/admin/users", icon: "Users" },
		{ title: "Fakultas", url: "/admin/fakultas", icon: "Building2" },
		{ title: "Jurusan", url: "/admin/jurusan", icon: "GraduationCap" },
		{ title: "Settings", url: "/admin/settings", icon: "Settings2" },
	],
	pegawai: [
		{ title: "Dashboard", url: "/pegawai", icon: "LayoutDashboard" },
		{ title: "Absensi", url: "/pegawai/absensi", icon: "ClipboardList" },
		{ title: "Jadwal", url: "/pegawai/jadwal", icon: "Calendar" },
		{ title: "Settings", url: "/pegawai/settings", icon: "Settings2" },
	],
	dosen: [
		{ title: "Dashboard", url: "/dosen", icon: "LayoutDashboard" },
		{ title: "Kelas", url: "/dosen/kelas", icon: "BookOpen" },
		{ title: "Absensi", url: "/dosen/absensi", icon: "ClipboardList" },
		{ title: "Jadwal", url: "/dosen/jadwal", icon: "Calendar" },
		{ title: "Settings", url: "/dosen/settings", icon: "Settings2" },
	],
	mahasiswa: [
		{ title: "Dashboard", url: "/mahasiswa", icon: "LayoutDashboard" },
		{ title: "Kelas", url: "/mahasiswa/kelas", icon: "BookOpen" },
		{ title: "Absensi", url: "/mahasiswa/absensi", icon: "ClipboardList" },
		{ title: "Jadwal", url: "/mahasiswa/jadwal", icon: "Calendar" },
		{ title: "Settings", url: "/mahasiswa/settings", icon: "Settings2" },
	],
};

export function getNavItemsByRole(role: Role | null) {
	if (!role) return [];
	return navConfig[role] ?? [];
}

export const userData: UserData = {
	name: "shadcn",
	email: "m@example.com",
	avatar: "",
};
