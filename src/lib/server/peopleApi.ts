import { env } from '$env/dynamic/private';

const { PEOPLE_API_ID, PEOPLE_API_SECRET } = env;

type PeopleSuccess = {
	kerberosId: string;
	givenName: string;
	familyName: string;
	middleName: string;
	displayName: string;
	email: string;
	phoneNumber: string;
	website: string;
	mitDirectorySuppressed: boolean;
	affiliations:
		| {
				type: 'student';
				classYear: string;
				departments: { code: string; name: string }[];
				courses: {
					code: string;
					courseOption: string;
					name: string;
					primary: boolean;
					degreeStatus: string;
				}[];
		  }
		| {
				type: 'staff';
				office: string;
				title: string;
				departments: { code: string; name: string }[];
		  }
		| { type: 'affiliate' }[];
};

type PeopleErrorCodes = 400 | 401 | 403 | 404 | 405 | 406 | 429;

type PeopleError = {
	errorCode: PeopleErrorCodes;
	errorMessage: string;
	errorDetails: { message: string }[];
};

export const kerbRequest = async (kerberosId: string) => {
	const headers = new Headers();
	headers.append('client_id', PEOPLE_API_ID);
	headers.append('client_secret', PEOPLE_API_SECRET);

	const init = {
		method: 'GET',
		headers
	};

	const response = await fetch(
		`https://mit-people-v3.cloudhub.io/people/v3/people/${kerberosId}`,
		init
	);

	const data = await response.json();

	if (response.status == 200) {
		return data as PeopleSuccess;
	} else {
		return data as PeopleError;
	}
};
