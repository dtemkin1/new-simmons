import { base } from '$app/paths';

const dbBase = `${base}/sds`;

import { Home } from 'lucide-svelte';
import { Vote } from 'lucide-svelte';
import { PersonStanding } from 'lucide-svelte';
import { Package } from 'lucide-svelte';
import { Film } from 'lucide-svelte';
import { Library } from 'lucide-svelte';
import { Settings } from 'lucide-svelte';
import { Mails } from 'lucide-svelte';
import { Bed } from 'lucide-svelte';
import { Users } from 'lucide-svelte';

interface HeaderLinks {
	name: string;
	url: `${typeof base}/${string}`;
}

interface SDSLinks {
	href: `${typeof dbBase}/${string}`;
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
			{ href: `${dbBase}/home`, label: 'Home', badge: '', groupNeeded: ['USERS'] },
			{
				href: `${dbBase}/directory`,
				label: 'Directory',
				badge: 'Work in Progress',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/directory/calendar`,
				label: 'Events Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/directory/reservations`,
				label: 'Reservations Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/directory/officers`,
				label: 'Student Officers',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/directory/medlinks`,
				label: 'Medlinks',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/directory/grt`,
				label: 'GRAs',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/groups/view_mailing_lists`,
				label: 'Mailing Lists',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/polls/polls`,
				label: 'Votes and Polls',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/lotteries`,
				label: 'Lotteries',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{ href: `${dbBase}/users/about`, label: 'About the DB', badge: '', groupNeeded: ['USERS'] }
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
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/loungeexpense/proposals`,
				label: 'Lounge Event Proposals',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/govtracker/fin-ledger`,
				label: 'House Finances',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/govtracker`,
				label: 'House Meeings',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/govtracker/submitproposal`,
				label: 'Submit a Proposal',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
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
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/users/guestlist`,
				label: 'Guest List',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/users/loungesignup`,
				label: 'Guest List',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/users/password`,
				label: 'Login Passowrd',
				badge: 'Incomplete',
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
				href: `${dbBase}/packages/mypackages`,
				label: 'My Packages',
				badge: '',
				groupNeeded: ['USERS']
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
		links: [
			{
				href: `${dbBase}/simmovies/list.php`,
				label: 'List Desk Movies',
				badge: 'Incomplete',
				groupNeeded: ['USERS', 'DESK']
			},
			{
				href: `${dbBase}/simmovies/myloans.php`,
				label: 'My Loans',
				badge: 'Incomplete',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/simmovies/checkin.php`,
				label: 'Movie Check In',
				badge: 'Incomplete',
				groupNeeded: ['DESK', 'MOVIEADMINS']
			},
			{
				href: `${dbBase}/simmovies/allloans.php`,
				label: 'Current Loans',
				badge: 'Incomplete',
				groupNeeded: ['MOVIEADMINS']
			},
			{
				href: `${dbBase}/simmovies/list.php`,
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
				href: `${dbBase}/administrators`,
				label: 'ACL Control Panel',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${dbBase}/administrators/sudo`,
				label: 'Be Another User',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${dbBase}/administrators/options`,
				label: 'Simmons DB Options',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${dbBase}/sds/updateGroupMembershipCache`,
				label: 'Refresh Group Cache',
				badge: 'Incomplete',
				groupNeeded: ['ADMINISTRATORS']
			},
			{
				href: `${dbBase}/groups/refresh_mailing_lists.php`,
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
				href: `${dbBase}/desk/calendar`,
				label: 'Desk Shift Calendar',
				badge: '',
				groupNeeded: ['USERS']
			},
			{
				href: `${dbBase}/desk/full_directory`,
				label: 'Full Directory Listing',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${dbBase}/desk/full_directory`,
				label: 'Search Guest List',
				badge: 'Incomplete',
				groupNeeded: ['DESK']
			},
			{
				href: `${dbBase}/desk/guestlisthistory`,
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
				href: `${dbBase}/rac/add`,
				label: 'Add Directory Entry',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/use_directory`,
				label: 'Modify/Remove Entry',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/csv`,
				label: 'Download Directory (csv)',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/batchupdate`,
				label: 'Batch Update (csv)',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/clearrooms`,
				label: 'Clear Rooms',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/lottery`,
				label: 'Rooming Lottery',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/roomstatus`,
				label: 'Room Status Summary',
				badge: 'Incomplete',
				groupNeeded: ['RAC', 'ADMINISTRATORS']
			},
			{
				href: `${dbBase}/rac/roomhistory`,
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
				href: `${dbBase}/lounges`,
				label: 'Lounge Management',
				badge: 'Incomplete',
				groupNeeded: ['LOUNGE-CHAIRS']
			},
			{
				href: `${dbBase}/lounges/showmembership`,
				label: 'Lounge Membership',
				badge: 'Incomplete',
				groupNeeded: ['LOUNGE-CHAIRS']
			},
			{
				href: `${dbBase}/lounges/editallocations`,
				label: 'Lounge Allocations',
				badge: 'Incomplete',
				groupNeeded: ['FINANCIAL-ADMINS']
			}
		]
	}
];
