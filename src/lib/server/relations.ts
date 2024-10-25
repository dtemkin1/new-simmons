import { relations } from 'drizzle-orm/relations';
import {
	sds_users_all,
	gov_agendas,
	lounges,
	gov_proposals,
	officers,
	gov_fin_accounts,
	gov_fin_subaccounts,
	guest_list,
	lounge_expenses,
	mailman_lists,
	sds_groups,
	mailman_aliases,
	mailserver,
	lotteries,
	lottery_entries,
	movie_loans,
	movie_instances,
	movie_items,
	packages,
	packages_checkin,
	movie_types,
	polls,
	rooms,
	rooming,
	sds_group_membership_cache,
	sds_automated_groups,
	sds_sessions,
	wiki_permissions_sds,
	directory,
	user_types,
	gov_fin_ledger,
	mailman_optout,
	ballots,
	sds_groups_in_groups,
	sds_users_in_groups,
	wiki_permissions_wikiuser,
	lounge_expense_actions,
	old_room_assignments,
	poll_choices,
	sds_group_notifications
} from './schema';

export const gov_agendasRelations = relations(gov_agendas, ({ one, many }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [gov_agendas.usersub],
		references: [sds_users_all.username]
	}),
	gov_proposals: many(gov_proposals)
}));

export const sds_users_allRelations = relations(sds_users_all, ({ many }) => ({
	gov_agendas: many(gov_agendas),
	lounges_contact2: many(lounges, {
		relationName: 'lounges_contact2_sds_users_all_username'
	}),
	lounges_contact: many(lounges, {
		relationName: 'lounges_contact_sds_users_all_username'
	}),
	gov_proposals_author: many(gov_proposals, {
		relationName: 'gov_proposals_author_sds_users_all_username'
	}),
	gov_proposals_deletedby: many(gov_proposals, {
		relationName: 'gov_proposals_deletedby_sds_users_all_username'
	}),
	gov_proposals_userassign: many(gov_proposals, {
		relationName: 'gov_proposals_userassign_sds_users_all_username'
	}),
	officers: many(officers),
	gov_fin_subaccounts_byuser: many(gov_fin_subaccounts, {
		relationName: 'gov_fin_subaccounts_byuser_sds_users_all_username'
	}),
	gov_fin_subaccounts_closedby: many(gov_fin_subaccounts, {
		relationName: 'gov_fin_subaccounts_closedby_sds_users_all_username'
	}),
	guest_lists: many(guest_list),
	lounge_expenses: many(lounge_expenses),
	mailman_lists: many(mailman_lists),
	mailservers: many(mailserver),
	lotteries: many(lotteries),
	lottery_entries: many(lottery_entries),
	movie_loans_checkin_by: many(movie_loans, {
		relationName: 'movie_loans_checkin_by_sds_users_all_username'
	}),
	movie_loans_checkout_by: many(movie_loans, {
		relationName: 'movie_loans_checkout_by_sds_users_all_username'
	}),
	movie_loans_username: many(movie_loans, {
		relationName: 'movie_loans_username_sds_users_all_username'
	}),
	packages_checkin_by: many(packages, {
		relationName: 'packages_checkin_by_sds_users_all_username'
	}),
	packages_pickup_by: many(packages, {
		relationName: 'packages_pickup_by_sds_users_all_username'
	}),
	packages_recipient: many(packages, {
		relationName: 'packages_recipient_sds_users_all_username'
	}),
	packages_checkins_deskworker: many(packages_checkin, {
		relationName: 'packages_checkin_deskworker_sds_users_all_username'
	}),
	packages_checkins_recipient: many(packages_checkin, {
		relationName: 'packages_checkin_recipient_sds_users_all_username'
	}),
	polls: many(polls),
	roomings: many(rooming),
	sds_group_membership_caches: many(sds_group_membership_cache),
	sds_sessions: many(sds_sessions),
	directories: many(directory),
	gov_fin_ledgers_byuser: many(gov_fin_ledger, {
		relationName: 'gov_fin_ledger_byuser_sds_users_all_username'
	}),
	gov_fin_ledgers_voidedby: many(gov_fin_ledger, {
		relationName: 'gov_fin_ledger_voidedby_sds_users_all_username'
	}),
	mailman_optouts: many(mailman_optout),
	ballots: many(ballots),
	sds_users_in_groups: many(sds_users_in_groups),
	lounge_expense_actions: many(lounge_expense_actions),
	old_room_assignments: many(old_room_assignments)
}));

