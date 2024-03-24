import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const { POSTGRES_DB, POSTGRES_USERNAME, POSTGRESS_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = env;

export const pool = new pg.Pool({
	host: POSTGRES_HOST,
	port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : undefined,
	user: POSTGRES_USERNAME,
	password: POSTGRESS_PASSWORD,
	database: POSTGRES_DB,
	idle_in_transaction_session_timeout: 0
});

export const db = drizzle(pool, { schema, logger: dev });
