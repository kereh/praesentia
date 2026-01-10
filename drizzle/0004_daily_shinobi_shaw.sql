ALTER TABLE "praesentia_adminProfile" RENAME TO "praesentia_admin";--> statement-breakpoint
ALTER TABLE "praesentia_admin" DROP CONSTRAINT "praesentia_adminProfile_user_id_praesentia_user_id_fk";
--> statement-breakpoint
ALTER TABLE "praesentia_admin" ADD CONSTRAINT "praesentia_admin_user_id_praesentia_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."praesentia_user"("id") ON DELETE cascade ON UPDATE no action;