export const loungesRelations = relations(lounges, ({ one, many }) => ({
	sds_users_all_contact2: one(sds_users_all, {
		fields: [lounges.contact2],
		references: [sds_users_all.username],
		relationName: 'lounges_contact2_sds_users_all_username'
	}),
	sds_users_all_contact: one(sds_users_all, {
		fields: [lounges.contact],
		references: [sds_users_all.username],
		relationName: 'lounges_contact_sds_users_all_username'
	}),
	lounge_expenses: many(lounge_expenses),
	directories: many(directory)
}));

export const gov_proposalsRelations = relations(gov_proposals, ({ one }) => ({
	gov_agenda: one(gov_agendas, {
		fields: [gov_proposals.agendaid],
		references: [gov_agendas.agendaid]
	}),
	sds_users_all_author: one(sds_users_all, {
		fields: [gov_proposals.author],
		references: [sds_users_all.username],
		relationName: 'gov_proposals_author_sds_users_all_username'
	}),
	sds_users_all_deletedby: one(sds_users_all, {
		fields: [gov_proposals.deletedby],
		references: [sds_users_all.username],
		relationName: 'gov_proposals_deletedby_sds_users_all_username'
	}),
	sds_users_all_userassign: one(sds_users_all, {
		fields: [gov_proposals.userassign],
		references: [sds_users_all.username],
		relationName: 'gov_proposals_userassign_sds_users_all_username'
	})
}));

export const officersRelations = relations(officers, ({ one }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [officers.username],
		references: [sds_users_all.username]
	})
}));

export const gov_fin_subaccountsRelations = relations(gov_fin_subaccounts, ({ one, many }) => ({
	gov_fin_account: one(gov_fin_accounts, {
		fields: [gov_fin_subaccounts.acctid],
		references: [gov_fin_accounts.acctid]
	}),
	sds_users_all_byuser: one(sds_users_all, {
		fields: [gov_fin_subaccounts.byuser],
		references: [sds_users_all.username],
		relationName: 'gov_fin_subaccounts_byuser_sds_users_all_username'
	}),
	sds_users_all_closedby: one(sds_users_all, {
		fields: [gov_fin_subaccounts.closedby],
		references: [sds_users_all.username],
		relationName: 'gov_fin_subaccounts_closedby_sds_users_all_username'
	}),
	gov_fin_ledgers: many(gov_fin_ledger)
}));

export const gov_fin_accountsRelations = relations(gov_fin_accounts, ({ many }) => ({
	gov_fin_subaccounts: many(gov_fin_subaccounts),
	gov_fin_ledgers: many(gov_fin_ledger)
}));

export const guest_listRelations = relations(guest_list, ({ one }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [guest_list.username],
		references: [sds_users_all.username]
	})
}));

export const lounge_expensesRelations = relations(lounge_expenses, ({ one, many }) => ({
	lounge: one(lounges, {
		fields: [lounge_expenses.loungeid],
		references: [lounges.lounge]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [lounge_expenses.usersub],
		references: [sds_users_all.username]
	}),
	lounge_expense_actions: many(lounge_expense_actions)
}));

export const mailman_listsRelations = relations(mailman_lists, ({ one, many }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [mailman_lists.creator],
		references: [sds_users_all.username]
	}),
	sds_group_groupname: one(sds_groups, {
		fields: [mailman_lists.groupname],
		references: [sds_groups.groupname],
		relationName: 'mailman_lists_groupname_sds_groups_groupname'
	}),
	sds_group_ownergroup: one(sds_groups, {
		fields: [mailman_lists.ownergroup],
		references: [sds_groups.groupname],
		relationName: 'mailman_lists_ownergroup_sds_groups_groupname'
	}),
	mailman_aliases: many(mailman_aliases),
	mailman_optouts: many(mailman_optout)
}));

