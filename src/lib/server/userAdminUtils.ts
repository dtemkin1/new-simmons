import { and, eq, not } from 'drizzle-orm';
import { db } from '.';
import { sds_users_all } from './schema';

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
	// const private = hidden ? 'true' : 'false';
	// const immortal_esc = immortal ? 'true' : 'false';
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

	// if (room) {
	// 	const checkPhone = await db
	// 		.select({ phone: active_directory.phone })
	// 		.from(active_directory)
	// 		.where(eq(active_directory.room, room));
	// }
};

export const enableUser = async (username: string) => {
	const findUser = await db
		.select()
		.from(sds_users_all)
		.where(and(eq(sds_users_all.username, username), not(sds_users_all.active)));

	if (findUser.length != 1) {
		return false;
	} else {
		await db
			.update(sds_users_all)
			.set({
				active: true
			})
			.where(eq(sds_users_all.username, username));
		return true;
	}
};
