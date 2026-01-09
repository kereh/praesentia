CREATE TABLE "praesentia_mahasiswa_mata_kuliah" (
	"mahasiswa_id" text NOT NULL,
	"mata_kuliah_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "praesentia_semester" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa_mata_kuliah" ADD CONSTRAINT "praesentia_mahasiswa_mata_kuliah_mahasiswa_id_praesentia_mahasiswaProfile_id_fk" FOREIGN KEY ("mahasiswa_id") REFERENCES "public"."praesentia_mahasiswaProfile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mahasiswa_mata_kuliah" ADD CONSTRAINT "praesentia_mahasiswa_mata_kuliah_mata_kuliah_id_praesentia_mata_kuliah_id_fk" FOREIGN KEY ("mata_kuliah_id") REFERENCES "public"."praesentia_mata_kuliah"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD CONSTRAINT "praesentia_mata_kuliah_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "praesentia_semester" ADD CONSTRAINT "praesentia_semester_name_unique" UNIQUE("name");