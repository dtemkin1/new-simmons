import {
	pgTable,
	foreignKey,
	serial,
	timestamp,
	text,
	date,
	boolean,
	numeric,
	integer,
	varchar,
	smallint,
	unique,
	interval,
	check,
	index,
	primaryKey,
	pgView,
	doublePrecision,
	pgSequence
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const django_admin_log_id_seq = pgSequence('django_admin_log_id_seq', {
	startWith: '1',
	increment: '1',
	minValue: '1',
	maxValue: '9223372036854775807',
	cache: '1',
	cycle: false
});
export const django_content_type_id_seq = pgSequence('django_content_type_id_seq', {
	startWith: '1',
	increment: '1',
	minValue: '1',
	maxValue: '9223372036854775807',
	cache: '1',
	cycle: false
});

export const gov_agendas = pgTable(
	'gov_agendas',
	{
		agendaid: serial().primaryKey().notNull(),
		opendate: timestamp({ mode: 'date' }).defaultNow().notNull(),
		meetingtitle: text().default('House Meeting').notNull(),
		datesub: timestamp({ mode: 'date' }).defaultNow().notNull(),
		prefacetext: text(),
		meetingdate: date().notNull(),
		status: text().default('open').notNull(),
		usersub: text().notNull(),
		closingdate: date().notNull(),
		closedate: timestamp({ mode: 'date' }),
		hchairannounce: text(),
		committeereps: text(),
		presannounce: text()
	},
	(table) => {
		return {
			gov_agendas_usersub_fkey: foreignKey({
				columns: [table.usersub],
				foreignColumns: [sds_users_all.username],
				name: 'gov_agendas_usersub_fkey'
			})
		};
	}
);

export const lounges = pgTable(
	'lounges',
	{
		lounge: text().primaryKey().notNull(),
		description: text().notNull(),
		url: text().default('http://simmons.mit.edu/atria/'),
		contact: text().notNull(),
		contact2: text(),
		active: boolean().default(true).notNull(),
		allocation: numeric({ precision: 10, scale: 2 }),
		allocation2: numeric({ precision: 10, scale: 2 })
	},
	(table) => {
		return {
			lounges_contact2_fkey: foreignKey({
				columns: [table.contact2],
				foreignColumns: [sds_users_all.username],
				name: 'lounges_contact2_fkey'
			}),
			lounges_contact_fkey: foreignKey({
				columns: [table.contact],
				foreignColumns: [sds_users_all.username],
				name: 'lounges_contact_fkey'
			})
		};
	}
);

export const gov_proposals = pgTable(
	'gov_proposals',
	{
		propid: serial().primaryKey().notNull(),
		agendaid: integer(),
		agendaorder: integer(),
		type: text().notNull(),
		title: text().notNull(),
		author: text().notNull(),
		coauthors: text(),
		datesub: timestamp({ mode: 'date' }).defaultNow().notNull(),
		description: text().notNull(),
		specialnotes: text(),
		fundsrequestedamt: numeric({ precision: 10, scale: 2 }),
		fulltext: text().notNull(),
		record: text().default('<li>(Original)</li>').notNull(),
		userassign: text(),
		decision: text(),
		finalfunds: numeric({ precision: 10, scale: 2 }),
		finalfulltext: text().notNull(),
		deletedby: text(),
		deletereason: text()
	},
	(table) => {
		return {
			gov_proposals_agendaid_fkey: foreignKey({
				columns: [table.agendaid],
				foreignColumns: [gov_agendas.agendaid],
				name: 'gov_proposals_agendaid_fkey'
			}),
			gov_proposals_author_fkey: foreignKey({
				columns: [table.author],
				foreignColumns: [sds_users_all.username],
				name: 'gov_proposals_author_fkey'
			}),
			gov_proposals_deletedby_fkey: foreignKey({
				columns: [table.deletedby],
				foreignColumns: [sds_users_all.username],
				name: 'gov_proposals_deletedby_fkey'
			}),
			gov_proposals_userassign_fkey: foreignKey({
				columns: [table.userassign],
				foreignColumns: [sds_users_all.username],
				name: 'gov_proposals_userassign_fkey'
			})
		};
	}
);

export const advisors = pgTable('advisors', {
	officerid: integer()
		.default(sql`nextval('officers_officerid_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	username: text().notNull(),
	ordering: integer(),
	created: timestamp({ mode: 'date' }).defaultNow().notNull(),
	removed: timestamp({ mode: 'date' })
});

export const sds_users_all = pgTable('sds_users_all', {
	username: text().primaryKey().notNull(),
	password: text(),
	salt: text(),
	active: boolean().default(true).notNull(),
	hosts_allow: text().default('%').notNull(),
	immortal: boolean().default(false).notNull()
});

export const directory_copy = pgTable('directory_copy', {
	username: text(),
	firstname: text(),
	lastname: text(),
	room: text(),
	phone: text(),
	year: integer(),
	cellphone: text(),
	homepage: text(),
	home_city: text(),
	home_state: text(),
	home_country: text(),
	quote: text(),
	favorite_category: text(),
	favorite_value: text(),
	private: boolean(),
	type: text(),
	email: text(),
	lounge: text(),
	title: text(),
	loungevalue: integer(),
	showreminders: boolean(),
	guest_list_expiration: text()
});

export const django_admin_log = pgTable('django_admin_log', {
	id: integer()
		.default(sql`nextval('django_admin_log_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	action_time: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
	object_id: text(),
	object_repr: varchar({ length: 200 }).notNull(),
	action_flag: smallint().notNull(),
	change_message: text().notNull(),
	content_type_id: integer(),
	user_id: text().notNull()
});

export const django_content_type = pgTable('django_content_type', {
	id: integer()
		.default(sql`nextval('django_content_type_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	name: varchar({ length: 100 }).notNull(),
	app_label: varchar({ length: 100 }).notNull(),
	model: varchar({ length: 100 }).notNull()
});

export const officers = pgTable(
	'officers',
	{
		officerid: serial().primaryKey().notNull(),
		username: text().notNull(),
		position: text().notNull(),
		ordering: integer(),
		created: timestamp({ mode: 'date' }).defaultNow().notNull(),
		removed: timestamp({ mode: 'date' }),
		position_text: text()
	},
	(table) => {
		return {
			officers_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'officers_username_fkey'
			})
		};
	}
);

export const gov_fin_subaccounts = pgTable(
	'gov_fin_subaccounts',
	{
		subid: serial().primaryKey().notNull(),
		acctid: integer().notNull(),
		name: text().notNull(),
		created: timestamp({ mode: 'date' }).defaultNow().notNull(),
		allocationamt: numeric({ precision: 10, scale: 2 }).notNull(),
		isallocation: boolean().default(true).notNull(),
		shortname: text().notNull(),
		byuser: text().notNull(),
		closedby: text(),
		closedat: timestamp({ mode: 'date' })
	},
	(table) => {
		return {
			gov_fin_subaccounts_acctid_fkey: foreignKey({
				columns: [table.acctid],
				foreignColumns: [gov_fin_accounts.acctid],
				name: 'gov_fin_subaccounts_acctid_fkey'
			}),
			gov_fin_subaccounts_byuser_fkey: foreignKey({
				columns: [table.byuser],
				foreignColumns: [sds_users_all.username],
				name: 'gov_fin_subaccounts_byuser_fkey'
			}),
			gov_fin_subaccounts_closedby_fkey: foreignKey({
				columns: [table.closedby],
				foreignColumns: [sds_users_all.username],
				name: 'gov_fin_subaccounts_closedby_fkey'
			})
		};
	}
);

export const guest_list = pgTable(
	'guest_list',
	{
		guestlistid: serial().primaryKey().notNull(),
		username: text().notNull(),
		guest: text().notNull(),
		date_added: timestamp({ mode: 'date' }).notNull(),
		date_invalid: timestamp({ mode: 'date' }).notNull(),
		current: boolean().default(true).notNull(),
		onetime: boolean().default(false).notNull()
	},
	(table) => {
		return {
			guest_list_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'guest_list_username_fkey'
			})
		};
	}
);

export const handicapped_rooms = pgTable('handicapped_rooms', {
	room: text().notNull(),
	type: text().notNull(),
	size: integer(),
	numbersharedwith: integer(),
	roomnumberonfloorplan: text()
});

export const lounge_expenses = pgTable(
	'lounge_expenses',
	{
		expenseid: serial().primaryKey().notNull(),
		loungeid: text().notNull(),
		usersub: text().notNull(),
		datesubmitted: timestamp({ mode: 'date' }),
		datespent: text().notNull(),
		numparticipated: integer(),
		amountspent: numeric({ precision: 10, scale: 2 }),
		description: text().notNull(),
		termsold: integer().default(0).notNull(),
		finished: boolean().default(false).notNull(),
		datepropsubmitted: timestamp({ mode: 'date' }).notNull(),
		canceled: boolean().default(false).notNull(),
		valid: boolean().default(false).notNull()
	},
	(table) => {
		return {
			lounge_expenses_loungeid_fkey: foreignKey({
				columns: [table.loungeid],
				foreignColumns: [lounges.lounge],
				name: 'lounge_expenses_loungeid_fkey'
			}),
			lounge_expenses_usersub_fkey: foreignKey({
				columns: [table.usersub],
				foreignColumns: [sds_users_all.username],
				name: 'lounge_expenses_usersub_fkey'
			})
		};
	}
);

export const mailman_lists = pgTable(
	'mailman_lists',
	{
		listname: text().primaryKey().notNull(),
		description: text().notNull(),
		subject_prefix: text().notNull(),
		groupname: text(),
		private: boolean().default(true).notNull(),
		moderated: boolean().default(false).notNull(),
		password: text().notNull(),
		creator: text().notNull(),
		mandatory: boolean().default(false).notNull(),
		ownergroup: text(),
		deleted: boolean().default(false).notNull()
	},
	(table) => {
		return {
			mailman_lists_creator_fkey: foreignKey({
				columns: [table.creator],
				foreignColumns: [sds_users_all.username],
				name: 'mailman_lists_creator_fkey'
			}),
			mailman_lists_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'mailman_lists_groupname_fkey'
			}),
			mailman_lists_ownergroup_fkey: foreignKey({
				columns: [table.ownergroup],
				foreignColumns: [sds_groups.groupname],
				name: 'mailman_lists_ownergroup_fkey'
			})
		};
	}
);

export const mailman_aliases = pgTable(
	'mailman_aliases',
	{
		listname: text().notNull(),
		alias: text().primaryKey().notNull()
	},
	(table) => {
		return {
			mailman_aliases_listname_fkey: foreignKey({
				columns: [table.listname],
				foreignColumns: [mailman_lists.listname],
				name: 'mailman_aliases_listname_fkey'
			})
		};
	}
);

export const mailserver = pgTable(
	'mailserver',
	{
		username: text().primaryKey().notNull(),
		poserver: text().notNull(),
		time: timestamp({ mode: 'date' }).defaultNow().notNull()
	},
	(table) => {
		return {
			mailserver_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'mailserver_username_fkey'
			})
		};
	}
);

export const medlinks = pgTable('medlinks', {
	officerid: integer()
		.default(sql`nextval('officers_officerid_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	username: text().notNull(),
	ordering: integer(),
	created: timestamp({ mode: 'date' }).defaultNow().notNull(),
	removed: timestamp({ mode: 'date' })
});

export const lotteries = pgTable(
	'lotteries',
	{
		lotteryid: serial().primaryKey().notNull(),
		lotteryname: text().notNull(),
		description: text().notNull(),
		groupname: text().notNull(),
		owner: text().notNull(),
		viewable: boolean().notNull(),
		open_date: timestamp({ mode: 'date' }),
		close_date: timestamp({ mode: 'date' }),
		approved: boolean().default(false).notNull(),
		deleted: boolean().default(false).notNull()
	},
	(table) => {
		return {
			lotteries_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'lotteries_groupname_fkey'
			}),
			lotteries_owner_fkey: foreignKey({
				columns: [table.owner],
				foreignColumns: [sds_users_all.username],
				name: 'lotteries_owner_fkey'
			})
		};
	}
);

export const lottery_entries = pgTable(
	'lottery_entries',
	{
		lotteryid: integer(),
		username: text(),
		date_entered: timestamp({ mode: 'date' }).defaultNow().notNull(),
		rank: integer()
	},
	(table) => {
		return {
			lottery_entries_lotteryid_fkey: foreignKey({
				columns: [table.lotteryid],
				foreignColumns: [lotteries.lotteryid],
				name: 'lottery_entries_lotteryid_fkey'
			}),
			lottery_entries_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'lottery_entries_username_fkey'
			})
		};
	}
);

export const movie_types = pgTable(
	'movie_types',
	{
		typeid: serial().primaryKey().notNull(),
		typename: text().notNull(),
		loan_duration: interval().notNull(),
		active: boolean().default(true).notNull()
	},
	(table) => {
		return {
			movie_types_typename_key: unique('movie_types_typename_key').on(table.typename)
		};
	}
);

export const movie_loans = pgTable(
	'movie_loans',
	{
		loanid: serial().primaryKey().notNull(),
		instanceid: integer().notNull(),
		movieid_ref: integer().notNull(),
		username: text().notNull(),
		checkout: timestamp({ mode: 'date' }).notNull(),
		checkout_by: text().notNull(),
		checkin: timestamp({ mode: 'date' }),
		checkin_by: text()
	},
	(table) => {
		return {
			movie_loans_checkin_by_fkey: foreignKey({
				columns: [table.checkin_by],
				foreignColumns: [sds_users_all.username],
				name: 'movie_loans_checkin_by_fkey'
			}),
			movie_loans_checkout_by_fkey: foreignKey({
				columns: [table.checkout_by],
				foreignColumns: [sds_users_all.username],
				name: 'movie_loans_checkout_by_fkey'
			}),
			movie_loans_instanceid_fkey: foreignKey({
				columns: [table.instanceid],
				foreignColumns: [movie_instances.instanceid],
				name: 'movie_loans_instanceid_fkey'
			}),
			movie_loans_movieid_ref_fkey: foreignKey({
				columns: [table.movieid_ref],
				foreignColumns: [movie_items.movieid],
				name: 'movie_loans_movieid_ref_fkey'
			}),
			movie_loans_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'movie_loans_username_fkey'
			})
		};
	}
);