export const sds_groupsRelations = relations(sds_groups, ({ many }) => ({
	mailman_lists_groupname: many(mailman_lists, {
		relationName: 'mailman_lists_groupname_sds_groups_groupname'
	}),
	mailman_lists_ownergroup: many(mailman_lists, {
		relationName: 'mailman_lists_ownergroup_sds_groups_groupname'
	}),
	lotteries: many(lotteries),
	polls: many(polls),
	sds_group_membership_caches: many(sds_group_membership_cache),
	sds_automated_groups: many(sds_automated_groups),
	wiki_permissions_sds_admin_groupname: many(wiki_permissions_sds, {
		relationName: 'wiki_permissions_sds_admin_groupname_sds_groups_groupname'
	}),
	wiki_permissions_sds_read_groupname: many(wiki_permissions_sds, {
		relationName: 'wiki_permissions_sds_read_groupname_sds_groups_groupname'
	}),
	wiki_permissions_sds_write_groupname: many(wiki_permissions_sds, {
		relationName: 'wiki_permissions_sds_write_groupname_sds_groups_groupname'
	}),
	sds_groups_in_groups_subgroup: many(sds_groups_in_groups, {
		relationName: 'sds_groups_in_groups_subgroup_sds_groups_groupname'
	}),
	sds_groups_in_groups_supergroup: many(sds_groups_in_groups, {
		relationName: 'sds_groups_in_groups_supergroup_sds_groups_groupname'
	}),
	sds_users_in_groups: many(sds_users_in_groups),
	sds_group_notifications_groupname: many(sds_group_notifications, {
		relationName: 'sds_group_notifications_groupname_sds_groups_groupname'
	}),
	sds_group_notifications_recipient_groupname: many(sds_group_notifications, {
		relationName: 'sds_group_notifications_recipient_groupname_sds_groups_groupname'
	})
}));

export const mailman_aliasesRelations = relations(mailman_aliases, ({ one }) => ({
	mailman_list: one(mailman_lists, {
		fields: [mailman_aliases.listname],
		references: [mailman_lists.listname]
	})
}));

export const mailserverRelations = relations(mailserver, ({ one }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [mailserver.username],
		references: [sds_users_all.username]
	})
}));

export const lotteriesRelations = relations(lotteries, ({ one, many }) => ({
	sds_group: one(sds_groups, {
		fields: [lotteries.groupname],
		references: [sds_groups.groupname]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [lotteries.owner],
		references: [sds_users_all.username]
	}),
	lottery_entries: many(lottery_entries)
}));

export const lottery_entriesRelations = relations(lottery_entries, ({ one }) => ({
	lottery: one(lotteries, {
		fields: [lottery_entries.lotteryid],
		references: [lotteries.lotteryid]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [lottery_entries.username],
		references: [sds_users_all.username]
	})
}));

export const movie_loansRelations = relations(movie_loans, ({ one }) => ({
	sds_users_all_checkin_by: one(sds_users_all, {
		fields: [movie_loans.checkin_by],
		references: [sds_users_all.username],
		relationName: 'movie_loans_checkin_by_sds_users_all_username'
	}),
	sds_users_all_checkout_by: one(sds_users_all, {
		fields: [movie_loans.checkout_by],
		references: [sds_users_all.username],
		relationName: 'movie_loans_checkout_by_sds_users_all_username'
	}),
	movie_instance: one(movie_instances, {
		fields: [movie_loans.instanceid],
		references: [movie_instances.instanceid]
	}),
	movie_item: one(movie_items, {
		fields: [movie_loans.movieid_ref],
		references: [movie_items.movieid]
	}),
	sds_users_all_username: one(sds_users_all, {
		fields: [movie_loans.username],
		references: [sds_users_all.username],
		relationName: 'movie_loans_username_sds_users_all_username'
	})
}));

export const movie_instancesRelations = relations(movie_instances, ({ one, many }) => ({
	movie_loans: many(movie_loans),
	movie_item: one(movie_items, {
		fields: [movie_instances.movieid],
		references: [movie_items.movieid]
	})
}));

export const movie_itemsRelations = relations(movie_items, ({ one, many }) => ({
	movie_loans: many(movie_loans),
	movie_type: one(movie_types, {
		fields: [movie_items.typeid],
		references: [movie_types.typeid]
	}),
	movie_instances: many(movie_instances)
}));

