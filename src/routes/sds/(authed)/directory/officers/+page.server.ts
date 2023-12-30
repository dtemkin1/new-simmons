import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		officer: z.object({
			position_text: z.string(),
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
		const officersQuery = connection.many(sql.typeAlias('officer')`
        SELECT position_text,username,
            COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
                    username) AS name,
            room,phone,email
        FROM officers LEFT JOIN directory USING (username)
        WHERE removed IS NULL
        ORDER BY ordering`);

		return await officersQuery;
	});

	return { officers: dbResult };
};