export const packages = pgTable(
	'packages',
	{
		packageid: serial().primaryKey().notNull(),
		recipient: text().notNull(),
		bin: text().notNull(),
		checkin: timestamp({ mode: 'date' }).notNull(),
		checkin_by: text().notNull(),
		pickup: timestamp({ mode: 'date' }),
		pickup_by: text(),
		perishable: boolean().default(false).notNull()
	},
	(table) => {
		return {
			packages_checkin_by_fkey: foreignKey({
				columns: [table.checkin_by],
				foreignColumns: [sds_users_all.username],
				name: 'packages_checkin_by_fkey'
			}),
			packages_pickup_by_fkey: foreignKey({
				columns: [table.pickup_by],
				foreignColumns: [sds_users_all.username],
				name: 'packages_pickup_by_fkey'
			}),
			packages_recipient_fkey: foreignKey({
				columns: [table.recipient],
				foreignColumns: [sds_users_all.username],
				name: 'packages_recipient_fkey'
			})
		};
	}
);

export const options = pgTable('options', {
	name: text().primaryKey().notNull(),
	documentation: text(),
	value: integer(),
	value_string: text()
});

export const packages_checkin = pgTable(
	'packages_checkin',
	{
		checkinid: serial().primaryKey().notNull(),
		recipient: text().notNull(),
		bin: text().notNull(),
		pkg_count: integer().notNull(),
		deskworker: text().notNull(),
		entry_time: timestamp({ mode: 'date' }).notNull(),
		perishable: boolean().default(true).notNull()
	},
	(table) => {
		return {
			packages_checkin_deskworker_fkey: foreignKey({
				columns: [table.deskworker],
				foreignColumns: [sds_users_all.username],
				name: 'packages_checkin_deskworker_fkey'
			}),
			packages_checkin_recipient_fkey: foreignKey({
				columns: [table.recipient],
				foreignColumns: [sds_users_all.username],
				name: 'packages_checkin_recipient_fkey'
			})
		};
	}
);

