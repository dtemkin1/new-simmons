import pg from 'pg';
import {
	POSTGRES_DB,
	POSTGRES_USERNAME,
	POSTGRESS_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT
} from '$env/static/private';

const pool = new pg.Pool({
	user: POSTGRES_USERNAME || 'postgres',
	host: POSTGRES_HOST || 'localhost',
	database: POSTGRES_DB || 'postgres',
	password: POSTGRESS_PASSWORD || '',
	port: Number(POSTGRES_PORT || 5432)
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (text: string, params?: any[]) => {
	const start = Date.now();
	const res = await pool.query(text, params);
	const duration = Date.now() - start;
	console.log('executed query', { text, duration, rows: res.rowCount });
	return res;
};

// TODO: ADD BACK ONCE NEEDED
// export const getClient = async () => {
// 	const client = await pool.connect();
// 	const query = client.query;
// 	const release = client.release;
// 	// set a timeout of 5 seconds, after which we will log this client's last query
// 	const timeout = setTimeout(() => {
// 		console.error('A client has been checked out for more than 5 seconds!');
// 		console.error(`The last executed query on this client was: ${client.lastQuery}`);
// 	}, 5000);
// 	// monkey patch the query method to keep track of the last query executed
// 	client.query = (...args) => {
// 		client.lastQuery = args;
// 		return query.apply(client, args);
// 	};
// 	client.release = () => {
// 		// clear our timeout
// 		clearTimeout(timeout);
// 		// set the methods back to their old un-monkey-patched version
// 		client.query = query;
// 		client.release = release;
// 		return release.apply(client);
// 	};
// 	return client;
// };
