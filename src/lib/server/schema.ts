import { inArray, not, sql, eq, and } from 'drizzle-orm';
import {
	integer,
	text,
	timestamp,
	pgTable,
	pgView,
	primaryKey,
	foreignKey,
	boolean,
	numeric
} from 'drizzle-orm/pg-core';

import type { InferSelectModel } from 'drizzle-orm';

export const advisors = pgTable(
	'advisors',
	{
		officerid: integer('officerid')
			.notNull()
			.default(sql`nextval('officers_officerid_seq'::regclass)`),
		username: text('username').notNull(),
		ordering: integer('ordering'),
		created: timestamp('created', { withTimezone: false }).defaultNow().notNull(),
		removed: timestamp('removed', { withTimezone: false })
	},
	(table) => {
		return { pkey: primaryKey({ name: 'advisors_pkey', columns: [table.officerid] }) };
	}
);

export const ballots = pgTable(
	'ballots',
	{
		pollid: integer('pollid').notNull(),
		username: text('username').notNull(),
		date_cast: timestamp('date_cast', { withTimezone: false }).notNull()
	},
	(table) => {
		return {
			ballots_pkey: primaryKey({ name: 'ballots_pkey', columns: [table.pollid, table.username] }),
			ballots_pollid_fkey: foreignKey({
				name: 'ballots_pollid_fkey',
				columns: [table.pollid],
				foreignColumns: [polls.pollid]
			}),
			ballots_username_fkey: foreignKey({
				name: 'ballots_username_fkey',
				columns: [table.username],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const directory = pgTable(
	'directory',
	{
		username: text('username').notNull(),
		firstname: text('firstname').notNull(),
		lastname: text('lastname').notNull(),
		room: text('room'),
		phone: text('phone'),
		year: integer('year'),
		cellphone: text('cellphone'),
		homepage: text('homepage'),
		home_city: text('home_city'),
		home_state: text('home_state'),
		home_country: text('home_country'),
		quote: text('quote'),
		favorite_category: text('favorite_category'),
		favorite_value: text('favorite_value'),
		private: boolean('private').notNull().default(false),
		type: text('type').notNull(),
		email: text('email').notNull(),
		lounge: text('lounge'),
		title: text('title'),
		loungevalue: integer('loungevalue'),
		showreminders: boolean('showreminders').notNull().default(true),
		guest_list_expiration: text('guest_list_expiration')
	},
	(table) => {
		return {
			directory_pkey: primaryKey({ name: 'directory_pkey', columns: [table.username] }),
			directory_lounge_fkey: foreignKey({
				name: 'directory_lounge_fkey',
				columns: [table.lounge],
				foreignColumns: [lounges.lounge]
			}),
			directory_room_fkey: foreignKey({
				name: 'directory_room_fkey',
				columns: [table.room],
				foreignColumns: [rooms.room]
			}),
			directory_type_fkey: foreignKey({
				name: 'directory_type_fkey',
				columns: [table.type],
				foreignColumns: [user_types.type]
			}),
			directory_username_fkey: foreignKey({
				name: 'directory_username_fkey',
				columns: [table.username],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const polls = pgTable(
	'polls',
	{
		pollid: integer('pollid')
			.notNull()
			.default(sql`nextval('polls_pollid_seq'::regclass)`),
		pollname: text('pollname').notNull(),
		description: text('description'),
		type: text('type').notNull(),
		groupname: text('groupname').notNull(),
		owner: text('owner').notNull(),
		viewable: boolean('viewable').notNull(),
		final: boolean('final'),
		open_date: timestamp('open_date', { withTimezone: false }),
		close_date: timestamp('close_date', { withTimezone: false }),
		approved: boolean('approved').notNull().default(false),
		deleted: boolean('deleted').notNull().default(false)
	},
	(table) => {
		return {
			polls_pkey: primaryKey({ name: 'polls_pkey', columns: [table.pollid] }),
			polls_groupname_fkey: foreignKey({
				name: 'polls_groupname_fkey',
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname]
			}),
			polls_owner_fkey: foreignKey({
				name: 'polls_owner_fkey',
				columns: [table.owner],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const sds_users_all = pgTable(
	'sds_users_all',
	{
		username: text('username').notNull(),
		password: text('password'),
		salt: text('salt'),
		active: boolean('active').notNull().default(true),
		hosts_allow: text('hosts_allow').default(sql`'%'::text`),
		immortal: boolean('immortal').notNull().default(false)
	},
	(table) => {
		return {
			sds_users_all_pkey: primaryKey({ name: 'sds_users_all_pkey', columns: [table.username] })
		};
	}
);

export const sds_groups = pgTable(
	'sds_groups',
	{
		groupname: text('groupname').notNull(),
		contact: text('contact'),
		adhoc: boolean('adhoc').notNull().default(false),
		description: text('description'),
		active: boolean('active').notNull().default(true)
	},
	(table) => {
		return {
			sds_groups_pkey: primaryKey({ name: 'sds_groups_pkey', columns: [table.groupname] })
		};
	}
);

export const user_types = pgTable(
	'user_types',
	{
		type: text('type').notNull(),
		description: text('description'),
		active: boolean('active').notNull().default(true)
	},
	(table) => {
		return {
			user_types_pkey: primaryKey({ name: 'user_types_pkey', columns: [table.type] })
		};
	}
);

export const rooms = pgTable(
	'rooms',
	{
		room: text('room').notNull(),
		floor: integer('floor'),
		type: text('type').notNull(),
		size: integer('size'),
		phone1: text('phone1'),
		phone2: text('phone2'),
		gra: text('gra'),
		frosh: boolean('frosh'),
		handicapped: boolean('handicapped')
	},
	(table) => {
		return { rooms_pkey: primaryKey({ name: 'rooms_pkey', columns: [table.room] }) };
	}
);

export const lounges = pgTable(
	'lounges',
	{
		lounge: text('lounge').notNull(),
		description: text('description').notNull(),
		url: text('url').default(sql`'http://simmons.mit.edu/atria/'::text`),
		contact: text('contact').notNull(),
		contact2: text('contact2'),
		active: boolean('active').notNull().default(true),
		allocation: numeric('allocation'),
		allocation2: numeric('allocation2')
	},
	(table) => {
		return {
			lounges_pkey: primaryKey({ name: 'lounges_pkey', columns: [table.lounge] }),
			lounges_contact2_fkey: foreignKey({
				name: 'lounges_contact2_fkey',
				columns: [table.contact2],
				foreignColumns: [sds_users_all.username]
			}),
			lounges_contact_fkey: foreignKey({
				name: 'lounges_contact_fkey',
				columns: [table.contact],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const options = pgTable(
	'options',
	{
		name: text('name').notNull(),
		documentation: text('documentation'),
		value: integer('value'),
		value_string: text('value_string')
	},
	(table) => {
		return { options_pkey: primaryKey({ name: 'options_pkey', columns: [table.name] }) };
	}
);

export const sds_group_membership_cache = pgTable(
	'sds_group_membership_cache',
	{
		username: text('username').notNull(),
		groupname: text('groupname').notNull(),
		hosts_allow: text('hosts_allow')
			.notNull()
			.default(sql`'18.96.%'::text`)
	},
	(table) => {
		return {
			sds_group_membership_cache_groupname_fkey: foreignKey({
				name: 'sds_group_membership_cache_groupname_fkey',
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname]
			}),
			sds_group_membership_cache_username_fkey: foreignKey({
				name: 'sds_group_membership_cache_username_fkey',
				columns: [table.username],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const sds_users = pgView('sds_users').as((qb) => {
	return qb.select().from(sds_users_all).where(eq(sds_users_all.active, true));
});

export const sds_sessions = pgTable(
	'sds_sessions',
	{
		sid: text('sid').notNull(),
		username: text('username').notNull(),
		expires: timestamp('expires', { withTimezone: false }),
		remote_addr: text('remote_addr').notNull(),
		data: text('data')
	},
	(table) => {
		return {
			sds_sessions_pkey: primaryKey({ name: 'sds_sessions_pkey', columns: [table.sid] }),
			sds_sessions_username_fkey: foreignKey({
				name: 'sds_sessions_username_fkey',
				columns: [table.username],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const public_active_directory = pgView('public_active_directory').as((qb) => {
	return qb
		.select()
		.from(directory)
		.where(
			and(
				inArray(directory.username, qb.select({ username: sds_users.username }).from(sds_users)),
				not(directory.private)
			)
		);
});

export const active_directory = pgView('active_directory').as((qb) => {
	return qb
		.select()
		.from(directory)
		.where(
			inArray(directory.username, qb.select({ username: sds_users.username }).from(sds_users))
		);
});

export const active_lounges = pgView('active_lounges').as((qb) => {
	return qb
		.select({
			lounge: lounges.lounge,
			description: lounges.description,
			url: lounges.url,
			contact: lounges.contact,
			contact2: lounges.contact2,
			active: lounges.active,
			allocation: lounges.allocation,
			allocation2: lounges.allocation2
		})
		.from(lounges)
		.where(eq(lounges.active, true));
});

export const active_lounges_2 = pgView('active_lounges_2').as((qb) => {
	return qb
		.select({
			lounge: lounges.lounge,
			description: lounges.description,
			url: lounges.url,
			contact: lounges.contact,
			contact2: lounges.contact2,
			active: lounges.active,
			allocation: lounges.allocation
			// allocation2: lounges.allocation2
		})
		.from(lounges)
		.where(eq(lounges.active, true));
});

export const medlinks = pgTable(
	'medlinks',
	{
		officerid: integer('officerid')
			.notNull()
			.default(sql`nextval('officers_officerid_seq'::regclass)`),
		username: text('username').notNull(),
		ordering: integer('ordering'),
		created: timestamp('created', { withTimezone: false }).defaultNow().notNull(),
		removed: timestamp('removed', { withTimezone: false })
	},
	(table) => {
		return { pkey: primaryKey({ name: 'medlinks_pkey', columns: [table.officerid] }) };
	}
);

export const officers = pgTable(
	'officers',
	{
		officerid: integer('officerid')
			.notNull()
			.default(sql`nextval('officers_officerid_seq'::regclass)`),
		username: text('username').notNull(),
		position: text('position').notNull(),
		ordering: integer('ordering'),
		created: timestamp('created', { withTimezone: false }).defaultNow().notNull(),
		removed: timestamp('removed', { withTimezone: false }),
		position_text: text('position_text')
	},
	(table) => {
		return {
			pkey: primaryKey({ name: 'officers_pkey', columns: [table.officerid] }),
			officers_username_fkey: foreignKey({
				name: 'officers_username_fkey',
				columns: [table.username],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export const packages = pgTable(
	'packages',
	{
		packageid: integer('packageid')
			.notNull()
			.default(sql`nextval('packages_packageid_seq'::regclass)`),
		recipient: text('recipient').notNull(),
		bin: text('bin').notNull(),
		checkin: timestamp('checkin', { withTimezone: false }).notNull(),
		checkin_by: text('checkin_by').notNull(),
		pickup: timestamp('pickup', { withTimezone: false }),
		pickup_by: text('pickup_by'),
		perishable: boolean('perishable').notNull().default(false)
	},
	(table) => {
		return {
			packages_pkey: primaryKey({ name: 'packages_pkey', columns: [table.packageid] }),
			packages_checkin_by_fkey: foreignKey({
				name: 'packages_checkin_by_fkey',
				columns: [table.checkin_by],
				foreignColumns: [sds_users_all.username]
			}),
			packages_pickup_by_fkey: foreignKey({
				name: 'packages_pickup_by_fkey',
				columns: [table.pickup_by],
				foreignColumns: [sds_users_all.username]
			}),
			packages_recipient_fkey: foreignKey({
				name: 'packages_recipient_fkey',
				columns: [table.recipient],
				foreignColumns: [sds_users_all.username]
			})
		};
	}
);

export type User = InferSelectModel<typeof sds_users_all>;
export type Session = InferSelectModel<typeof sds_sessions>;
