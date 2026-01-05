ALTER TABLE "praesentia_mahasiswaProfile" DROP CONSTRAINT "praesentia_mahasiswaProfile_nidn_unique";--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ALTER COLUMN "fakultas_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ALTER COLUMN "jurusan_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ADD COLUMN "nim" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" DROP COLUMN "nidn";--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswaProfile" ADD CONSTRAINT "praesentia_mahasiswaProfile_nim_unique" UNIQUE("nim");