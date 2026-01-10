import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import {
	adminProfile,
	dosenProfile,
	fakultas,
	jurusan,
	mataKuliah,
	pegawaiProfile,
	semester,
	user,
} from "@/server/db/schema";

const seedData = {
	fakultas: [
		{ id: crypto.randomUUID(), nama: "Fakultas Sains & Teknologi" },
		{
			id: crypto.randomUUID(),
			nama: "Fakultas Management Bisnis & Komunikasi",
		},
		{ id: crypto.randomUUID(), nama: "Fakultas Keperawatan" },
	],
	jurusan: [
		{ nama: "Teknik Informatika", fakultasNama: "Fakultas Sains & Teknologi" },
		{ nama: "Teknik Sipil", fakultasNama: "Fakultas Sains & Teknologi" },
		{
			nama: "Manajemen",
			fakultasNama: "Fakultas Management Bisnis & Komunikasi",
		},
		{
			nama: "Akuntansi",
			fakultasNama: "Fakultas Management Bisnis & Komunikasi",
		},
		{ nama: "Ilmu Kesehatan", fakultasNama: "Fakultas Keperawatan" },
	],
	users: {
		admin: {
			name: "Admin User",
			email: "admin@praesentia.com",
			password: "admin123",
		},
		pegawai: {
			name: "Pegawai User",
			email: "pegawai@praesentia.com",
			password: "pegawai123",
			fakultasNama: "Fakultas Sains & Teknologi",
		},
		dosen: [
			{
				name: "Dosen Saintek",
				email: "dosensaintek@praesentia.com",
				password: "dosen123",
				nidn: "0123456781",
				fakultasNama: "Fakultas Sains & Teknologi",
			},
			{
				name: "Dosen FMBK",
				email: "dosenfmbk@praesentia.com",
				password: "dosen123",
				nidn: "0123456782",
				fakultasNama: "Fakultas Management Bisnis & Komunikasi",
			},
			{
				name: "Dosen Keperawatan",
				email: "dosenkeperawatan@praesentia.com",
				password: "dosen123",
				nidn: "0123456783",
				fakultasNama: "Fakultas Keperawatan",
			},
		],
	},
	semester: [
		{ id: crypto.randomUUID(), name: "Semester 1" },
		{ id: crypto.randomUUID(), name: "Semester 2" },
		{ id: crypto.randomUUID(), name: "Semester 3" },
		{ id: crypto.randomUUID(), name: "Semester 4" },
		{ id: crypto.randomUUID(), name: "Semester 5" },
		{ id: crypto.randomUUID(), name: "Semester 6" },
		{ id: crypto.randomUUID(), name: "Semester 7" },
		{ id: crypto.randomUUID(), name: "Semester 8" },
	],
	mataKuliah: [
		{ nama: "Pemrograman Dasar" },
		{ nama: "Algoritma dan Struktur Data" },
		{ nama: "Basis Data" },
		{ nama: "Pemrograman Web" },
		{ nama: "Jaringan Komputer" },
	],
};

const BASE_URL = "http://localhost:3000";

async function getOrCreateUser(
	email: string,
	password: string,
	data: { name: string; role: "admin" | "pegawai" | "dosen" },
) {
	const existing = await db.query.user.findFirst({
		where: eq(user.email, email),
	});
	if (existing) return existing;

	const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: data.name,
			email,
			password,
		}),
	});

	if (!res.ok) {
		const error = await res.text();
		throw new Error(`Failed to create user ${email}: ${error}`);
	}

	const created = await db.query.user.findFirst({
		where: eq(user.email, email),
	});

	if (created) {
		await db
			.update(user)
			.set({ role: data.role, emailVerified: true })
			.where(eq(user.id, created.id));
	}

	return created;
}

