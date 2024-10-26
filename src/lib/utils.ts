import { error } from '@sveltejs/kit';

export function checkInGroup(groupName: string) {
	return (userGroups: string[]) => {
		if (userGroups.includes(groupName)) {
			return true;
		} else {
			return false;
		}
	};
}

export function requireGroups(userGroups: string[], ...groups: string[]) {
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