export const movie_items = pgTable(
	'movie_items',
	{
		movieid: serial().primaryKey().notNull(),
		typeid: integer().notNull(),
		title: text().notNull(),
		num_disks: integer(),
		link: text(),
		item_loan_duration: interval()
	},
	(table) => {
		return {
			movie_items_typeid_fkey: foreignKey({
				columns: [table.typeid],
				foreignColumns: [movie_types.typeid],
				name: 'movie_items_typeid_fkey'
			})
		};
	}
);

export const polls = pgTable(
	'polls',
	{
		pollid: serial().primaryKey().notNull(),
		pollname: text().notNull(),
		description: text().notNull(),
		type: text().notNull(),
		groupname: text().notNull(),
		owner: text().notNull(),
		viewable: boolean().notNull(),
		final: boolean(),
		open_date: timestamp({ mode: 'date' }),
		close_date: timestamp({ mode: 'date' }),
		approved: boolean().default(false).notNull(),
		deleted: boolean().default(false).notNull()
	},
	(table) => {
		return {
			polls_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'polls_groupname_fkey'
			}),
			polls_owner_fkey: foreignKey({
				columns: [table.owner],
				foreignColumns: [sds_users_all.username],
				name: 'polls_owner_fkey'
			})
		};
	}
);

export const rooming = pgTable(
	'rooming',
	{
		lottery_pick: integer().primaryKey().notNull(),
		adjusted_pick: integer(),
		block_num: integer(),
		username: text().notNull(),
		room: text()
	},
	(table) => {
		return {
			rooming_room_fkey: foreignKey({
				columns: [table.room],
				foreignColumns: [rooms.room],
				name: 'rooming_room_fkey'
			}),
			rooming_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'rooming_username_fkey'
			}),
			rooming_username_key: unique('rooming_username_key').on(table.username),
			rooming_block_num_check: check('rooming_block_num_check', sql`block_num > 0`)
		};
	}
);

