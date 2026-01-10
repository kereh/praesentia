ALTER TABLE "praesentia_dosenProfile" RENAME TO "praesentia_dosen";--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" RENAME TO "praesentia_mahasiswa";--> statement-breakpoint
ALTER TABLE "praesentia_pegawaiProfile" RENAME TO "praesentia_pegawai";--> statement-breakpoint
ALTER TABLE "praesentia_dosen" DROP CONSTRAINT "praesentia_dosenProfile_nidn_unique";--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" DROP CONSTRAINT "praesentia_mahasiswaProfile_nim_unique";--> statement-breakpoint
ALTER TABLE "praesentia_dosen" DROP CONSTRAINT "praesentia_dosenProfile_user_id_praesentia_user_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_dosen" DROP CONSTRAINT "praesentia_dosenProfile_fakultas_id_praesentia_fakultas_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_kelas" DROP CONSTRAINT "praesentia_kelas_dosen_id_praesentia_dosenProfile_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" DROP CONSTRAINT "praesentia_mahasiswaProfile_user_id_praesentia_user_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" DROP CONSTRAINT "praesentia_mahasiswaProfile_fakultas_id_praesentia_fakultas_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" DROP CONSTRAINT "praesentia_mahasiswaProfile_jurusan_id_praesentia_jurusan_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" DROP CONSTRAINT "praesentia_mata_kuliah_dosen_id_praesentia_dosenProfile_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_pegawai" DROP CONSTRAINT "praesentia_pegawaiProfile_user_id_praesentia_user_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_pegawai" DROP CONSTRAINT "praesentia_pegawaiProfile_fakultas_id_praesentia_fakultas_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_dosen" ADD CONSTRAINT "praesentia_dosen_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_dosen" ADD CONSTRAINT "praesentia_dosen_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD CONSTRAINT "praesentia_kelas_dosen_id_praesentia_dosen_id_fk" FOREIGN KEY ("dosen_id") REFERENCES "public"."praesentia_dosen"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" ADD CONSTRAINT "praesentia_mahasiswa_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" ADD CONSTRAINT "praesentia_mahasiswa_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" ADD CONSTRAINT "praesentia_mahasiswa_jurusan_id_praesentia_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."praesentia_jurusan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD CONSTRAINT "praesentia_mata_kuliah_dosen_id_praesentia_dosen_id_fk" FOREIGN KEY ("dosen_id") REFERENCES "public"."praesentia_dosen"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_pegawai" ADD CONSTRAINT "praesentia_pegawai_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_pegawai" ADD CONSTRAINT "praesentia_pegawai_fakultas_id_praesentia_fakultas_id_fk" FOREIGN KEY ("fakultas_id") REFERENCES "public"."praesentia_fakultas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_dosen" ADD CONSTRAINT "praesentia_dosen_nidn_unique" UNIQUE("nidn");--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa" ADD CONSTRAINT "praesentia_mahasiswa_nim_unique" UNIQUE("nim");