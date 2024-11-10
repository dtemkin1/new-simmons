import type { PageServerLoad } from './$types';

import { requireGroups } from '$lib/utils';
import { db } from '$lib/server';
import { eq, sql } from 'drizzle-orm';
import { gov_agendas } from '$lib/server/schema';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'HOUSE-COMM-LEADERSHIP');

	const query = db
		.select({
			meetingtitle: gov_agendas.meetingtitle,
			meetingdatestr: sql`to_char(meetingdate,'FMMonth FMDD, YYYY')`
		})
		.from(gov_agendas)
		.where(eq(gov_agendas.status, 'closed'));

	return { meetingagenda: query };
};