export const rooms_copy = pgTable('rooms_copy', {
	room: text(),
	floor: integer(),
	type: text(),
	size: integer(),
	phone1: text(),
	phone2: text(),
	grt: text(),
	frosh: boolean(),
	handicapped: boolean()
});

export const sds_group_membership_cache = pgTable(
	'sds_group_membership_cache',
	{
		username: text().notNull(),
		groupname: text().notNull(),
		hosts_allow: text().default('18.96.%').notNull()
	},
	(table) => {
		return {
			username_groupname_idx: index('username_groupname_index').using(
				'btree',
				table.username.asc().nullsLast(),
				table.groupname.asc().nullsLast()
			),
			sds_group_membership_cache_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_group_membership_cache_groupname_fkey'
			}),
			sds_group_membership_cache_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'sds_group_membership_cache_username_fkey'
			})
		};
	}
);

export const sds_automated_groups_copy = pgTable('sds_automated_groups_copy', {
	groupname: text(),
	sql: text(),
	hosts_allow: text()
});

export const sds_automated_groups = pgTable(
	'sds_automated_groups',
	{
		groupname: text().primaryKey().notNull(),
		sql: text().notNull(),
		hosts_allow: text().default('%').notNull()
	},
	(table) => {
		return {
			sds_automated_groups_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_automated_groups_groupname_fkey'
			})
		};
	}
);

export const sds_sessions = pgTable(
	'sds_sessions',
	{
		sid: text().primaryKey().notNull(),
		username: text().notNull(),
		expires: timestamp({ mode: 'date' }),
		remote_addr: text().notNull(),
		data: text()
	},
	(table) => {
		return {
			sds_sessions_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'sds_sessions_username_fkey'
			})
		};
	}
);

