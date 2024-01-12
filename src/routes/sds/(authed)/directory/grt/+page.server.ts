import { pool } from '$lib/db';
import { createSqlTag } from 'slonik';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const sql = createSqlTag({
	typeAliases: {
		gra: z.object({
			email: z.string().nullable(),
			gra: z.string().nullable(),
			name: z.string().nullable(),
			phone: z.string().nullable(),
			room: z.string().nullable(),
			username: z.string().nullable()
		})
	}
});

export const load: PageServerLoad = async () => {
	const gras = pool.any(sql.typeAlias('gra')`
        SELECT username,COALESCE(title||' ','')||firstname||' '||lastname AS name,
			room,phone,email,gra
		FROM active_directory JOIN rooms USING (room)
		WHERE active_directory.type='GRA'
		ORDER BY gra,username`);

	return { gras: gras };
};
