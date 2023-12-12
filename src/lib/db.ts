import { createPool, stringifyDsn } from 'slonik';
import {
	POSTGRES_DB,
	POSTGRES_USERNAME,
	POSTGRESS_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT
} from '$env/static/private';

const poolUrl = stringifyDsn({
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	username: POSTGRES_USERNAME,
	password: POSTGRESS_PASSWORD,
	databaseName: POSTGRES_DB
});

export const pool = await createPool(poolUrl, {
	idleInTransactionSessionTimeout: 'DISABLE_TIMEOUT'
});
