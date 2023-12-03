// // lib/db.ts
// import { Pool } from 'pg';

// /**
//  * Create a new connection pool to the database.
//  */
// const pool = new Pool({
// 	database: import.meta.env.POSTGRES_DB || 'postgres',
// 	user: import.meta.env.POSTGRES_USERNAME || 'postgres',
// 	host: import.meta.env.POSTGRES_HOST || 'localhost',
// 	port: Number(import.meta.env.POSTGRES_PORT || 5432)
// });

// /**
//  * Connect to the PostgreSQL database.
//  * @returns {Promise<import("pg").Client>} A new client from the connection pool.
//  */
// export const connectToDB = async () => await pool.connect();