export const packagesRelations = relations(packages, ({ one }) => ({
	sds_users_all_checkin_by: one(sds_users_all, {
		fields: [packages.checkin_by],
		references: [sds_users_all.username],
		relationName: 'packages_checkin_by_sds_users_all_username'
	}),
	sds_users_all_pickup_by: one(sds_users_all, {
		fields: [packages.pickup_by],
		references: [sds_users_all.username],
		relationName: 'packages_pickup_by_sds_users_all_username'
	}),
	sds_users_all_recipient: one(sds_users_all, {
		fields: [packages.recipient],
		references: [sds_users_all.username],
		relationName: 'packages_recipient_sds_users_all_username'
	})
}));

export const packages_checkinRelations = relations(packages_checkin, ({ one }) => ({
	sds_users_all_deskworker: one(sds_users_all, {
		fields: [packages_checkin.deskworker],
		references: [sds_users_all.username],
		relationName: 'packages_checkin_deskworker_sds_users_all_username'
	}),
	sds_users_all_recipient: one(sds_users_all, {
		fields: [packages_checkin.recipient],
		references: [sds_users_all.username],
		relationName: 'packages_checkin_recipient_sds_users_all_username'
	})
}));

export const movie_typesRelations = relations(movie_types, ({ many }) => ({
	movie_items: many(movie_items)
}));

export const pollsRelations = relations(polls, ({ one, many }) => ({
	sds_group: one(sds_groups, {
		fields: [polls.groupname],
		references: [sds_groups.groupname]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [polls.owner],
		references: [sds_users_all.username]
	}),
	ballots: many(ballots),
	poll_choices: many(poll_choices)
}));

export const roomingRelations = relations(rooming, ({ one }) => ({
	room: one(rooms, {
		fields: [rooming.room],
		references: [rooms.room]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [rooming.username],
		references: [sds_users_all.username]
	})
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
	roomings: many(rooming),
	directories: many(directory),
	old_room_assignments: many(old_room_assignments)
}));

export const sds_group_membership_cacheRelations = relations(
	sds_group_membership_cache,
	({ one }) => ({
		sds_group: one(sds_groups, {
			fields: [sds_group_membership_cache.groupname],
			references: [sds_groups.groupname]
		}),
		sds_users_all: one(sds_users_all, {
			fields: [sds_group_membership_cache.username],
			references: [sds_users_all.username]
		})
	})
);

export const sds_automated_groupsRelations = relations(sds_automated_groups, ({ one }) => ({
	sds_group: one(sds_groups, {
		fields: [sds_automated_groups.groupname],
		references: [sds_groups.groupname]
	})
}));

export const sds_sessionsRelations = relations(sds_sessions, ({ one }) => ({
	sds_users_all: one(sds_users_all, {
		fields: [sds_sessions.username],
		references: [sds_users_all.username]
	})
}));

export const wiki_permissions_sdsRelations = relations(wiki_permissions_sds, ({ one, many }) => ({
	sds_group_admin_groupname: one(sds_groups, {
		fields: [wiki_permissions_sds.admin_groupname],
		references: [sds_groups.groupname],
		relationName: 'wiki_permissions_sds_admin_groupname_sds_groups_groupname'
	}),
	sds_group_read_groupname: one(sds_groups, {
		fields: [wiki_permissions_sds.read_groupname],
		references: [sds_groups.groupname],
		relationName: 'wiki_permissions_sds_read_groupname_sds_groups_groupname'
	}),
	sds_group_write_groupname: one(sds_groups, {
		fields: [wiki_permissions_sds.write_groupname],
		references: [sds_groups.groupname],
		relationName: 'wiki_permissions_sds_write_groupname_sds_groups_groupname'
	}),
	wiki_permissions_wikiusers: many(wiki_permissions_wikiuser)
}));

export const directoryRelations = relations(directory, ({ one }) => ({
	lounge: one(lounges, {
		fields: [directory.lounge],
		references: [lounges.lounge]
	}),
	room: one(rooms, {
		fields: [directory.room],
		references: [rooms.room]
	}),
	user_type: one(user_types, {
		fields: [directory.type],
		references: [user_types.type]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [directory.username],
		references: [sds_users_all.username]
	})
}));

