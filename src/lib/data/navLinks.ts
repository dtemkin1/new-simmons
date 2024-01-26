import { base } from '$app/paths';

import {
	Home,
	Vote,
	PersonStanding,
	Package,
	Film,
	Library,
	Settings,
	Mails,
	Bed,
	Users
} from 'lucide-svelte';

import { SDS_BASE } from '$lib/config';

interface HeaderLinks {
	name: string;
	url: `${typeof base}/${string}`;
}

interface SDSLinks {
	href: `${typeof SDS_BASE}/${string}`;
	label: string;
	badge: 'Work in Progress' | 'Incomplete' | string;
	groupNeeded: string[];
}

interface SDSGroups {
	id: string;
	name: string;
	value: number;
	icon: typeof Home;
	links: SDSLinks[];
}

export const headerLinks: HeaderLinks[] = [
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

export const sdsLinks: SDSGroups[] = [
	{
		id: 'home',
		name: 'Simmons DB',
		value: 1,
		icon: Home,
		links: [
			{ href: `${SDS_BASE}/home`, label: 'Home', badge: '', groupNeeded: ['USERS'] },
			{
				href: `${SDS_BASE}/directory`,
				label: 'Directory',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/calendar`,
				label: 'Events Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/reservations`,
				label: 'Reservations Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/officers`,
				label: 'Student Officers',
				badge: 'Work in Progress',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/medlinks`,
				label: 'Medlinks',
				badge: 'Work in Progress',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/advisors`,
				label: 'Associate Advisors',
				badge: 'Work in Progress',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/directory/grt`,
				label: 'GRAs',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/groups/view_mailing_lists`,
				label: 'Mailing Lists',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/polls/polls`,
				label: 'Votes and Polls',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/lotteries`,
				label: 'Lotteries',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{ href: `${SDS_BASE}/users/about`, label: 'About the DB', badge: '', groupNeeded: ['USERS'] }
		]
	},
	{
		id: 'govtracker',
		name: 'GovTracker',
		value: 2,
		icon: Vote,
		links: [
			{
				href: `${SDS_BASE}/loungeexpense`,
				label: 'Lounge Expenses',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/loungeexpense/proposals`,
				label: 'Lounge Event Proposals',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/govtracker/fin-ledger`,
				label: 'House Finances',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/govtracker`,
				label: 'House Meeings',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/govtracker/submitproposal`,
				label: 'Submit a Proposal',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/govtracker/downloadagenda`,
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
				href: `${SDS_BASE}/directory/update`,
				label: 'My Profile',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/users/guestlist`,
				label: 'Guest List',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/users/loungesignup`,
				label: 'Lounge Membership',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/users/password`,
				label: 'Login Password',
				badge: '',
				groupNeeded: ['USERS']
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
				href: `${SDS_BASE}/packages/mypackages`,
				label: 'My Packages',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/packages/checkin`,
				label: 'Package Registration',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${SDS_BASE}/packages/pickup`,
				label: 'Package Pickup',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${SDS_BASE}/packages/viewpackages`,
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
		links: [
			{
				href: `${SDS_BASE}/simmovies/list.php`,
				label: 'List Desk Movies',
				badge: 'Incomplete',
				groupNeeded: ['USERS', 'DESK']
			},
			{
				href: `${SDS_BASE}/simmovies/myloans.php`,
				label: 'My Loans',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/simmovies/checkin.php`,
				label: 'Movie Check In',
				badge: 'Incomplete',
				groupNeeded: ['DESK', 'MOVIEADMINS']
			},
			{
				href: `${SDS_BASE}/simmovies/allloans.php`,
				label: 'Current Loans',
				badge: 'Incomplete',
				groupNeeded: ['MOVIEADMINS']
			},
			{
				href: `${SDS_BASE}/simmovies/list.php`,
				label: 'Manage Movies',
				badge: 'Incomplete',
				groupNeeded: ['MOVIEADMINS']
			}
		]
	},
	{
		id: 'library',
		name: 'Library',
		value: 6,
		icon: Library,
		links: [
			{
				href: 'http://www.librarything.com/catalog/simmons_hall',
				label: 'Catalog',
				badge: '',
				groupNeeded: ['USERS']
			},
			{ href: '/lib_guide.pdf', label: "User's Guide (PDF)", badge: '', groupNeeded: ['USERS'] }
		]
	},
	{
		id: 'administrators',
		name: 'Admin',
		value: 7,
		icon: Settings,
		links: [
			{
				href: `${SDS_BASE}/administrators`,
				label: 'ACL Control Panel',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/administrators/sudo`,
				label: 'Be Another User',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/administrators/options`,
				label: 'Simmons DB Options',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/sds/updateGroupMembershipCache`,
				label: 'Refresh Group Cache',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/groups/refresh_mailing_lists.php`,
				label: 'Refresh Mailing Lists',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: 'https://sql.scripts.mit.edu/phpMyAdmin/',
				label: 'phpPgAdmin',
				badge: '',
				groupNeeded: ['ADMINISTRATORS']
			}
		]
	},
	{
		id: 'desk',
		name: 'Desk',
		value: 8,
		icon: Mails,
		links: [
			{
				href: `${SDS_BASE}/desk/calendar`,
				label: 'Desk Shift Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${SDS_BASE}/desk/full_directory`,
				label: 'Full Directory Listing',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${SDS_BASE}/desk/full_directory`,
				label: 'Search Guest List',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${SDS_BASE}/desk/guestlisthistory`,
				label: 'Guest List History',
				badge: 'Incomplete',
				groupNeeded: ['DESK-CAPTAINS']
			}
		]
	},
	{
		id: 'rooming',
		name: 'Rooming',
		value: 9,
		icon: Bed,
		links: [
			{
				href: `${SDS_BASE}/rac/add`,
				label: 'Add Directory Entry',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/use_directory`,
				label: 'Modify/Remove Entry',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/csv`,
				label: 'Download Directory (csv)',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/batchupdate`,
				label: 'Batch Update (csv)',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/clearrooms`,
				label: 'Clear Rooms',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/lottery`,
				label: 'Rooming Lottery',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/roomstatus`,
				label: 'Room Status Summary',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${SDS_BASE}/rac/roomhistory`,
				label: 'Room History',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			}
		]
	},
	{
		id: 'lounge-admin',
		name: 'Lounge Admin',
		value: 10,
		icon: Users,
		links: [
			{
				href: `${SDS_BASE}/lounges`,
				label: 'Lounge Management',
				badge: 'Incomplete',
				groupNeeded: ['LOUNGE-CHAIRS']
			},
			{
				href: `${SDS_BASE}/lounges/showmembership`,
				label: 'Lounge Membership',
				badge: 'Incomplete',
				groupNeeded: ['LOUNGE-CHAIRS']
			},
			{
				href: `${SDS_BASE}/lounges/editallocations`,
				label: 'Lounge Allocations',
				badge: 'Incomplete',
				groupNeeded: ['FINANCIAL-ADMINS']
			}
		]
	}
];
