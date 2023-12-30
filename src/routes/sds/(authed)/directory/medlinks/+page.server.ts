import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		medlink: z.object({
			username: z.string(),
			name: z.string(),
			room: z.string().nullable(),
			phone: z.string().nullable(),
			email: z.string().nullable()
		})
	}
});

export const load: PageServerLoad = async () => {
	const dbResult = pool.connect(async (connection) => {
		const medlinkQuery = connection.many(sql.typeAlias('medlink')`
        SELECT username,
       COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
            username) AS name,
            room,phone,email
        FROM medlinks LEFT JOIN directory USING (username)
        WHERE removed IS NULL
        ORDER BY ordering`);

		return medlinkQuery;
	});

	return { medlinks: dbResult };
};
