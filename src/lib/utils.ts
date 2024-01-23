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