export const user_typesRelations = relations(user_types, ({ many }) => ({
	directories: many(directory)
}));

export const gov_fin_ledgerRelations = relations(gov_fin_ledger, ({ one }) => ({
	gov_fin_account: one(gov_fin_accounts, {
		fields: [gov_fin_ledger.acctid],
		references: [gov_fin_accounts.acctid]
	}),
	sds_users_all_byuser: one(sds_users_all, {
		fields: [gov_fin_ledger.byuser],
		references: [sds_users_all.username],
		relationName: 'gov_fin_ledger_byuser_sds_users_all_username'
	}),
	gov_fin_subaccount: one(gov_fin_subaccounts, {
		fields: [gov_fin_ledger.subid],
		references: [gov_fin_subaccounts.subid]
	}),
	sds_users_all_voidedby: one(sds_users_all, {
		fields: [gov_fin_ledger.voidedby],
		references: [sds_users_all.username],
		relationName: 'gov_fin_ledger_voidedby_sds_users_all_username'
	})
}));

export const mailman_optoutRelations = relations(mailman_optout, ({ one }) => ({
	mailman_list: one(mailman_lists, {
		fields: [mailman_optout.listname],
		references: [mailman_lists.listname]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [mailman_optout.username],
		references: [sds_users_all.username]
	})
}));

export const ballotsRelations = relations(ballots, ({ one }) => ({
	poll: one(polls, {
		fields: [ballots.pollid],
		references: [polls.pollid]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [ballots.username],
		references: [sds_users_all.username]
	})
}));

export const sds_groups_in_groupsRelations = relations(sds_groups_in_groups, ({ one }) => ({
	sds_group_subgroup: one(sds_groups, {
		fields: [sds_groups_in_groups.subgroup],
		references: [sds_groups.groupname],
		relationName: 'sds_groups_in_groups_subgroup_sds_groups_groupname'
	}),
	sds_group_supergroup: one(sds_groups, {
		fields: [sds_groups_in_groups.supergroup],
		references: [sds_groups.groupname],
		relationName: 'sds_groups_in_groups_supergroup_sds_groups_groupname'
	})
}));

export const sds_users_in_groupsRelations = relations(sds_users_in_groups, ({ one }) => ({
	sds_group: one(sds_groups, {
		fields: [sds_users_in_groups.groupname],
		references: [sds_groups.groupname]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [sds_users_in_groups.username],
		references: [sds_users_all.username]
	})
}));

export const wiki_permissions_wikiuserRelations = relations(
	wiki_permissions_wikiuser,
	({ one }) => ({
		wiki_permissions_sd: one(wiki_permissions_sds, {
			fields: [wiki_permissions_wikiuser.wiki_prefix],
			references: [wiki_permissions_sds.wiki_prefix]
		})
	})
);

export const lounge_expense_actionsRelations = relations(lounge_expense_actions, ({ one }) => ({
	lounge_expense: one(lounge_expenses, {
		fields: [lounge_expense_actions.expenseid],
		references: [lounge_expenses.expenseid]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [lounge_expense_actions.username],
		references: [sds_users_all.username]
	})
}));

export const old_room_assignmentsRelations = relations(old_room_assignments, ({ one }) => ({
	room: one(rooms, {
		fields: [old_room_assignments.room],
		references: [rooms.room]
	}),
	sds_users_all: one(sds_users_all, {
		fields: [old_room_assignments.username],
		references: [sds_users_all.username]
	})
}));

export const poll_choicesRelations = relations(poll_choices, ({ one }) => ({
	poll: one(polls, {
		fields: [poll_choices.pollid],
		references: [polls.pollid]
	})
}));

export const sds_group_notificationsRelations = relations(sds_group_notifications, ({ one }) => ({
	sds_group_groupname: one(sds_groups, {
		fields: [sds_group_notifications.groupname],
		references: [sds_groups.groupname],
		relationName: 'sds_group_notifications_groupname_sds_groups_groupname'
	}),
	sds_group_recipient_groupname: one(sds_groups, {
		fields: [sds_group_notifications.recipient_groupname],
		references: [sds_groups.groupname],
		relationName: 'sds_group_notifications_recipient_groupname_sds_groups_groupname'
	})
}));
