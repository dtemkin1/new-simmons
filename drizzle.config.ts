import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
const { POSTGRES_DB, POSTGRES_USERNAME, POSTGRESS_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } =
	process.env;

if (!POSTGRES_DB || !POSTGRES_USERNAME || !POSTGRESS_PASSWORD || !POSTGRES_HOST) {
	throw new Error('Credentials not properly defined');
}

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schema.ts',
	dbCredentials: {
		host: POSTGRES_HOST,
		port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : 5432,
		user: POSTGRES_USERNAME,
		password: POSTGRESS_PASSWORD,
		database: POSTGRES_DB,
		ssl: false
		// url: 'postgres://postgres:mypassword@localhost:5432/postgres'
	},
	introspect: {
		casing: 'preserve'
	}
});
