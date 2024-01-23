import type { Session } from '@auth/sveltekit';
import { error } from '@sveltejs/kit';

export function checkInGroup(groupName: string) {
	return (session: Session | null) => {
		if (session?.user?.groups?.includes(groupName)) {
			return true;
		} else {
			return false;
		}
	};
}

export function requireGroups(session: Session | null, ...groups: string[]) {
	let allow = false;

	for (const group of groups) {
		if (checkInGroup(group)(session)) {
			allow = true;
		}
	}
	if (!allow && !session?.user?.groups?.includes('ADMINISTRATORS')) {
		error(403, 'Forbidden');
	}

	return true;
}

export function sdsSetReminder(
	session: Session | null,
	reminderName: string,
	reminderMessage: string
) {
	session!.user!.data!.reminders[reminderName] = reminderMessage;
}

export function sdsClearReminder(session: Session | null, reminderName: string) {
	delete session!.user!.data!.reminders[reminderName];
}

export function sdsClearReminders(session: Session | null) {
	session!.user!.data!.reminders = {};
}

export function sdsGetReminders(session: Session | null) {
	return session!.user!.data!.reminders;
}

export function sdsGetReminder(session: Session | null, reminderName: string) {
	return session!.user!.data!.reminders[reminderName];
}
