export type NavSubItem = {
	title: string;
	url: string;
};

export type NavItem = {
	title: string;
	url: string;
	icon: string;
	isActive?: boolean;
	items?: NavSubItem[];
};

export type Role = "admin" | "pegawai" | "dosen" | "mahasiswa";

export type NavConfig = Record<Role, NavItem[]>;

export type UserData = {
	name: string;
	email: string;
	avatar: string;
};
