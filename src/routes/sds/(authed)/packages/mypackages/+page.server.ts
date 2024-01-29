import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { requireGroups } from '$lib/utils';

const sql = createSqlTag({
	typeAliases: {
		packages: z.object({
			earliest_sure: z.string().nullable(),
			num_packages: z
				.string()
				.transform((x) => Number(x))
				.nullable(),
			num_perishable: z
				.string()
				.transform((x) => Number(x))
				.nullable()
		})
	}
});

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const packages = pool.one(
		sql.typeAlias(
			'packages'
		)`SELECT sum(pkg_count) AS num_packages,sum(perishable_count) AS num_perishable,
            to_char(min(latest_checkin),'FMMonth FMDDth') AS earliest_sure
     FROM (SELECT count(*) AS pkg_count,
           count(NULLIF(perishable,'f')) AS perishable_count,
           max(checkin) AS latest_checkin
           FROM packages WHERE recipient='$currentuser' AND  pickup IS NULL
           GROUP BY bin) AS info`
	);

	return { packages: packages };
};
