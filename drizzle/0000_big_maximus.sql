-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SEQUENCE "public"."django_admin_log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."django_content_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gov_agendas" (
	"agendaid" serial PRIMARY KEY NOT NULL,
	"opendate" timestamp DEFAULT now() NOT NULL,
	"meetingtitle" text DEFAULT 'House Meeting' NOT NULL,
	"datesub" timestamp DEFAULT now() NOT NULL,
	"prefacetext" text,
	"meetingdate" date NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"usersub" text NOT NULL,
	"closingdate" date NOT NULL,
	"closedate" timestamp,
	"hchairannounce" text,
	"committeereps" text,
	"presannounce" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lounges" (
	"lounge" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"url" text DEFAULT 'http://simmons.mit.edu/atria/',
	"contact" text NOT NULL,
	"contact2" text,
	"active" boolean DEFAULT true NOT NULL,
	"allocation" numeric(10, 2),
	"allocation2" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gov_proposals" (
	"propid" serial PRIMARY KEY NOT NULL,
	"agendaid" integer,
	"agendaorder" integer,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"coauthors" text,
	"datesub" timestamp DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"specialnotes" text,
	"fundsrequestedamt" numeric(10, 2),
	"fulltext" text NOT NULL,
	"record" text DEFAULT '<li>(Original)</li>' NOT NULL,
	"userassign" text,
	"decision" text,
	"finalfunds" numeric(10, 2),
	"finalfulltext" text NOT NULL,
	"deletedby" text,
	"deletereason" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "advisors" (
	"officerid" integer PRIMARY KEY DEFAULT nextval('officers_officerid_seq'::regclass) NOT NULL,
	"username" text NOT NULL,
	"ordering" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"removed" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_users_all" (
	"username" text PRIMARY KEY NOT NULL,
	"password" text,
	"salt" text,
	"active" boolean DEFAULT true NOT NULL,
	"hosts_allow" text DEFAULT '%' NOT NULL,
	"immortal" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directory_copy" (
	"username" text,
	"firstname" text,
	"lastname" text,
	"room" text,
	"phone" text,
	"year" integer,
	"cellphone" text,
	"homepage" text,
	"home_city" text,
	"home_state" text,
	"home_country" text,
	"quote" text,
	"favorite_category" text,
	"favorite_value" text,
	"private" boolean,
	"type" text,
	"email" text,
	"lounge" text,
	"title" text,
	"loungevalue" integer,
	"showreminders" boolean,
	"guest_list_expiration" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id" integer PRIMARY KEY DEFAULT nextval('django_admin_log_id_seq'::regclass) NOT NULL,
	"action_time" timestamp with time zone NOT NULL,
	"object_id" text,
	"object_repr" varchar(200) NOT NULL,
	"action_flag" smallint NOT NULL,
	"change_message" text NOT NULL,
	"content_type_id" integer,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id" integer PRIMARY KEY DEFAULT nextval('django_content_type_id_seq'::regclass) NOT NULL,
	"name" varchar(100) NOT NULL,
	"app_label" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "officers" (
	"officerid" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"position" text NOT NULL,
	"ordering" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"removed" timestamp,
	"position_text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gov_fin_subaccounts" (
	"subid" serial PRIMARY KEY NOT NULL,
	"acctid" integer NOT NULL,
	"name" text NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"allocationamt" numeric(10, 2) NOT NULL,
	"isallocation" boolean DEFAULT true NOT NULL,
	"shortname" text NOT NULL,
	"byuser" text NOT NULL,
	"closedby" text,
	"closedat" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guest_list" (
	"guestlistid" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"guest" text NOT NULL,
	"date_added" timestamp NOT NULL,
	"date_invalid" timestamp NOT NULL,
	"current" boolean DEFAULT true NOT NULL,
	"onetime" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "handicapped_rooms" (
	"room" text NOT NULL,
	"type" text NOT NULL,
	"size" integer,
	"numbersharedwith" integer,
	"roomnumberonfloorplan" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lounge_expenses" (
	"expenseid" serial PRIMARY KEY NOT NULL,
	"loungeid" text NOT NULL,
	"usersub" text NOT NULL,
	"datesubmitted" timestamp,
	"datespent" text NOT NULL,
	"numparticipated" integer,
	"amountspent" numeric(10, 2),
	"description" text NOT NULL,
	"termsold" integer DEFAULT 0 NOT NULL,
	"finished" boolean DEFAULT false NOT NULL,
	"datepropsubmitted" timestamp NOT NULL,
	"canceled" boolean DEFAULT false NOT NULL,
	"valid" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailman_lists" (
	"listname" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"subject_prefix" text NOT NULL,
	"groupname" text,
	"private" boolean DEFAULT true NOT NULL,
	"moderated" boolean DEFAULT false NOT NULL,
	"password" text NOT NULL,
	"creator" text NOT NULL,
	"mandatory" boolean DEFAULT false NOT NULL,
	"ownergroup" text,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailman_aliases" (
	"listname" text NOT NULL,
	"alias" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailserver" (
	"username" text PRIMARY KEY NOT NULL,
	"poserver" text NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medlinks" (
	"officerid" integer PRIMARY KEY DEFAULT nextval('officers_officerid_seq'::regclass) NOT NULL,
	"username" text NOT NULL,
	"ordering" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"removed" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lotteries" (
	"lotteryid" serial PRIMARY KEY NOT NULL,
	"lotteryname" text NOT NULL,
	"description" text NOT NULL,
	"groupname" text NOT NULL,
	"owner" text NOT NULL,
	"viewable" boolean NOT NULL,
	"open_date" timestamp,
	"close_date" timestamp,
	"approved" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lottery_entries" (
	"lotteryid" integer,
	"username" text,
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"rank" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie_types" (
	"typeid" serial PRIMARY KEY NOT NULL,
	"typename" text NOT NULL,
	"loan_duration" interval NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "movie_types_typename_key" UNIQUE("typename")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie_loans" (
	"loanid" serial PRIMARY KEY NOT NULL,
	"instanceid" integer NOT NULL,
	"movieid_ref" integer NOT NULL,
	"username" text NOT NULL,
	"checkout" timestamp NOT NULL,
	"checkout_by" text NOT NULL,
	"checkin" timestamp,
	"checkin_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages" (
	"packageid" serial PRIMARY KEY NOT NULL,
	"recipient" text NOT NULL,
	"bin" text NOT NULL,
	"checkin" timestamp NOT NULL,
	"checkin_by" text NOT NULL,
	"pickup" timestamp,
	"pickup_by" text,
	"perishable" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"name" text PRIMARY KEY NOT NULL,
	"documentation" text,
	"value" integer,
	"value_string" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages_checkin" (
	"checkinid" serial PRIMARY KEY NOT NULL,
	"recipient" text NOT NULL,
	"bin" text NOT NULL,
	"pkg_count" integer NOT NULL,
	"deskworker" text NOT NULL,
	"entry_time" timestamp NOT NULL,
	"perishable" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie_items" (
	"movieid" serial PRIMARY KEY NOT NULL,
	"typeid" integer NOT NULL,
	"title" text NOT NULL,
	"num_disks" integer,
	"link" text,
	"item_loan_duration" interval
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "polls" (
	"pollid" serial PRIMARY KEY NOT NULL,
	"pollname" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"groupname" text NOT NULL,
	"owner" text NOT NULL,
	"viewable" boolean NOT NULL,
	"final" boolean,
	"open_date" timestamp,
	"close_date" timestamp,
	"approved" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooming" (
	"lottery_pick" integer PRIMARY KEY NOT NULL,
	"adjusted_pick" integer,
	"block_num" integer,
	"username" text NOT NULL,
	"room" text,
	CONSTRAINT "rooming_username_key" UNIQUE("username"),
	CONSTRAINT "rooming_block_num_check" CHECK (block_num > 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms_copy" (
	"room" text,
	"floor" integer,
	"type" text,
	"size" integer,
	"phone1" text,
	"phone2" text,
	"grt" text,
	"frosh" boolean,
	"handicapped" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_group_membership_cache" (
	"username" text NOT NULL,
	"groupname" text NOT NULL,
	"hosts_allow" text DEFAULT '18.96.%' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_automated_groups_copy" (
	"groupname" text,
	"sql" text,
	"hosts_allow" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_automated_groups" (
	"groupname" text PRIMARY KEY NOT NULL,
	"sql" text NOT NULL,
	"hosts_allow" text DEFAULT '%' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_sessions" (
	"sid" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"expires" timestamp,
	"remote_addr" text NOT NULL,
	"data" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_permissions_sds" (
	"wiki_prefix" text PRIMARY KEY NOT NULL,
	"read_groupname" text,
	"write_groupname" text,
	"admin_groupname" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_groups" (
	"groupname" text PRIMARY KEY NOT NULL,
	"contact" text,
	"adhoc" boolean DEFAULT false NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_types_copy" (
	"type" text,
	"description" text,
	"active" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_types" (
	"type" text PRIMARY KEY NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directory" (
	"username" text PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"room" text,
	"phone" text,
	"year" integer,
	"cellphone" text,
	"homepage" text,
	"home_city" text,
	"home_state" text,
	"home_country" text,
	"quote" text,
	"favorite_category" text,
	"favorite_value" text,
	"private" boolean DEFAULT false NOT NULL,
	"type" text NOT NULL,
	"email" text NOT NULL,
	"lounge" text,
	"title" text,
	"loungevalue" integer,
	"showreminders" boolean DEFAULT true NOT NULL,
	"guest_list_expiration" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"room" text PRIMARY KEY NOT NULL,
	"floor" integer,
	"type" text NOT NULL,
	"size" integer,
	"phone1" text,
	"phone2" text,
	"gra" text,
	"frosh" boolean,
	"handicapped" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gov_fin_accounts" (
	"acctid" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"shortname" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gov_fin_ledger" (
	"tid" serial PRIMARY KEY NOT NULL,
	"subid" integer NOT NULL,
	"name" text NOT NULL,
	"submitted" timestamp DEFAULT now() NOT NULL,
	"byuser" text NOT NULL,
	"acctid" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"voidedby" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie_instances" (
	"instanceid" serial PRIMARY KEY NOT NULL,
	"movieid" integer,
	"checked_out" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"box_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailman_optout" (
	"username" text NOT NULL,
	"listname" text NOT NULL,
	CONSTRAINT "mailman_optout_pkey" PRIMARY KEY("username","listname")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailman_superlists" (
	"listname" text NOT NULL,
	"superlist" text NOT NULL,
	CONSTRAINT "mailman_superlists_pkey" PRIMARY KEY("listname","superlist")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_groups_adhoc_locations" (
	"table" text NOT NULL,
	"group_field" text NOT NULL,
	CONSTRAINT "sds_groups_adhoc_locations_pkey" PRIMARY KEY("table","group_field")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ballots" (
	"pollid" integer NOT NULL,
	"username" text NOT NULL,
	"date_cast" timestamp NOT NULL,
	CONSTRAINT "ballots_pkey" PRIMARY KEY("pollid","username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "printer_use" (
	"username" text NOT NULL,
	"date" date NOT NULL,
	"pages" integer NOT NULL,
	CONSTRAINT "printer_use_pkey" PRIMARY KEY("username","date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_groups_in_groups" (
	"supergroup" text NOT NULL,
	"subgroup" text NOT NULL,
	"hosts_allow" text DEFAULT '%' NOT NULL,
	CONSTRAINT "sds_groups_in_groups_pkey" PRIMARY KEY("supergroup","subgroup")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_users_in_groups" (
	"username" text NOT NULL,
	"groupname" text NOT NULL,
	"hosts_allow" text DEFAULT '%' NOT NULL,
	CONSTRAINT "sds_users_in_groups_pkey" PRIMARY KEY("username","groupname")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_permissions_wikiuser" (
	"wiki_prefix" text NOT NULL,
	"wiki_username" text NOT NULL,
	"access" text NOT NULL,
	CONSTRAINT "wiki_permissions_wikiuser_pkey" PRIMARY KEY("wiki_prefix","wiki_username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lounge_expense_actions" (
	"expenseid" integer NOT NULL,
	"username" text NOT NULL,
	"action" integer NOT NULL,
	CONSTRAINT "lounge_expense_actions_pkey" PRIMARY KEY("expenseid","username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "old_room_assignments" (
	"username" text NOT NULL,
	"room" text NOT NULL,
	"movein" timestamp DEFAULT now() NOT NULL,
	"moveout" timestamp,
	CONSTRAINT "old_room_assignments_pkey" PRIMARY KEY("username","movein")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poll_choices" (
	"pollid" integer NOT NULL,
	"ordering" integer NOT NULL,
	"description" text NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "poll_choices_pkey" PRIMARY KEY("pollid","ordering")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sds_group_notifications" (
	"groupname" text NOT NULL,
	"changetype" text NOT NULL,
	"recipient_groupname" text NOT NULL,
	"mail_subject" text NOT NULL,
	"mail_message" text NOT NULL,
	CONSTRAINT "sds_group_notifications_pkey" PRIMARY KEY("groupname","changetype","recipient_groupname")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_agendas" ADD CONSTRAINT "gov_agendas_usersub_fkey" FOREIGN KEY ("usersub") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounges" ADD CONSTRAINT "lounges_contact2_fkey" FOREIGN KEY ("contact2") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounges" ADD CONSTRAINT "lounges_contact_fkey" FOREIGN KEY ("contact") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_proposals" ADD CONSTRAINT "gov_proposals_agendaid_fkey" FOREIGN KEY ("agendaid") REFERENCES "public"."gov_agendas"("agendaid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_proposals" ADD CONSTRAINT "gov_proposals_author_fkey" FOREIGN KEY ("author") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_proposals" ADD CONSTRAINT "gov_proposals_deletedby_fkey" FOREIGN KEY ("deletedby") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_proposals" ADD CONSTRAINT "gov_proposals_userassign_fkey" FOREIGN KEY ("userassign") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "officers" ADD CONSTRAINT "officers_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_subaccounts" ADD CONSTRAINT "gov_fin_subaccounts_acctid_fkey" FOREIGN KEY ("acctid") REFERENCES "public"."gov_fin_accounts"("acctid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_subaccounts" ADD CONSTRAINT "gov_fin_subaccounts_byuser_fkey" FOREIGN KEY ("byuser") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_subaccounts" ADD CONSTRAINT "gov_fin_subaccounts_closedby_fkey" FOREIGN KEY ("closedby") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest_list" ADD CONSTRAINT "guest_list_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounge_expenses" ADD CONSTRAINT "lounge_expenses_loungeid_fkey" FOREIGN KEY ("loungeid") REFERENCES "public"."lounges"("lounge") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounge_expenses" ADD CONSTRAINT "lounge_expenses_usersub_fkey" FOREIGN KEY ("usersub") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_lists" ADD CONSTRAINT "mailman_lists_creator_fkey" FOREIGN KEY ("creator") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_lists" ADD CONSTRAINT "mailman_lists_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_lists" ADD CONSTRAINT "mailman_lists_ownergroup_fkey" FOREIGN KEY ("ownergroup") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_aliases" ADD CONSTRAINT "mailman_aliases_listname_fkey" FOREIGN KEY ("listname") REFERENCES "public"."mailman_lists"("listname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailserver" ADD CONSTRAINT "mailserver_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lotteries" ADD CONSTRAINT "lotteries_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lotteries" ADD CONSTRAINT "lotteries_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lottery_entries" ADD CONSTRAINT "lottery_entries_lotteryid_fkey" FOREIGN KEY ("lotteryid") REFERENCES "public"."lotteries"("lotteryid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lottery_entries" ADD CONSTRAINT "lottery_entries_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_loans" ADD CONSTRAINT "movie_loans_checkin_by_fkey" FOREIGN KEY ("checkin_by") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_loans" ADD CONSTRAINT "movie_loans_checkout_by_fkey" FOREIGN KEY ("checkout_by") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_loans" ADD CONSTRAINT "movie_loans_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "public"."movie_instances"("instanceid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_loans" ADD CONSTRAINT "movie_loans_movieid_ref_fkey" FOREIGN KEY ("movieid_ref") REFERENCES "public"."movie_items"("movieid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_loans" ADD CONSTRAINT "movie_loans_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_checkin_by_fkey" FOREIGN KEY ("checkin_by") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_pickup_by_fkey" FOREIGN KEY ("pickup_by") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_recipient_fkey" FOREIGN KEY ("recipient") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages_checkin" ADD CONSTRAINT "packages_checkin_deskworker_fkey" FOREIGN KEY ("deskworker") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages_checkin" ADD CONSTRAINT "packages_checkin_recipient_fkey" FOREIGN KEY ("recipient") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_items" ADD CONSTRAINT "movie_items_typeid_fkey" FOREIGN KEY ("typeid") REFERENCES "public"."movie_types"("typeid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "polls" ADD CONSTRAINT "polls_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "polls" ADD CONSTRAINT "polls_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooming" ADD CONSTRAINT "rooming_room_fkey" FOREIGN KEY ("room") REFERENCES "public"."rooms"("room") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooming" ADD CONSTRAINT "rooming_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_group_membership_cache" ADD CONSTRAINT "sds_group_membership_cache_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_group_membership_cache" ADD CONSTRAINT "sds_group_membership_cache_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_automated_groups" ADD CONSTRAINT "sds_automated_groups_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_sessions" ADD CONSTRAINT "sds_sessions_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_permissions_sds" ADD CONSTRAINT "wiki_permissions_sds_admin_groupname_fkey" FOREIGN KEY ("admin_groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_permissions_sds" ADD CONSTRAINT "wiki_permissions_sds_read_groupname_fkey" FOREIGN KEY ("read_groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_permissions_sds" ADD CONSTRAINT "wiki_permissions_sds_write_groupname_fkey" FOREIGN KEY ("write_groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directory" ADD CONSTRAINT "directory_lounge_fkey" FOREIGN KEY ("lounge") REFERENCES "public"."lounges"("lounge") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directory" ADD CONSTRAINT "directory_room_fkey" FOREIGN KEY ("room") REFERENCES "public"."rooms"("room") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directory" ADD CONSTRAINT "directory_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."user_types"("type") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directory" ADD CONSTRAINT "directory_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_ledger" ADD CONSTRAINT "gov_fin_ledger_acctid_fkey" FOREIGN KEY ("acctid") REFERENCES "public"."gov_fin_accounts"("acctid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_ledger" ADD CONSTRAINT "gov_fin_ledger_byuser_fkey" FOREIGN KEY ("byuser") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_ledger" ADD CONSTRAINT "gov_fin_ledger_subid_fkey" FOREIGN KEY ("subid") REFERENCES "public"."gov_fin_subaccounts"("subid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gov_fin_ledger" ADD CONSTRAINT "gov_fin_ledger_voidedby_fkey" FOREIGN KEY ("voidedby") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie_instances" ADD CONSTRAINT "movie_instances_movieid_fkey" FOREIGN KEY ("movieid") REFERENCES "public"."movie_items"("movieid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_optout" ADD CONSTRAINT "mailman_optout_listname_fkey" FOREIGN KEY ("listname") REFERENCES "public"."mailman_lists"("listname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mailman_optout" ADD CONSTRAINT "mailman_optout_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ballots" ADD CONSTRAINT "ballots_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "public"."polls"("pollid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ballots" ADD CONSTRAINT "ballots_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_groups_in_groups" ADD CONSTRAINT "sds_groups_in_groups_subgroup_fkey" FOREIGN KEY ("subgroup") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_groups_in_groups" ADD CONSTRAINT "sds_groups_in_groups_supergroup_fkey" FOREIGN KEY ("supergroup") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_users_in_groups" ADD CONSTRAINT "sds_users_in_groups_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_users_in_groups" ADD CONSTRAINT "sds_users_in_groups_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_permissions_wikiuser" ADD CONSTRAINT "wiki_permissions_wikiuser_wiki_prefix_fkey" FOREIGN KEY ("wiki_prefix") REFERENCES "public"."wiki_permissions_sds"("wiki_prefix") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounge_expense_actions" ADD CONSTRAINT "lounge_expense_actions_expenseid_fkey" FOREIGN KEY ("expenseid") REFERENCES "public"."lounge_expenses"("expenseid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lounge_expense_actions" ADD CONSTRAINT "lounge_expense_actions_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "old_room_assignments" ADD CONSTRAINT "old_room_assignments_room_fkey" FOREIGN KEY ("room") REFERENCES "public"."rooms"("room") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "old_room_assignments" ADD CONSTRAINT "old_room_assignments_username_fkey" FOREIGN KEY ("username") REFERENCES "public"."sds_users_all"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poll_choices" ADD CONSTRAINT "poll_choices_pollid_fkey" FOREIGN KEY ("pollid") REFERENCES "public"."polls"("pollid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_group_notifications" ADD CONSTRAINT "sds_group_notifications_groupname_fkey" FOREIGN KEY ("groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sds_group_notifications" ADD CONSTRAINT "sds_group_notifications_recipient_groupname_fkey" FOREIGN KEY ("recipient_groupname") REFERENCES "public"."sds_groups"("groupname") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_groupname_index" ON "sds_group_membership_cache" USING btree ("username","groupname");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "room_index" ON "old_room_assignments" USING btree ("room");--> statement-breakpoint
CREATE VIEW "public"."sds_users" AS (SELECT username, password, salt, active, hosts_allow, immortal FROM sds_users_all WHERE active);--> statement-breakpoint
CREATE VIEW "public"."active_directory" AS (SELECT username, firstname, lastname, room, phone, year, cellphone, homepage, home_city, home_state, home_country, quote, favorite_category, favorite_value, private, type, email, lounge, title, loungevalue, showreminders, guest_list_expiration FROM directory WHERE (username IN ( SELECT sds_users.username FROM sds_users)));--> statement-breakpoint
CREATE VIEW "public"."active_lounges" AS (SELECT lounge, description, url, contact, contact2, active, allocation, allocation2 FROM lounges WHERE active);--> statement-breakpoint
CREATE VIEW "public"."active_lounges_2" AS (SELECT lounge, description, url, contact, contact2, active, allocation FROM lounges WHERE active);--> statement-breakpoint
CREATE VIEW "public"."gov_active_proposals" AS (SELECT propid, agendaid, agendaorder, type, title, author, coauthors, datesub, description, specialnotes, fundsrequestedamt, fulltext, record, userassign, decision, finalfunds, finalfulltext, deletedby, deletereason FROM gov_proposals WHERE deletedby IS NULL);--> statement-breakpoint
CREATE VIEW "public"."gov_unassigned_proposals" AS (SELECT propid, agendaid, agendaorder, type, title, author, coauthors, datesub, description, specialnotes, fundsrequestedamt, fulltext, record, userassign, decision, finalfunds, finalfulltext, deletedby, deletereason FROM gov_proposals WHERE agendaid IS NULL AND deletedby IS NULL);--> statement-breakpoint
CREATE VIEW "public"."lounge_summary_report" AS (SELECT lounges.lounge AS loungeid, lounges.description, COALESCE(memberinfo.membership, 0::bigint)::integer AS membership, lounges.allocation, lounges.allocation2, CASE WHEN memberinfo.valuemembers < 5 OR memberinfo.valuemembers IS NULL THEN 0::bigint WHEN memberinfo.predalloc > 1000 THEN 1000::bigint ELSE memberinfo.predalloc END::integer AS predalloc, expenseinfo.avgparts, COALESCE(expenseinfo.totalspent, 0::numeric)::numeric(10,2) AS totalspent, COALESCE(expenseinfo.numevents, 0::bigint)::integer AS numevents FROM lounges LEFT JOIN ( SELECT directory.lounge, count(*) AS membership, count(directory.loungevalue > 0 OR NULL::boolean) AS valuemembers, sum(directory.loungevalue) AS predalloc FROM directory WHERE directory.lounge IS NOT NULL GROUP BY directory.lounge) memberinfo ON lounges.lounge = memberinfo.lounge LEFT JOIN ( SELECT lounge_expenses.loungeid, sum(lounge_expenses.numparticipated)::double precision / count(lounge_expenses.valid)::double precision AS avgparts, sum(lounge_expenses.amountspent) AS totalspent, count(lounge_expenses.valid) AS numevents FROM lounge_expenses WHERE lounge_expenses.valid AND NOT lounge_expenses.canceled AND lounge_expenses.termsold = 0 GROUP BY lounge_expenses.loungeid) expenseinfo ON lounges.lounge = expenseinfo.loungeid WHERE lounges.active);--> statement-breakpoint
CREATE VIEW "public"."lounge_summary_report_2" AS (SELECT lounges.lounge AS loungeid, lounges.description, COALESCE(memberinfo.membership, 0::bigint)::integer AS membership, lounges.allocation, CASE WHEN memberinfo.valuemembers < 10 OR memberinfo.valuemembers IS NULL THEN 0::bigint WHEN memberinfo.predalloc > 1000 THEN 1000::bigint ELSE memberinfo.predalloc END::integer AS predalloc, expenseinfo.avgparts, COALESCE(expenseinfo.totalspent, 0::numeric)::numeric(10,2) AS totalspent, COALESCE(expenseinfo.numevents, 0::bigint)::integer AS numevents FROM lounges LEFT JOIN ( SELECT directory.lounge, count(*) AS membership, count(directory.loungevalue > 0 OR NULL::boolean) AS valuemembers, sum(directory.loungevalue) AS predalloc FROM directory WHERE directory.lounge IS NOT NULL GROUP BY directory.lounge) memberinfo ON lounges.lounge = memberinfo.lounge LEFT JOIN ( SELECT lounge_expenses.loungeid, sum(lounge_expenses.numparticipated)::double precision / count(lounge_expenses.valid)::double precision AS avgparts, sum(lounge_expenses.amountspent) AS totalspent, count(lounge_expenses.valid) AS numevents FROM lounge_expenses WHERE lounge_expenses.valid AND NOT lounge_expenses.canceled AND lounge_expenses.termsold = 0 GROUP BY lounge_expenses.loungeid) expenseinfo ON lounges.lounge = expenseinfo.loungeid WHERE lounges.active);--> statement-breakpoint
CREATE VIEW "public"."public_active_directory" AS (SELECT username, firstname, lastname, room, phone, year, cellphone, homepage, home_city, home_state, home_country, quote, favorite_category, favorite_value, private, type, email, lounge, title, loungevalue, showreminders, guest_list_expiration FROM directory WHERE (username IN ( SELECT sds_users.username FROM sds_users)) AND NOT private);--> statement-breakpoint
CREATE VIEW "public"."sds_groups_public" AS (SELECT groupname, contact, adhoc, description, active FROM sds_groups WHERE NOT adhoc AND active);
*/