export const wiki_permissions_sds = pgTable(
	'wiki_permissions_sds',
	{
		wiki_prefix: text().primaryKey().notNull(),
		read_groupname: text(),
		write_groupname: text(),
		admin_groupname: text()
	},
	(table) => {
		return {
			wiki_permissions_sds_admin_groupname_fkey: foreignKey({
				columns: [table.admin_groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'wiki_permissions_sds_admin_groupname_fkey'
			}),
			wiki_permissions_sds_read_groupname_fkey: foreignKey({
				columns: [table.read_groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'wiki_permissions_sds_read_groupname_fkey'
			}),
			wiki_permissions_sds_write_groupname_fkey: foreignKey({
				columns: [table.write_groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'wiki_permissions_sds_write_groupname_fkey'
			})
		};
	}
);

export const sds_groups = pgTable('sds_groups', {
	groupname: text().primaryKey().notNull(),
	contact: text(),
	adhoc: boolean().default(false).notNull(),
	description: text(),
	active: boolean().default(true).notNull()
});

export const user_types_copy = pgTable('user_types_copy', {
	type: text(),
	description: text(),
	active: boolean()
});

export const user_types = pgTable('user_types', {
	type: text().primaryKey().notNull(),
	description: text(),
	active: boolean().default(true).notNull()
});

export const directory = pgTable(
	'directory',
	{
		username: text().primaryKey().notNull(),
		firstname: text().notNull(),
		lastname: text().notNull(),
		room: text(),
		phone: text(),
		year: integer(),
		cellphone: text(),
		homepage: text(),
		home_city: text(),
		home_state: text(),
		home_country: text(),
		quote: text(),
		favorite_category: text(),
		favorite_value: text(),
		private: boolean().default(false).notNull(),
		type: text().notNull(),
		email: text().notNull(),
		lounge: text(),
		title: text(),
		loungevalue: integer(),
		showreminders: boolean().default(true).notNull(),
		guest_list_expiration: text()
	},
	(table) => {
		return {
			directory_lounge_fkey: foreignKey({
				columns: [table.lounge],
				foreignColumns: [lounges.lounge],
				name: 'directory_lounge_fkey'
			}),
			directory_room_fkey: foreignKey({
				columns: [table.room],
				foreignColumns: [rooms.room],
				name: 'directory_room_fkey'
			}),
			directory_type_fkey: foreignKey({
				columns: [table.type],
				foreignColumns: [user_types.type],
				name: 'directory_type_fkey'
			}),
			directory_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'directory_username_fkey'
			})
		};
	}
);

export const rooms = pgTable('rooms', {
	room: text().primaryKey().notNull(),
	floor: integer(),
	type: text().notNull(),
	size: integer(),
	phone1: text(),
	phone2: text(),
	gra: text(),
	frosh: boolean(),
	handicapped: boolean()
});

export const gov_fin_accounts = pgTable('gov_fin_accounts', {
	acctid: serial().primaryKey().notNull(),
	name: text().notNull(),
	shortname: text().notNull()
});

export const gov_fin_ledger = pgTable(
	'gov_fin_ledger',
	{
		tid: serial().primaryKey().notNull(),
		subid: integer().notNull(),
		name: text().notNull(),
		submitted: timestamp({ mode: 'date' }).defaultNow().notNull(),
		byuser: text().notNull(),
		acctid: integer().notNull(),
		amount: numeric({ precision: 10, scale: 2 }).notNull(),
		voidedby: text()
	},
	(table) => {
		return {
			gov_fin_ledger_acctid_fkey: foreignKey({
				columns: [table.acctid],
				foreignColumns: [gov_fin_accounts.acctid],
				name: 'gov_fin_ledger_acctid_fkey'
			}),
			gov_fin_ledger_byuser_fkey: foreignKey({
				columns: [table.byuser],
				foreignColumns: [sds_users_all.username],
				name: 'gov_fin_ledger_byuser_fkey'
			}),
			gov_fin_ledger_subid_fkey: foreignKey({
				columns: [table.subid],
				foreignColumns: [gov_fin_subaccounts.subid],
				name: 'gov_fin_ledger_subid_fkey'
			}),
			gov_fin_ledger_voidedby_fkey: foreignKey({
				columns: [table.voidedby],
				foreignColumns: [sds_users_all.username],
				name: 'gov_fin_ledger_voidedby_fkey'
			})
		};
	}
);

export const movie_instances = pgTable(
	'movie_instances',
	{
		instanceid: serial().primaryKey().notNull(),
		movieid: integer(),
		checked_out: boolean().default(false).notNull(),
		hidden: boolean().default(false).notNull(),
		deleted: boolean().default(false).notNull(),
		box_number: text()
	},
	(table) => {
		return {
			movie_instances_movieid_fkey: foreignKey({
				columns: [table.movieid],
				foreignColumns: [movie_items.movieid],
				name: 'movie_instances_movieid_fkey'
			})
		};
	}
);

export const mailman_optout = pgTable(
	'mailman_optout',
	{
		username: text().notNull(),
		listname: text().notNull()
	},
	(table) => {
		return {
			mailman_optout_listname_fkey: foreignKey({
				columns: [table.listname],
				foreignColumns: [mailman_lists.listname],
				name: 'mailman_optout_listname_fkey'
			}),
			mailman_optout_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'mailman_optout_username_fkey'
			}),
			mailman_optout_pkey: primaryKey({
				columns: [table.username, table.listname],
				name: 'mailman_optout_pkey'
			})
		};
	}
);

export const mailman_superlists = pgTable(
	'mailman_superlists',
	{
		listname: text().notNull(),
		superlist: text().notNull()
	},
	(table) => {
		return {
			mailman_superlists_pkey: primaryKey({
				columns: [table.listname, table.superlist],
				name: 'mailman_superlists_pkey'
			})
		};
	}
);

