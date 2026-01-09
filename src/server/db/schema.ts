import { relations } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `praesentia_${name}`);

export const adminProfile = createTable("adminProfile", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user_id: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const pegawaiProfile = createTable("pegawaiProfile", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user_id: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	fakultas_id: d
		.text("fakultas_id")
		.notNull()
		.references(() => fakultas.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const dosenProfile = createTable("dosenProfile", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nidn: d.varchar("nidn", { length: 50 }).notNull().unique(),
	user_id: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	fakultas_id: d
		.text("fakultas_id")
		.notNull()
		.references(() => fakultas.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const mahasiswaProfile = createTable("mahasiswaProfile", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nim: d.varchar("nim", { length: 50 }).notNull().unique(),
	user_id: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	fakultas_id: d
		.text("fakultas_id")
		.references(() => fakultas.id, { onDelete: "cascade" }),
	jurusan_id: d
		.text("jurusan_id")
		.references(() => jurusan.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const fakultas = createTable("fakultas", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nama: d.text("nama").notNull().unique(),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const jurusan = createTable("jurusan", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nama: d.text("nama").notNull().unique(),
	fakultas_id: d
		.text("fakultas_id")
		.notNull()
		.references(() => fakultas.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const kelas = createTable("kelas", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nama: d.text("nama").notNull().unique(),
	kode: d.text("kode").notNull().unique(),
	dosen_id: d
		.text("dosen_id")
		.notNull()
		.references(() => dosenProfile.id, { onDelete: "cascade" }),
	semester_id: d
		.text("semester_id")
		.notNull()
		.references(() => semester.id, { onDelete: "cascade" }),
	mata_kuliah_id: d
		.text("mata_kuliah_id")
		.notNull()
		.references(() => mataKuliah.id, { onDelete: "cascade" }),
	fakultas_id: d
		.text("fakultas_id")
		.notNull()
		.references(() => fakultas.id, { onDelete: "cascade" }),
	jurusan_id: d
		.text("jurusan_id")
		.notNull()
		.references(() => jurusan.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const mataKuliah = createTable("mata_kuliah", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nama: d.text("nama").unique(),
	dosen_id: d
		.text("dosen_id")
		.notNull()
		.references(() => dosenProfile.id, { onDelete: "cascade" }),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const absenDosen = createTable("absen_dosen", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const absenMahasiswa = createTable("absen_mahasiswa", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const semester = createTable("semester", (d) => ({
	id: d
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.text("name").unique(),
}));

export const mahasiswaMataKuliah = createTable(
	"mahasiswa_mata_kuliah",
	(d) => ({
		mahasiswa_id: d
			.text("mahasiswa_id")
			.notNull()
			.references(() => mahasiswaProfile.id),
		mata_kuliah_id: d
			.text("mata_kuliah_id")
			.notNull()
			.references(() => mataKuliah.id),
	}),
);

export const user = createTable("user", (d) => ({
	id: d.text("id").primaryKey(),
	name: d.text("name").notNull(),
	email: d.text("email").notNull().unique(),
	emailVerified: d
		.boolean("email_verified")
		.$defaultFn(() => false)
		.notNull(),
	image: d.text("image"),
	role: d
		.varchar("role", { enum: ["admin", "pegawai", "dosen", "mahasiswa"] })
		.default("mahasiswa"),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
}));

export const session = createTable("session", (d) => ({
	id: d.text("id").primaryKey(),
	expiresAt: d.timestamp("expires_at", { withTimezone: true }).notNull(),
	token: d.text("token").notNull().unique(),
	createdAt: d.timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: d.timestamp("updated_at", { withTimezone: true }).notNull(),
	ipAddress: d.text("ip_address"),
	userAgent: d.text("user_agent"),
	userId: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
}));

export const account = createTable("account", (d) => ({
	id: d.text("id").primaryKey(),
	accountId: d.text("account_id").notNull(),
	providerId: d.text("provider_id").notNull(),
	userId: d
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: d.text("access_token"),
	refreshToken: d.text("refresh_token"),
	idToken: d.text("id_token"),
	accessTokenExpiresAt: d.timestamp("access_token_expires_at", {
		withTimezone: true,
	}),
	refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at", {
		withTimezone: true,
	}),
	scope: d.text("scope"),
	password: d.text("password"),
	createdAt: d.timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: d.timestamp("updated_at", { withTimezone: true }).notNull(),
}));

export const verification = createTable("verification", (d) => ({
	id: d.text("id").primaryKey(),
	identifier: d.text("identifier").notNull(),
	value: d.text("value").notNull(),
	expiresAt: d.timestamp("expires_at", { withTimezone: true }).notNull(),
	createdAt: d
		.timestamp("created_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: d
		.timestamp("updated_at", { withTimezone: true })
		.$defaultFn(() => /* @__PURE__ */ new Date()),
}));

export const adminProfileRelations = relations(adminProfile, ({ one }) => ({
	user: one(user, {
		fields: [adminProfile.user_id],
		references: [user.id],
	}),
}));

export const pegawaiProfileRelations = relations(pegawaiProfile, ({ one }) => ({
	user: one(user, {
		fields: [pegawaiProfile.user_id],
		references: [user.id],
	}),
	fakultas: one(fakultas, {
		fields: [pegawaiProfile.fakultas_id],
		references: [fakultas.id],
	}),
}));

export const dosenProfileRelations = relations(
	dosenProfile,
	({ one, many }) => ({
		user: one(user, {
			fields: [dosenProfile.user_id],
			references: [user.id],
		}),
		fakultas: one(fakultas, {
			fields: [dosenProfile.fakultas_id],
			references: [fakultas.id],
		}),
		kelas: many(kelas),
		matakuliah: many(mataKuliah),
	}),
);

export const mahasiswaProfileRelations = relations(
	mahasiswaProfile,
	({ one, many }) => ({
		user: one(user, {
			fields: [mahasiswaProfile.user_id],
			references: [user.id],
		}),
		fakultas: one(fakultas, {
			fields: [mahasiswaProfile.fakultas_id],
			references: [fakultas.id],
		}),
		jurusan: one(jurusan, {
			fields: [mahasiswaProfile.jurusan_id],
			references: [jurusan.id],
		}),
		mahasiswaMataKuliah: many(mahasiswaMataKuliah),
	}),
);

export const fakultasRelations = relations(fakultas, ({ many }) => ({
	jurusan: many(jurusan),
	pegawai: many(pegawaiProfile),
	dosen: many(dosenProfile),
	mahasiswa: many(mahasiswaProfile),
	kelas: many(kelas),
}));

export const jurusanRelations = relations(jurusan, ({ one, many }) => ({
	fakultas: one(fakultas, {
		fields: [jurusan.fakultas_id],
		references: [fakultas.id],
	}),
	mahasiswa: many(mahasiswaProfile),
	kelas: many(kelas),
}));

export const kelasRelations = relations(kelas, ({ one }) => ({
	semester: one(semester, {
		fields: [kelas.semester_id],
		references: [semester.id],
	}),
	mata_kuliah: one(mataKuliah, {
		fields: [kelas.mata_kuliah_id],
		references: [mataKuliah.id],
	}),
	fakultas: one(fakultas, {
		fields: [kelas.fakultas_id],
		references: [fakultas.id],
	}),
	jurusan: one(jurusan, {
		fields: [kelas.jurusan_id],
		references: [jurusan.id],
	}),
	dosen: one(dosenProfile, {
		fields: [kelas.dosen_id],
		references: [dosenProfile.id],
	}),
}));

export const mataKuliahRelations = relations(mataKuliah, ({ one, many }) => ({
	dosen: one(dosenProfile, {
		fields: [mataKuliah.dosen_id],
		references: [dosenProfile.id],
	}),
	kelas: many(kelas),
	mahasiswaMataKuliah: many(mahasiswaMataKuliah),
}));

export const semesterRelations = relations(semester, ({ many }) => ({
	kelas: many(kelas),
}));

export const mahasiswaMataKuliahRelations = relations(
	mahasiswaMataKuliah,
	({ one }) => ({
		mahasiswa: one(mahasiswaProfile, {
			fields: [mahasiswaMataKuliah.mahasiswa_id],
			references: [mahasiswaProfile.id],
		}),
		mataKuliah: one(mataKuliah, {
			fields: [mahasiswaMataKuliah.mata_kuliah_id],
			references: [mataKuliah.id],
		}),
	}),
);

export const userRelations = relations(user, ({ many, one }) => ({
	admin: one(adminProfile, {
		fields: [user.id],
		references: [adminProfile.user_id],
	}),
	pegawai: one(pegawaiProfile, {
		fields: [user.id],
		references: [pegawaiProfile.user_id],
	}),
	dosen: one(dosenProfile, {
		fields: [user.id],
		references: [dosenProfile.user_id],
	}),
	mahasiswa: one(mahasiswaProfile, {
		fields: [user.id],
		references: [mahasiswaProfile.user_id],
	}),
	account: many(account),
	session: many(session),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] }),
}));
