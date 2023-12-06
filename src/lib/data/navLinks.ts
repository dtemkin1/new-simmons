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
	[
		{ href: `${base}/sds/home`, label: 'Home', badge: 'Work in Progress' },
		{ href: `${base}/sds/directory`, label: 'Directory', badge: 'Work in Progress' },
		{ href: `${base}/sds/directory/calendar`, label: 'Events Calendar', badge: '' },
		{ href: `${base}/calendar`, label: 'Reservations Calendar', badge: '' }
	],
	[{ href: '', label: '', badge: '' }],
	[{ href: '', label: '', badge: '' }],
	[{ href: `${base}/sds/packages/mypackages`, label: 'My Packages', badge: '' }],
	[{ href: '', label: '', badge: '' }],
	[
		{ href: 'http://www.librarything.com/catalog/simmons_hall', label: 'Catalog', badge: '' },
		{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '' }
	],
	[{ href: `${base}/sds/desk/calendar`, label: 'Desk Shift Calendar', badge: '' }]
];