async function seed() {
	console.log("🌱 Starting seed...");

	console.log("📁 Seeding fakultas...");
	await db.insert(fakultas).values(seedData.fakultas).onConflictDoNothing();

	const allFakultas = await db.query.fakultas.findMany();
	const fakultasMap = new Map(allFakultas.map((f) => [f.nama, f.id]));

	console.log("📁 Seeding jurusan...");
	const jurusanData = seedData.jurusan.map((j) => {
		const fakultasId = fakultasMap.get(j.fakultasNama);
		if (!fakultasId) throw new Error(`Fakultas ${j.fakultasNama} not found`);
		return {
			id: crypto.randomUUID(),
			nama: j.nama,
			fakultas_id: fakultasId,
		};
	});
	await db.insert(jurusan).values(jurusanData).onConflictDoNothing();

	console.log("👤 Seeding admin user...");
	const adminUser = await getOrCreateUser(
		seedData.users.admin.email,
		seedData.users.admin.password,
		{ name: seedData.users.admin.name, role: "admin" },
	);
	if (adminUser) {
		await db
			.insert(adminProfile)
			.values({ user_id: adminUser.id })
			.onConflictDoNothing();
	}

	console.log("👤 Seeding pegawai user...");
	const pegawaiFakultasId = fakultasMap.get(
		seedData.users.pegawai.fakultasNama,
	);
	if (!pegawaiFakultasId) throw new Error("Pegawai fakultas not found");

	const pegawaiUser = await getOrCreateUser(
		seedData.users.pegawai.email,
		seedData.users.pegawai.password,
		{ name: seedData.users.pegawai.name, role: "pegawai" },
	);
	if (pegawaiUser) {
		await db
			.insert(pegawaiProfile)
			.values({
				user_id: pegawaiUser.id,
				fakultas_id: pegawaiFakultasId,
			})
			.onConflictDoNothing();
	}

	console.log("👤 Seeding dosen users...");
	const dosenProfileIds: string[] = [];

	for (const dosenData of seedData.users.dosen) {
		const dosenFakultasId = fakultasMap.get(dosenData.fakultasNama);
		if (!dosenFakultasId) {
			console.warn(
				`Fakultas ${dosenData.fakultasNama} not found, skipping dosen ${dosenData.name}`,
			);
			continue;
		}

		const dosenUser = await getOrCreateUser(
			dosenData.email,
			dosenData.password,
			{ name: dosenData.name, role: "dosen" },
		);

		if (dosenUser) {
			const existingProfile = await db.query.dosenProfile.findFirst({
				where: eq(dosenProfile.user_id, dosenUser.id),
			});

			if (existingProfile) {
				dosenProfileIds.push(existingProfile.id);
			} else {
				const [inserted] = await db
					.insert(dosenProfile)
					.values({
						user_id: dosenUser.id,
						nidn: dosenData.nidn,
						fakultas_id: dosenFakultasId,
					})
					.returning();
				if (inserted) dosenProfileIds.push(inserted.id);
			}
		}
	}

	console.log("📅 Seeding semester...");
	await db.insert(semester).values(seedData.semester).onConflictDoNothing();

	console.log("📚 Seeding mata kuliah...");
	if (dosenProfileIds.length > 0) {
		const mataKuliahData = seedData.mataKuliah.map((m, index) => ({
			id: crypto.randomUUID(),
			nama: m.nama,
			dosen_id: dosenProfileIds[index % dosenProfileIds.length] as string,
		}));
		await db.insert(mataKuliah).values(mataKuliahData).onConflictDoNothing();
	}

	console.log("✅ Seed completed!");
	console.log("\n📋 Seeded credentials:");
	console.log(
		`   Admin:   ${seedData.users.admin.email} / ${seedData.users.admin.password}`,
	);
	console.log(
		`   Pegawai: ${seedData.users.pegawai.email} / ${seedData.users.pegawai.password}`,
	);
	console.log("   Dosen:");
	for (const d of seedData.users.dosen) {
		console.log(`      - ${d.email} / ${d.password}`);
	}

	process.exit(0);
}

seed().catch((e) => {
	console.error("❌ Seed failed:", e);
	process.exit(1);
});
