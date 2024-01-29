import { error } from '@sveltejs/kit';
import type { Session } from 'lucia';

export function checkInGroup(groupName: string) {
	return (userGroups: readonly string[]) => {
		if (userGroups.includes(groupName)) {
			return true;
		} else {
			return false;
		}
	};
}

export function requireGroups(userGroups: readonly string[], ...groups: string[]) {
	let allow = false;

	for (const group of groups) {
		if (checkInGroup(group)(userGroups)) {
			allow = true;
		}
	}
	if (!allow && groups.includes('ADMINISTRATORS')) {
		error(403, 'Forbidden');
	}

	return true;
}

export function sdsSetReminder(
	session: Session | null,
	reminderName: string,
	reminderMessage: string
) {
	if (!session?.data.reminders) {
		session!.data.reminders = {};
	}
	session!.data.reminders[reminderName] = reminderMessage;
}

export function sdsClearReminder(session: Session | null, reminderName: string) {
	if (!session) {
		error(400, 'No session');
	}
	if (!session.data.reminders) {
		session.data.reminders = {};
	}
	delete session.data.reminders[reminderName];
}

export function sdsClearReminders(session: Session | null) {
	if (!session) {
		error(400, 'No session');
	}
	session.data.reminders = {};
}

export function sdsGetReminders(session: Session | null) {
	if (!session) {
		error(400, 'No session');
	}
	if (!session.data.reminders) {
		session.data.reminders = {};
	}
	return session.data.reminders;
}

export function sdsGetReminder(session: Session | null, reminderName: string) {
	if (!session) {
		error(400, 'No session');
	}
	if (!session.data.reminders) {
		session.data.reminders = {};
	}
	return session.data.reminders[reminderName];
}
