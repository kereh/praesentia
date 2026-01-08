import { scryptAsync } from "@noble/hashes/scrypt";
import { bytesToHex, randomBytes } from "@noble/hashes/utils";
import { db } from "@/server/db";
import {
	account,
	adminProfile,
	dosenProfile,
	fakultas,
	jurusan,
	pegawaiProfile,
	user,
} from "@/server/db/schema";

const scryptConfig = {
	N: 16384,
	r: 16,
	p: 1,
	dkLen: 64,
};

async function hashPassword(password: string): Promise<string> {
	const salt = bytesToHex(randomBytes(16));
	const key = await scryptAsync(password.normalize("NFKC"), salt, {
		N: scryptConfig.N,
		r: scryptConfig.r,
		p: scryptConfig.p,
		dkLen: scryptConfig.dkLen,
		maxmem: 128 * scryptConfig.N * scryptConfig.r * 2,
	});
	return `${salt}:${bytesToHex(key)}`;
}

const seedData = {
	fakultas: [
		{ id: crypto.randomUUID(), nama: "Fakultas Teknik" },
		{ id: crypto.randomUUID(), nama: "Fakultas Ekonomi" },
		{ id: crypto.randomUUID(), nama: "Fakultas Hukum" },
	],
	jurusan: [
		{ nama: "Teknik Informatika", fakultasNama: "Fakultas Teknik" },
		{ nama: "Teknik Sipil", fakultasNama: "Fakultas Teknik" },
		{ nama: "Manajemen", fakultasNama: "Fakultas Ekonomi" },
		{ nama: "Akuntansi", fakultasNama: "Fakultas Ekonomi" },
		{ nama: "Ilmu Hukum", fakultasNama: "Fakultas Hukum" },
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
			fakultasNama: "Fakultas Teknik",
		},
		dosen: {
			name: "Dosen User",
			email: "dosen@praesentia.com",
			password: "dosen123",
			nidn: "0123456789",
			fakultasNama: "Fakultas Teknik",
		},
	},
};

async function seed() {
	console.log("🌱 Starting seed...");

	console.log("📁 Seeding fakultas...");
	await db.insert(fakultas).values(seedData.fakultas).onConflictDoNothing();

	const fakultasMap = new Map(seedData.fakultas.map((f) => [f.nama, f.id]));

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
	const adminId = crypto.randomUUID();
	const adminAccountId = crypto.randomUUID();
	const adminHashedPassword = await hashPassword(seedData.users.admin.password);

	await db
		.insert(user)
		.values({
			id: adminId,
			name: seedData.users.admin.name,
			email: seedData.users.admin.email,
			emailVerified: true,
			role: "admin",
		})
		.onConflictDoNothing();

	await db
		.insert(account)
		.values({
			id: adminAccountId,
			accountId: adminId,
			providerId: "credential",
			userId: adminId,
			password: adminHashedPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.onConflictDoNothing();

	await db
		.insert(adminProfile)
		.values({
			user_id: adminId,
		})
		.onConflictDoNothing();

	console.log("👤 Seeding pegawai user...");
	const pegawaiId = crypto.randomUUID();
	const pegawaiAccountId = crypto.randomUUID();
	const pegawaiHashedPassword = await hashPassword(
		seedData.users.pegawai.password,
	);
	const pegawaiFakultasId = fakultasMap.get(
		seedData.users.pegawai.fakultasNama,
	);
	if (!pegawaiFakultasId) throw new Error("Pegawai fakultas not found");

	await db
		.insert(user)
		.values({
			id: pegawaiId,
			name: seedData.users.pegawai.name,
			email: seedData.users.pegawai.email,
			emailVerified: true,
			role: "pegawai",
		})
		.onConflictDoNothing();

	await db
		.insert(account)
		.values({
			id: pegawaiAccountId,
			accountId: pegawaiId,
			providerId: "credential",
			userId: pegawaiId,
			password: pegawaiHashedPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.onConflictDoNothing();

	await db
		.insert(pegawaiProfile)
		.values({
			user_id: pegawaiId,
			fakultas_id: pegawaiFakultasId,
		})
		.onConflictDoNothing();

	console.log("👤 Seeding dosen user...");
	const dosenId = crypto.randomUUID();
	const dosenAccountId = crypto.randomUUID();
	const dosenHashedPassword = await hashPassword(seedData.users.dosen.password);
	const dosenFakultasId = fakultasMap.get(seedData.users.dosen.fakultasNama);
	if (!dosenFakultasId) throw new Error("Dosen fakultas not found");

	await db
		.insert(user)
		.values({
			id: dosenId,
			name: seedData.users.dosen.name,
			email: seedData.users.dosen.email,
			emailVerified: true,
			role: "dosen",
		})
		.onConflictDoNothing();

	await db
		.insert(account)
		.values({
			id: dosenAccountId,
			accountId: dosenId,
			providerId: "credential",
			userId: dosenId,
			password: dosenHashedPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.onConflictDoNothing();

	await db
		.insert(dosenProfile)
		.values({
			user_id: dosenId,
			nidn: seedData.users.dosen.nidn,
			fakultas_id: dosenFakultasId,
		})
		.onConflictDoNothing();

	console.log("✅ Seed completed!");
	console.log("\n📋 Seeded credentials:");
	console.log(
		`   Admin:   ${seedData.users.admin.email} / ${seedData.users.admin.password}`,
	);
	console.log(
		`   Pegawai: ${seedData.users.pegawai.email} / ${seedData.users.pegawai.password}`,
	);
	console.log(
		`   Dosen:   ${seedData.users.dosen.email} / ${seedData.users.dosen.password}`,
	);

	process.exit(0);
}

seed().catch((e) => {
	console.error("❌ Seed failed:", e);
	process.exit(1);
});