export const sds_groups_adhoc_locations = pgTable(
	'sds_groups_adhoc_locations',
	{
		table: text().notNull(),
		group_field: text().notNull()
	},
	(table) => {
		return {
			sds_groups_adhoc_locations_pkey: primaryKey({
				columns: [table.table, table.group_field],
				name: 'sds_groups_adhoc_locations_pkey'
			})
		};
	}
);

export const ballots = pgTable(
	'ballots',
	{
		pollid: integer().notNull(),
		username: text().notNull(),
		date_cast: timestamp({ mode: 'date' }).notNull()
	},
	(table) => {
		return {
			ballots_pollid_fkey: foreignKey({
				columns: [table.pollid],
				foreignColumns: [polls.pollid],
				name: 'ballots_pollid_fkey'
			}),
			ballots_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'ballots_username_fkey'
			}),
			ballots_pkey: primaryKey({ columns: [table.pollid, table.username], name: 'ballots_pkey' })
		};
	}
);

export const printer_use = pgTable(
	'printer_use',
	{
		username: text().notNull(),
		date: date().notNull(),
		pages: integer().notNull()
	},
	(table) => {
		return {
			printer_use_pkey: primaryKey({
				columns: [table.username, table.date],
				name: 'printer_use_pkey'
			})
		};
	}
);

export const sds_groups_in_groups = pgTable(
	'sds_groups_in_groups',
	{
		supergroup: text().notNull(),
		subgroup: text().notNull(),
		hosts_allow: text().default('%').notNull()
	},
	(table) => {
		return {
			sds_groups_in_groups_subgroup_fkey: foreignKey({
				columns: [table.subgroup],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_groups_in_groups_subgroup_fkey'
			}),
			sds_groups_in_groups_supergroup_fkey: foreignKey({
				columns: [table.supergroup],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_groups_in_groups_supergroup_fkey'
			}),
			sds_groups_in_groups_pkey: primaryKey({
				columns: [table.supergroup, table.subgroup],
				name: 'sds_groups_in_groups_pkey'
			})
		};
	}
);

export const sds_users_in_groups = pgTable(
	'sds_users_in_groups',
	{
		username: text().notNull(),
		groupname: text().notNull(),
		hosts_allow: text().default('%').notNull()
	},
	(table) => {
		return {
			sds_users_in_groups_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_users_in_groups_groupname_fkey'
			}),
			sds_users_in_groups_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'sds_users_in_groups_username_fkey'
			}),
			sds_users_in_groups_pkey: primaryKey({
				columns: [table.username, table.groupname],
				name: 'sds_users_in_groups_pkey'
			})
		};
	}
);

export const wiki_permissions_wikiuser = pgTable(
	'wiki_permissions_wikiuser',
	{
		wiki_prefix: text().notNull(),
		wiki_username: text().notNull(),
		access: text().notNull()
	},
	(table) => {
		return {
			wiki_permissions_wikiuser_wiki_prefix_fkey: foreignKey({
				columns: [table.wiki_prefix],
				foreignColumns: [wiki_permissions_sds.wiki_prefix],
				name: 'wiki_permissions_wikiuser_wiki_prefix_fkey'
			}),
			wiki_permissions_wikiuser_pkey: primaryKey({
				columns: [table.wiki_prefix, table.wiki_username],
				name: 'wiki_permissions_wikiuser_pkey'
			})
		};
	}
);

export const lounge_expense_actions = pgTable(
	'lounge_expense_actions',
	{
		expenseid: integer().notNull(),
		username: text().notNull(),
		action: integer().notNull()
	},
	(table) => {
		return {
			lounge_expense_actions_expenseid_fkey: foreignKey({
				columns: [table.expenseid],
				foreignColumns: [lounge_expenses.expenseid],
				name: 'lounge_expense_actions_expenseid_fkey'
			}),
			lounge_expense_actions_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'lounge_expense_actions_username_fkey'
			}),
			lounge_expense_actions_pkey: primaryKey({
				columns: [table.expenseid, table.username],
				name: 'lounge_expense_actions_pkey'
			})
		};
	}
);

export const old_room_assignments = pgTable(
	'old_room_assignments',
	{
		username: text().notNull(),
		room: text().notNull(),
		movein: timestamp({ mode: 'date' }).defaultNow().notNull(),
		moveout: timestamp({ mode: 'date' })
	},
	(table) => {
		return {
			room_idx: index('room_index').using('btree', table.room.asc().nullsLast()),
			old_room_assignments_room_fkey: foreignKey({
				columns: [table.room],
				foreignColumns: [rooms.room],
				name: 'old_room_assignments_room_fkey'
			}),
			old_room_assignments_username_fkey: foreignKey({
				columns: [table.username],
				foreignColumns: [sds_users_all.username],
				name: 'old_room_assignments_username_fkey'
			}),
			old_room_assignments_pkey: primaryKey({
				columns: [table.username, table.movein],
				name: 'old_room_assignments_pkey'
			})
		};
	}
);

