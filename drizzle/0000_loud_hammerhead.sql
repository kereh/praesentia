CREATE TABLE "praesentia_absen_dosen" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_absen_mahasiswa" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_adminProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_dosenProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"nidn" varchar(50) NOT NULL,
	"user_id" text NOT NULL,
	"fakultas_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_dosenProfile_nidn_unique" UNIQUE("nidn")
);
--> statement-breakpoint
CREATE TABLE "praesentia_fakultas" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_fakultas_nama_unique" UNIQUE("nama")
);
--> statement-breakpoint
CREATE TABLE "praesentia_jurusan" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"fakultas_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_jurusan_nama_unique" UNIQUE("nama")
);
--> statement-breakpoint
CREATE TABLE "praesentia_kelas" (
	"id" text PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"kode" text NOT NULL,
	"mata_kuliah_id" text NOT NULL,
	"fakultas_id" text NOT NULL,
	"jurusan_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_kelas_nama_unique" UNIQUE("nama"),
	CONSTRAINT "praesentia_kelas_kode_unique" UNIQUE("kode")
);
--> statement-breakpoint
CREATE TABLE "praesentia_mahasiswaProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" varchar(50) NOT NULL,
	"user_id" text NOT NULL,
	"fakultas_id" text,
	"jurusan_id" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_mahasiswaProfile_nim_unique" UNIQUE("nim")
);
--> statement-breakpoint
CREATE TABLE "praesentia_mata_kuliah" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_pegawaiProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"fakultas_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praesentia_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "praesentia_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "praesentia_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"role" varchar DEFAULT 'mahasiswa',
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "praesentia_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "praesentia_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "praesentia_account" ADD CONSTRAINT "praesentia_account_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_adminProfile" ADD CONSTRAINT "praesentia_adminProfile_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_dosenProfile" ADD CONSTRAINT "praesentia_dosenProfile_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_dosenProfile" ADD CONSTRAINT "praesentia_dosenProfile_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_jurusan" ADD CONSTRAINT "praesentia_jurusan_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD CONSTRAINT "praesentia_kelas_mata_kuliah_id_praesentia_mata_kuliah_id_fk" FOREIGN KEY ("mata_kuliah_id") REFERENCES "public"."praesentia_mata_kuliah"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD CONSTRAINT "praesentia_kelas_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD CONSTRAINT "praesentia_kelas_jurusan_id_praesentia_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."praesentia_jurusan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ADD CONSTRAINT "praesentia_mahasiswaProfile_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ADD CONSTRAINT "praesentia_mahasiswaProfile_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ADD CONSTRAINT "praesentia_mahasiswaProfile_jurusan_id_praesentia_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."praesentia_jurusan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_pegawaiProfile" ADD CONSTRAINT "praesentia_pegawaiProfile_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_pegawaiProfile" ADD CONSTRAINT "praesentia_pegawaiProfile_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_session" ADD CONSTRAINT "praesentia_session_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;