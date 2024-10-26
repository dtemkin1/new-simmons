import unserialize from 'locutus/php/var/unserialize';
import serialize from 'locutus/php/var/serialize';

import { error } from '@sveltejs/kit';

import type { Session } from './auth';
import { sds_sessions } from './schema';
import { db } from '.';
import { eq } from 'drizzle-orm';

export async function sdsSetReminder(
	session: Session | null,
	reminderName: string,
	reminderMessage: string
) {
	if (!session) {
		error(400, 'No session');
	}

	const stringData = session.data;
	const data = stringData
		? (unserialize(stringData) as Record<string, Record<string, string>>)
		: {};

	if (!data.reminders) {
		data.reminders = {};
	}
	data.reminders[reminderName] = reminderMessage;

	const newData = serialize(data);
	await db.update(sds_sessions).set({ data: newData }).where(eq(sds_sessions.sid, session.sid));

	return reminderName;
}

export async function sdsClearReminder(session: Session | null, reminderName: string) {
	if (!session) {
		error(400, 'No session');
	}

	const stringData = session.data;
	const data = stringData
		? (unserialize(stringData) as Record<string, Record<string, string>>)
		: {};

	if (!data.reminders) {
		data.reminders = {};
	}
	delete data.reminders[reminderName];

	const newData = serialize(data);
	await db.update(sds_sessions).set({ data: newData }).where(eq(sds_sessions.sid, session.sid));

	return reminderName;
}

export async function sdsClearReminders(session: Session | null) {
	if (!session) {
		error(400, 'No session');
	}

	const stringData = session.data;
	const data = stringData
		? (unserialize(stringData) as Record<string, Record<string, string>>)
		: {};

	data.reminders = {};

	const newData = serialize(data);
	await db.update(sds_sessions).set({ data: newData }).where(eq(sds_sessions.sid, session.sid));
}

export function sdsGetReminders(session: Session | null) {
	if (!session) {
		error(400, 'No session');
	}

	const stringData = session.data;
	const data = stringData
		? (unserialize(stringData) as Record<string, Record<string, string>>)
		: {};

	if (!data.reminders) {
		data.reminders = {};
	}

	return data.reminders;
}

export function sdsGetReminder(session: Session | null, reminderName: string) {
	if (!session) {
		error(400, 'No session');
	}

	const stringData = session.data;
	const data = stringData
		? (unserialize(stringData) as Record<string, Record<string, string>>)
		: {};

	if (!data.reminders) {
		data.reminders = {};
	}

	return data.reminders[reminderName];
}