export const poll_choices = pgTable(
	'poll_choices',
	{
		pollid: integer().notNull(),
		ordering: integer().notNull(),
		description: text().notNull(),
		votes: integer().default(0).notNull()
	},
	(table) => {
		return {
			poll_choices_pollid_fkey: foreignKey({
				columns: [table.pollid],
				foreignColumns: [polls.pollid],
				name: 'poll_choices_pollid_fkey'
			}),
			poll_choices_pkey: primaryKey({
				columns: [table.pollid, table.ordering],
				name: 'poll_choices_pkey'
			})
		};
	}
);

export const sds_group_notifications = pgTable(
	'sds_group_notifications',
	{
		groupname: text().notNull(),
		changetype: text().notNull(),
		recipient_groupname: text().notNull(),
		mail_subject: text().notNull(),
		mail_message: text().notNull()
	},
	(table) => {
		return {
			sds_group_notifications_groupname_fkey: foreignKey({
				columns: [table.groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_group_notifications_groupname_fkey'
			}),
			sds_group_notifications_recipient_groupname_fkey: foreignKey({
				columns: [table.recipient_groupname],
				foreignColumns: [sds_groups.groupname],
				name: 'sds_group_notifications_recipient_groupname_fkey'
			}),
			sds_group_notifications_pkey: primaryKey({
				columns: [table.groupname, table.changetype, table.recipient_groupname],
				name: 'sds_group_notifications_pkey'
			})
		};
	}
);
export const sds_users = pgView('sds_users', {
	username: text(),
	password: text(),
	salt: text(),
	active: boolean(),
	hosts_allow: text(),
	immortal: boolean()
}).as(
	sql`SELECT username, password, salt, active, hosts_allow, immortal FROM sds_users_all WHERE active`
);

export const active_directory = pgView('active_directory', {
	username: text(),
	firstname: text(),
	lastname: text(),
	room: text(),
	phone: text(),
	year: integer(),
	cellphone: text(),
	homepage: text(),
	home_city: text(),
	home_state: text(),
	home_country: text(),
	quote: text(),
	favorite_category: text(),
	favorite_value: text(),
	private: boolean(),
	type: text(),
	email: text(),
	lounge: text(),
	title: text(),
	loungevalue: integer(),
	showreminders: boolean(),
	guest_list_expiration: text()
}).as(
	sql`SELECT username, firstname, lastname, room, phone, year, cellphone, homepage, home_city, home_state, home_country, quote, favorite_category, favorite_value, private, type, email, lounge, title, loungevalue, showreminders, guest_list_expiration FROM directory WHERE (username IN ( SELECT sds_users.username FROM sds_users))`
);

export const active_lounges = pgView('active_lounges', {
	lounge: text(),
	description: text(),
	url: text(),
	contact: text(),
	contact2: text(),
	active: boolean(),
	allocation: numeric({ precision: 10, scale: 2 }),
	allocation2: numeric({ precision: 10, scale: 2 })
}).as(
	sql`SELECT lounge, description, url, contact, contact2, active, allocation, allocation2 FROM lounges WHERE active`
);

export const active_lounges_2 = pgView('active_lounges_2', {
	lounge: text(),
	description: text(),
	url: text(),
	contact: text(),
	contact2: text(),
	active: boolean(),
	allocation: numeric({ precision: 10, scale: 2 })
}).as(
	sql`SELECT lounge, description, url, contact, contact2, active, allocation FROM lounges WHERE active`
);

export const gov_active_proposals = pgView('gov_active_proposals', {
	propid: integer(),
	agendaid: integer(),
	agendaorder: integer(),
	type: text(),
	title: text(),
	author: text(),
	coauthors: text(),
	datesub: timestamp({ mode: 'date' }),
	description: text(),
	specialnotes: text(),
	fundsrequestedamt: numeric({ precision: 10, scale: 2 }),
	fulltext: text(),
	record: text(),
	userassign: text(),
	decision: text(),
	finalfunds: numeric({ precision: 10, scale: 2 }),
	finalfulltext: text(),
	deletedby: text(),
	deletereason: text()
}).as(
	sql`SELECT propid, agendaid, agendaorder, type, title, author, coauthors, datesub, description, specialnotes, fundsrequestedamt, fulltext, record, userassign, decision, finalfunds, finalfulltext, deletedby, deletereason FROM gov_proposals WHERE deletedby IS NULL`
);

export const gov_unassigned_proposals = pgView('gov_unassigned_proposals', {
	propid: integer(),
	agendaid: integer(),
	agendaorder: integer(),
	type: text(),
	title: text(),
	author: text(),
	coauthors: text(),
	datesub: timestamp({ mode: 'date' }),
	description: text(),
	specialnotes: text(),
	fundsrequestedamt: numeric({ precision: 10, scale: 2 }),
	fulltext: text(),
	record: text(),
	userassign: text(),
	decision: text(),
	finalfunds: numeric({ precision: 10, scale: 2 }),
	finalfulltext: text(),
	deletedby: text(),
	deletereason: text()
}).as(
	sql`SELECT propid, agendaid, agendaorder, type, title, author, coauthors, datesub, description, specialnotes, fundsrequestedamt, fulltext, record, userassign, decision, finalfunds, finalfulltext, deletedby, deletereason FROM gov_proposals WHERE agendaid IS NULL AND deletedby IS NULL`
);

export const lounge_summary_report = pgView('lounge_summary_report', {
	loungeid: text(),
	description: text(),
	membership: integer(),
	allocation: numeric({ precision: 10, scale: 2 }),
	allocation2: numeric({ precision: 10, scale: 2 }),
	predalloc: integer(),
	avgparts: doublePrecision(),
	totalspent: numeric({ precision: 10, scale: 2 }),
	numevents: integer()
}).as(
	sql`SELECT lounges.lounge AS loungeid, lounges.description, COALESCE(memberinfo.membership, 0::bigint)::integer AS membership, lounges.allocation, lounges.allocation2, CASE WHEN memberinfo.valuemembers < 5 OR memberinfo.valuemembers IS NULL THEN 0::bigint WHEN memberinfo.predalloc > 1000 THEN 1000::bigint ELSE memberinfo.predalloc END::integer AS predalloc, expenseinfo.avgparts, COALESCE(expenseinfo.totalspent, 0::numeric)::numeric(10,2) AS totalspent, COALESCE(expenseinfo.numevents, 0::bigint)::integer AS numevents FROM lounges LEFT JOIN ( SELECT directory.lounge, count(*) AS membership, count(directory.loungevalue > 0 OR NULL::boolean) AS valuemembers, sum(directory.loungevalue) AS predalloc FROM directory WHERE directory.lounge IS NOT NULL GROUP BY directory.lounge) memberinfo ON lounges.lounge = memberinfo.lounge LEFT JOIN ( SELECT lounge_expenses.loungeid, sum(lounge_expenses.numparticipated)::double precision / count(lounge_expenses.valid)::double precision AS avgparts, sum(lounge_expenses.amountspent) AS totalspent, count(lounge_expenses.valid) AS numevents FROM lounge_expenses WHERE lounge_expenses.valid AND NOT lounge_expenses.canceled AND lounge_expenses.termsold = 0 GROUP BY lounge_expenses.loungeid) expenseinfo ON lounges.lounge = expenseinfo.loungeid WHERE lounges.active`
);

export const lounge_summary_report_2 = pgView('lounge_summary_report_2', {
	loungeid: text(),
	description: text(),
	membership: integer(),
	allocation: numeric({ precision: 10, scale: 2 }),
	predalloc: integer(),
	avgparts: doublePrecision(),
	totalspent: numeric({ precision: 10, scale: 2 }),
	numevents: integer()
}).as(
	sql`SELECT lounges.lounge AS loungeid, lounges.description, COALESCE(memberinfo.membership, 0::bigint)::integer AS membership, lounges.allocation, CASE WHEN memberinfo.valuemembers < 10 OR memberinfo.valuemembers IS NULL THEN 0::bigint WHEN memberinfo.predalloc > 1000 THEN 1000::bigint ELSE memberinfo.predalloc END::integer AS predalloc, expenseinfo.avgparts, COALESCE(expenseinfo.totalspent, 0::numeric)::numeric(10,2) AS totalspent, COALESCE(expenseinfo.numevents, 0::bigint)::integer AS numevents FROM lounges LEFT JOIN ( SELECT directory.lounge, count(*) AS membership, count(directory.loungevalue > 0 OR NULL::boolean) AS valuemembers, sum(directory.loungevalue) AS predalloc FROM directory WHERE directory.lounge IS NOT NULL GROUP BY directory.lounge) memberinfo ON lounges.lounge = memberinfo.lounge LEFT JOIN ( SELECT lounge_expenses.loungeid, sum(lounge_expenses.numparticipated)::double precision / count(lounge_expenses.valid)::double precision AS avgparts, sum(lounge_expenses.amountspent) AS totalspent, count(lounge_expenses.valid) AS numevents FROM lounge_expenses WHERE lounge_expenses.valid AND NOT lounge_expenses.canceled AND lounge_expenses.termsold = 0 GROUP BY lounge_expenses.loungeid) expenseinfo ON lounges.lounge = expenseinfo.loungeid WHERE lounges.active`
);

export const public_active_directory = pgView('public_active_directory', {
	username: text(),
	firstname: text(),
	lastname: text(),
	room: text(),
	phone: text(),
	year: integer(),
	cellphone: text(),
	homepage: text(),
	home_city: text(),
	home_state: text(),
	home_country: text(),
	quote: text(),
	favorite_category: text(),
	favorite_value: text(),
	private: boolean(),
	type: text(),
	email: text(),
	lounge: text(),
	title: text(),
	loungevalue: integer(),
	showreminders: boolean(),
	guest_list_expiration: text()
}).as(
	sql`SELECT username, firstname, lastname, room, phone, year, cellphone, homepage, home_city, home_state, home_country, quote, favorite_category, favorite_value, private, type, email, lounge, title, loungevalue, showreminders, guest_list_expiration FROM directory WHERE (username IN ( SELECT sds_users.username FROM sds_users)) AND NOT private`
);

export const sds_groups_public = pgView('sds_groups_public', {
	groupname: text(),
	contact: text(),
	adhoc: boolean(),
	description: text(),
	active: boolean()
}).as(
	sql`SELECT groupname, contact, adhoc, description, active FROM sds_groups WHERE NOT adhoc AND active`
);
