import { pool } from '$lib/server/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { requireGroups } from '$lib/utils';

const sql = createSqlTag({
	typeAliases: {
		medlink: z.object({
			email: z.string(),
			name: z.string().nullable(),
			phone: z.string().nullable(),
			room: z.string().nullable(),
			username: z.string()
		})
	}
});

export const load: PageServerLoad = async ({ parent }) => {
	const { groups } = await parent();
	requireGroups(groups, 'USERS');

	const medlinks = pool.any(sql.typeAlias('medlink')`
        SELECT username,
       COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
            username) AS name,
            room,phone,email
        FROM medlinks LEFT JOIN directory USING (username)
        WHERE removed IS NULL
        ORDER BY ordering`);

	return { medlinks: medlinks };
};
