import {
	createPool,
	stringifyDsn,
	type Interceptor,
	type QueryResultRow,
	SchemaValidationError
} from 'slonik';

import { env } from '$env/dynamic/private';
const { POSTGRES_DB, POSTGRES_USERNAME, POSTGRESS_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = env;

const createResultParserInterceptor = (): Interceptor => {
	return {
		transformRow: (executionContext, actualQuery, row) => {
			const { resultParser } = executionContext;

			if (!resultParser) {
				return row;
			}

			const validationResult = resultParser.safeParse(row);

			if (!validationResult.success) {
				throw new SchemaValidationError(actualQuery, row, validationResult.error.issues);
			}

			return validationResult.data as QueryResultRow;
		}
	};
};

const poolUrl = stringifyDsn({
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	username: POSTGRES_USERNAME,
	password: POSTGRESS_PASSWORD,
	databaseName: POSTGRES_DB
});

export const pool = await createPool(poolUrl, {
	idleInTransactionSessionTimeout: 'DISABLE_TIMEOUT',
	interceptors: [createResultParserInterceptor()]
});