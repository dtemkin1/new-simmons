import { base } from '$app/paths';

import { Home } from 'lucide-svelte';
import { Vote } from 'lucide-svelte';
import { PersonStanding } from 'lucide-svelte';
import { Package } from 'lucide-svelte';
import { Film } from 'lucide-svelte';
import { LibraryBig } from 'lucide-svelte';
import { Mails } from 'lucide-svelte';

export const headerLinks = [
	{
		name: 'About',
		url: `${base}/about`
	},
	{
		name: 'Prospectives',
		url: `${base}/prospectives`
	},
	{
		name: 'Visitors',
		url: `${base}/visitors`
	},
	{
		name: 'Residents',
		url: `${base}/residents`
	}
];

export const sdsLinks = [
	{
		id: 'home',
		name: 'Simmons DB',
		value: 1,
		icon: Home,
		links: [
			{ href: `${base}/sds/home`, label: 'Home', badge: '' },
			{ href: `${base}/sds/directory`, label: 'Directory', badge: 'Work in Progress' },
			{ href: `${base}/sds/directory/calendar`, label: 'Events Calendar', badge: '' },
			{ href: `${base}/sds/directory/reservations`, label: 'Reservations Calendar', badge: '' },
			{ href: `${base}/sds/users/about`, label: 'About the DB', badge: '' }
		]
	},
	{
		id: 'govtracker',
		name: 'GovTracker',
		value: 2,
		icon: Vote,
		links: []
	},
	{
		id: 'personal',
		name: 'Personal Info',
		value: 3,
		icon: PersonStanding,
		links: []
	},
	{
		id: 'packages',
		name: 'Packages',
		value: 4,
		icon: Package,
		links: [{ href: `${base}/sds/packages/mypackages`, label: 'My Packages', badge: '' }]
	},
	{
		id: 'movies',
		name: 'Movies',
		value: 5,
		icon: Film,
		links: []
	},
	{
		id: 'library',
		name: 'Library',
		value: 6,
		icon: LibraryBig,
		links: [
			{ href: 'http://www.librarything.com/catalog/simmons_hall', label: 'Catalog', badge: '' },
			{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '' }
		]
	},
	{
		id: 'desk',
		name: 'Desk',
		value: 7,
		icon: Mails,
		links: [{ href: `${base}/sds/desk/calendar`, label: 'Desk Shift Calendar', badge: '' }]
	}
];
