CREATE TABLE "praesentia_semester" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD COLUMN "semester_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD COLUMN "dosen_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "praesentia_kelas" ADD CONSTRAINT "praesentia_kelas_semester_id_praesentia_semester_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."praesentia_semester"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praesentia_mata_kuliah" ADD CONSTRAINT "praesentia_mata_kuliah_dosen_id_praesentia_dosenProfile_id_fk" FOREIGN KEY ("dosen_id") REFERENCES "public"."praesentia_dosenProfile"("id") ON DELETE cascade ON UPDATE no action;