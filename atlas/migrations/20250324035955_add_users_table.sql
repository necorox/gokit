-- Create "users" table
CREATE TABLE "public"."users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "email" text NOT NULL, "created_at" timestamp NOT NULL DEFAULT now(), PRIMARY KEY ("id"), CONSTRAINT "email_unique" UNIQUE ("email"));
