// import { db } from '.';

export const addUser = async ({
	username,
	email,
	lastname,
	firstname,
	title,
	type,
	room,
	year,
	immortal,
	hidden
}: {
	username: string;
	email: string;
	lastname: string;
	firstname: string;
	title?: string | null;
	type: string;
	room?: string | null;
	year?: string | null;
	immortal: boolean;
	hidden: boolean;
}) => {
	// let private = hidden ? 'true' : 'false';
	// let immortal_esc = immortal ? 'true' : 'false';
	// if (title && title == '') {
	// 	title = null;
	// }
	// let phone = null;

	console.log('Adding user with the following data: ', {
		username,
		email,
		lastname,
		firstname,
		title,
		type,
		room,
		year,
		immortal,
		hidden
	});
};
