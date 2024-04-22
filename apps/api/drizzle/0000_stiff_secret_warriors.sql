CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);