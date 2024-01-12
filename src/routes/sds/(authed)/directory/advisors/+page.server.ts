import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		advisors: z.object({
			username: z.string(),
			name: z.string().nullable(),
			room: z.string().nullable(),
			phone: z.string().nullable(),
			email: z.string()
		})
	}
});

export const load: PageServerLoad = async () => {
	const advisors = pool.any(sql.typeAlias('advisors')`
        SELECT username,
			COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
						username) AS name,
			room,phone,email
		FROM advisors LEFT JOIN directory USING (username)
		WHERE removed IS NULL
		ORDER BY ordering`);

	return { advisors: advisors };
};
