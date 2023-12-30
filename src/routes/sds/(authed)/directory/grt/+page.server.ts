import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		gra: z.object({
			username: z.string(),
			name: z.string(),
			room: z.string().nullable(),
			phone: z.string().nullable(),
			email: z.string().nullable(),
			gra: z.string()
		})
	}
});

export const load: PageServerLoad = async () => {
	const dbResult = pool.connect(async (connection) => {
		const graQuery = connection.many(sql.typeAlias('gra')`
        SELECT username,COALESCE(title||' ','')||firstname||' '||lastname AS name,
			room,phone,email,gra
		FROM active_directory JOIN rooms USING (room)
		WHERE active_directory.type='GRA'
		ORDER BY gra,username`);

		return graQuery;
	});

	return { gras: dbResult };
};
