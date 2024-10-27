import { db } from '$lib/server';
import { packages } from '$lib/server/schema';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';
import { and, count, isNull, sql, max, eq, sum, min } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups, username } = await parent();
	requireGroups(groups, 'USERS');

	const subquery = db
		.select({
			pkg_count: count().as('pkg_count'),
			perishable_count: count(sql`NULLIF(perishable,'f')`).as('perishable_count'),
			latest_checkin: max(packages.checkin).as('latest_checkin')
		})
		.from(packages)
		.where(and(eq(packages.recipient, username ?? ''), isNull(packages.pickup)))
		.groupBy(packages.bin)
		.as('info');

	const packagesQuery = db
		.select({
			num_packages: sum(subquery.pkg_count),
			num_perishable: sum(subquery.perishable_count),
			earliest_sure: min(subquery.latest_checkin)
		})
		.from(subquery)
		.limit(1);

	// const packages = pool.one(
	// 	sql.typeAlias(
	// 		'packages'
	// 	)`SELECT sum(pkg_count) AS num_packages,sum(perishable_count) AS num_perishable,
	//         to_char(min(latest_checkin),'FMMonth FMDDth') AS earliest_sure
	//  FROM (SELECT count(*) AS pkg_count,
	//        count(NULLIF(perishable,'f')) AS perishable_count,
	//        max(checkin) AS latest_checkin
	//        FROM packages WHERE recipient='$currentuser' AND  pickup IS NULL
	//        GROUP BY bin) AS info`
	// );

	return { packages: packagesQuery.then((result) => result[0]) };
};
