import { base } from '$app/paths';

const dbBase = `${base}/sds`;

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
			{ href: `${dbBase}/home`, label: 'Home', badge: '', groupNeeded: ['USER'] },
			{
				href: `${dbBase}/directory`,
				label: 'Directory',
				badge: 'Work in Progress',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/directory/calendar`,
				label: 'Events Calendar',
				badge: '',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/directory/reservations`,
				label: 'Reservations Calendar',
				badge: '',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/directory/officers`,
				label: 'Student Officers',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `$${dbBase}/directory/medlinks`,
				label: 'Medlinks',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/directory/grt`,
				label: 'GRAs',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/groups/view_mailing_lists`,
				label: 'Mailing Lists',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/polls/polls`,
				label: 'Votes and Polls',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/lotteries`,
				label: 'Lotteries',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{ href: `${dbBase}/users/about`, label: 'About the DB', badge: '', groupNeeded: ['USER'] }
		]
	},
	{
		id: 'govtracker',
		name: 'GovTracker',
		value: 2,
		icon: Vote,
		links: [
			{
				href: `${dbBase}/loungeexpense`,
				label: 'Lounge Expenses',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/loungeexpense/proposals`,
				label: 'Lounge Event Proposals',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/govtracker/fin-ledger`,
				label: 'House Finances',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/govtracker`,
				label: 'House Meeings',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/govtracker/submitproposal`,
				label: 'Submit a Proposal',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/govtracker/downloadagenda`,
				label: 'Meeting Presentation',
				badge: 'Incomplete',
				groupNeeded: ['HOUSE-COMM-LEADERSHIP']
			}
		]
	},
	{
		id: 'personal',
		name: 'Personal Info',
		value: 3,
		icon: PersonStanding,
		links: [
			{
				href: `${dbBase}/directory/update`,
				label: 'My Profile',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/users/guestlist`,
				label: 'Guest List',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/users/loungesignup`,
				label: 'Guest List',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/users/password`,
				label: 'Login Passowrd',
				badge: 'Incomplete',
				groupNeeded: ['USER']
			}
		]
	},
	{
		id: 'packages',
		name: 'Packages',
		value: 4,
		icon: Package,
		links: [
			{
				href: `${dbBase}/packages/mypackages`,
				label: 'My Packages',
				badge: 'Work in Progress',
				groupNeeded: ['USER']
			},
			{
				href: `${dbBase}/packages/checkin`,
				label: 'Package Registration',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${dbBase}/packages/pickup`,
				label: 'Package Pickup',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${dbBase}/packages/viewpackages`,
				label: 'All Waiting Packages',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			}
		]
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
			{
				href: 'http://www.librarything.com/catalog/simmons_hall',
				label: 'Catalog',
				badge: '',
				groupNeeded: ['USER']
			},
			{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '', groupNeeded: ['USER'] }
		]
	},
	{
		id: 'desk',
		name: 'Desk',
		value: 7,
		icon: Mails,
		links: [
			{
				href: `${dbBase}/desk/calendar`,
				label: 'Desk Shift Calendar',
				badge: '',
				groupNeeded: ['USER']
			}
		]
	}
];
