ALTER TABLE "praesentia_mata_kuliah" RENAME COLUMN "name" TO "nama";--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" DROP CONSTRAINT "praesentia_mata_kuliah_name_unique";--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD CONSTRAINT "praesentia_mata_kuliah_nama_unique" UNIQUE("nama");