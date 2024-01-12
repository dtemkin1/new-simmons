import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		officer: z.object({
			email: z.string(),
			name: z.string().nullable(),
			phone: z.string().nullable(),
			position_text: z.string().nullable(),
			room: z.string().nullable(),
			username: z.string()
		})
	}
});

export const load: PageServerLoad = async () => {
	const officers = pool.any(sql.typeAlias('officer')`
	SELECT position_text,username,
		COALESCE(COALESCE(title||' ','')||firstname||' '||lastname,
				username) AS name,
		room,phone,email
	FROM officers LEFT JOIN directory USING (username)
	WHERE removed IS NULL
	ORDER BY ordering`);

	return { officers: officers };
};
