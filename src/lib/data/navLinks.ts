import { base } from '$app/paths';

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
		icon: 'house',
		links: [
			{ href: `${base}/sds/home`, label: 'Home', badge: 'Work in Progress' },
			{ href: `${base}/sds/directory`, label: 'Directory', badge: 'Work in Progress' },
			{ href: `${base}/sds/directory/calendar`, label: 'Events Calendar', badge: '' },
			{ href: `${base}/sds/directory/reservations`, label: 'Reservations Calendar', badge: '' },
			{ href: `${base}/sds/users/about`, label: 'About the DB', badge: 'Work in Progress' }
		]
	},
	{
		id: 'govtracker',
		name: 'GovTracker',
		value: 2,
		icon: 'check-to-slot',
		links: []
	},
	{
		id: 'personal',
		name: 'Personal Info',
		value: 3,
		icon: 'person',
		links: []
	},
	{
		id: 'packages',
		name: 'Packages',
		value: 4,
		icon: 'box',
		links: [{ href: `${base}/sds/packages/mypackages`, label: 'My Packages', badge: '' }]
	},
	{
		id: 'movies',
		name: 'Movies',
		value: 5,
		icon: 'film',
		links: []
	},
	{
		id: 'library',
		name: 'Library',
		value: 6,
		icon: 'book',
		links: [
			{ href: 'http://www.librarything.com/catalog/simmons_hall', label: 'Catalog', badge: '' },
			{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '' }
		]
	},
	{
		id: 'desk',
		name: 'Desk',
		value: 7,
		icon: 'envelopes-bulk',
		links: [{ href: `${base}/sds/desk/calendar`, label: 'Desk Shift Calendar', badge: '' }]
	}
];
