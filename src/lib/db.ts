import { Pool } from 'pg';
import {
	POSTGRES_DB,
	POSTGRES_USERNAME,
	POSTGRESS_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT
} from '$env/static/private';

const pool = new Pool({
	user: POSTGRES_USERNAME || 'postgres',
	host: POSTGRES_HOST || 'localhost',
	database: POSTGRES_DB || 'postgres',
	password: POSTGRESS_PASSWORD || '',
	port: Number(POSTGRES_PORT || 5432)
});

export const connectToDB = async () => await pool.connect();
