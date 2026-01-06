import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/server/better-auth";

export async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({ headers: request.headers });

	const roles: Record<string, string> = {
		admin: "/admin",
		pegawai: "/pegawai",
		dosen: "/dosen",
		mahasiswa: "/mahasiswa",
	};

	const paths = Object.values(roles);

	const { pathname } = request.nextUrl;

	const isProtected = paths.some((path) => path === pathname);

	if (!session && isProtected)
		return NextResponse.redirect(new URL("/login", request.url));

	if (session) {
		const role = session.role;
		const roleBasedPath = roles[role as keyof typeof roles] ?? "";

		if (pathname.includes("/login") || pathname.includes("/register"))
			return NextResponse.redirect(new URL(`${roleBasedPath}`, request.url));

		if (isProtected && !pathname.startsWith(roleBasedPath))
			return NextResponse.redirect(new URL(`${roleBasedPath}`, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/:path*",
		"/admin/:path*",
		"/pegawai/:path*",
		"/dosen/:path*",
		"/mahasiswa/:path*",
	],
};
