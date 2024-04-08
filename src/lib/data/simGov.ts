interface office {
	title: string;
	full_title: string;
	description: string;
}

interface person {
	name: string;
	full_name: string;
	year?: string;
	room?: string;
	phone?: string;
	email?: string;
	facebook?: string;
	photo: string;
}

// Contains details for offices.
export const offices = {
	president: {
		title: 'President',
		full_title: 'President',
		description:
			"<p><h1>The President is the chief diplomat of Simmons Hall and the administrator of the House's external affairs.</h1></p> <p>The President is responsible for: <ol type='a'><li>being the primary representative of the House to any outside groups, including, but not limited to, the Simmons' caterer, other dormitories and living groups, student governments, other student groups, MIT administration, MIT faculty, and groups outside MIT; </li><li>presenting the official opinion of the House, as determined by the House, to the aforementioned groups; </li><li>advocating and negotiating on behalf of Simmons Hall to the aforementioned groups; </li><li>presenting items for discussion and decision by the House on behalf of the aforementioned outside groups; </li><li>representing Simmons Hall to the Dormitory Council and casting votes on behalf of Simmons Hall; </li><li>communicating regularly with the Housemasters; </li><li>reporting regularly to the House; </li><li>inviting outside guests to address the House; </li><li>directly overseeing the Recruitment Chairs, Athletics Chair, and Publicity Chair.</li></ol></p>"
	},
	treasurer: {
		title: 'Treasurer',
		full_title: 'Treasurer',
		description:
			"<p><h1>The Treasurer manages the finances of the House and implements the financial decisions made by the House.</h1></p> <p>The Treasurer is responsible for: <ol type='a'><li>receiving signatory privileges for all House bank accounts, including the student activity account maintained by MIT; </li><li>keeping record of all financial decisions made by the House; </li><li>reimbursing individuals for House-related expenses approved by the House; </li><li>reporting at every meeting of the House, presenting the balances of all House bank accounts and an itemized report of all account activity, and making its reports available for viewing by all House Members; </li><li>Treasurer's report should include: current balances, anticipated budgets, and effects of current proposals on the budget.</li></ol></p>"
	},
	house_chair: {
		title: 'House Chair',
		full_title: 'House Chair',
		description:
			"<p><h1>The Chair of the House is the chief administrator of the House's internal affairs.</h1></p> <p>The Chair is responsible for: <ol type='a'><li>creating and distributing to all members a schedule of House meetings for each academic semester, prior to the start of that semester; </li><li>explaining to the House how House meetings work at the start of each semester; </li><li>adding proposals to the agenda of the upcoming House meeting; </li><li>creating and distributing the agenda for each House meeting at least one day prior to the start of that meeting; </li><li>facilitating and maintaining order at all meetings of the House, following an established set of procedures and conducting meetings in a fair way that allows all members an opportunity to speak; </li><li>conducting elections; </li><li>generally overseeing the business of the House and directly overseeing the Social Chair, Facilities Chair, Technology Chair and the Rooming Chairs.</li></ol></p>"
	},
	secretary: {
		title: 'Secretary',
		full_title: 'Secretary',
		description:
			"<p><h1>The Secretary documents all business of the House</h1></p><p>The Secretary is responsible for: <ol type='a'><li>documenting all business of the House; </li><li>keeping a public record of all decisions made by the House; </li><li>maintaining an archive to ensure that such documentation is available to all present and future House members; </li><li>maintaining a public record of the events and discussions that happen in the House and presenting those records at every house meeting;</li><li>running full forum votes by publicly posting a description of the measure(s) being voted on, then issuing a ballot on said measures to be concluded before the next house meeting; </li><li>serving in lieu of the Chair of the House if the Chair is temporarily unable to serve.</li></ol></p>"
	},
	rooming_chair_1: {
		title: 'Rooming',
		full_title: 'Rooming Chair',
		description:
			"<p><h1>The Rooming Chairs manage room assignments for new and continuing residents according to the Rooming Policies.</h1></p> <p>There are always two Rooming Chairs. At each election, the House elects an individual to serve as Rooming Chair for a two year term.</p> <p>The Rooming Chairs are responsible for: <ol type='a'><li>managing and executing the Rooming Policies; </li><li>maintaining a record of all Simmons Hall residents and their assigned rooms; </li><li>communicating regularly with the Housemasters, House Manager and Desk Captain; </li><li>communicating with the MIT Housing Office and DormCon Housing Committee on housing-related issues, with the assistance of the President; </li><li>providing assistance to the Desk Captain upon request whenever residents are moving into or out of the building; </li><li>reporting regularly to the House Chair and the House.</li></ol></p> "
	},
	rooming_chair_2: {
		title: 'Rooming',
		full_title: 'Rooming Chair',
		description:
			"<p><h1>The Rooming Chairs manage room assignments for new and continuing residents according to the Rooming Policies.</h1></p> <p>There are always two Rooming Chairs. At each election, the House elects an individual to serve as Rooming Chair for a two year term.</p> <p>The Rooming Chairs are responsible for: <ol type='a'><li>managing and executing the Rooming Policies; </li><li>maintaining a record of all Simmons Hall residents and their assigned rooms; </li><li>communicating regularly with the Housemasters, House Manager and Desk Captain; </li><li>communicating with the MIT Housing Office and DormCon Housing Committee on housing-related issues, with the assistance of the President; </li><li>providing assistance to the Desk Captain upon request whenever residents are moving into or out of the building; </li><li>reporting regularly to the House Chair and the House.</li></ol></p> "
	},
	history_chair: {
		title: 'History',
		full_title: 'Historian',
		description:
			"<p><h1>The Historian is tasked with the high-level goal of preserving a record of Simmons history for future students and alumni.</h1></p><p>The Historian will be responsible for <ol type='a'><li>ensuring the biweekly records written by the Secretary are complete; </li><li>assisting the Publicity Chair with the writing and publishing of the alumni newsletter; </li><li>creating a yearly retrospective as a high-level and student-opinion-aware summary of the year.</li></ol></p>"
	},
	social_chair: {
		title: 'Social',
		full_title: 'Social Chair',
		description:
			'<p><h1>The Social Chair leads the Social Committee comprised of all lounge representatives.</h1></p><p>The Social Chair is responsible for regularly reporting to the House Chair and the House. The Social Committee is responsible for organizing several House wide events each term.</p>'
	},
	technology_chair: {
		title: 'Technology',
		full_title: 'Technology Chair',
		description:
			"<p><h1>The Technology Chair leads the Technology Committee that maintains the computing resources managed by the House.</h1></p><p>The Technology Chair is responsible for <ol type='a'><li>organizing, scheduling and running meetings of the Technology Committee; </li><li>ensuring that the Technology Committee accomplishes its goals; </li><li>reporting to the House Chair; </li><li>reporting regularly to the House.</li></ol></p><p>The Technology Committee is responsible for: <ol type='a'><li>debugging and updating the Simmons Database System, House mailing lists, and House web server; </li><li>proposing, implementing, and maintaining technological solutions to meet and improve other House computing needs.</li></ol></p>"
	},
	athletics_chair: {
		title: 'Athletics',
		full_title: 'Athletics Chair',
		description:
			"<p><h1>The Athletics Chair heads the Athletic Committee made up of the Simmons' Intramural team captains.</h1></p><p>The Athletics Chair shall be responsible for <ol type='a'><li>organizing and coordinating House participation in external athletic programs, especially the MIT Intramural Sports Program </li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol></p><p>The Athletics Chair should communicate with the administrators of the MIT Intramural Sports Program and take steps to coordinate Simmons' involvement including, but not limited to, surveying interest in participating in a given sport, and helping to recruit members for intramural teams. The Athletics Chair should report regularly to the House regarding the status of the House's participation in Intramural Sports.</p>"
	},
	frosh_1: {
		title: 'FROSH',
		full_title: 'Recruitment Chair',
		description:
			"<p><h1>The Recruitment Chairs lead the Recruitment Committee in overseeing all activities related to the housing selection process for incoming new students.</h1></p><p>At each election, the House will elect two individuals to serve as Recruitment Chairs for one-year terms.</p><p>The Recruitment Chairs are responsible for <ol type='a'><li>organizing, scheduling and running meetings of the Recruitment Committee; </li><li>ensuring that the Recruitment Committee accomplishes its goals; </li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol></p><p>The Recruitment Committee is responsible for: <ol type='a'><li>working with the Publicity Chair to produce material for the Interactive Introduction to the Institute (I3) video, the Guide to First-Year Residences, and any other material sent to incoming students regarding residential life; </li><li>overseeing the planning and organization of events during Campus Preview Weekend and Orientation Week for prospective or incoming students; </li><li>providing assistance to the Desk Captain during any times at which residents are moving into or out of the building; </li><li>communicating with the DormCon Residence Orientation Chair, I3 staff, and administration on any of the above issues, with the assistance of the President.</li></ol></p><p>The Recruitment Committee recruits specific volunteers to undertake particular activities, such as the production of the I3 video, or organizing a Campus Preview Weekend party. These volunteers are automatically and necessarily considered members of the Recruitment Committee.</p><p>The Recruitment Committee may request that its members be granted early returns from DormCon for Orientation Week. Only members of the Recruitment Committee who assist in the organization or implementation of Orientation week activities may be granted early returns.</p>"
	},
	frosh_2: {
		title: 'FROSH',
		full_title: 'Recruitment Chair',
		description:
			"<p><h1>The Recruitment Chairs lead the Recruitment Committee in overseeing all activities related to the housing selection process for incoming new students.</h1></p><p>At each election, the House will elect two individuals to serve as Recruitment Chairs for one-year terms.</p><p>The Recruitment Chairs are responsible for <ol type='a'><li>organizing, scheduling and running meetings of the Recruitment Committee; </li><li>ensuring that the Recruitment Committee accomplishes its goals; </li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol></p><p>The Recruitment Committee is responsible for: <ol type='a'><li>working with the Publicity Chair to produce material for the Interactive Introduction to the Institute (I3) video, the Guide to First-Year Residences, and any other material sent to incoming students regarding residential life; </li><li>overseeing the planning and organization of events during Campus Preview Weekend and Orientation Week for prospective or incoming students; </li><li>providing assistance to the Desk Captain during any times at which residents are moving into or out of the building; </li><li>communicating with the DormCon Residence Orientation Chair, I3 staff, and administration on any of the above issues, with the assistance of the President.</li></ol></p><p>The Recruitment Committee recruits specific volunteers to undertake particular activities, such as the production of the I3 video, or organizing a Campus Preview Weekend party. These volunteers are automatically and necessarily considered members of the Recruitment Committee.</p><p>The Recruitment Committee may request that its members be granted early returns from DormCon for Orientation Week. Only members of the Recruitment Committee who assist in the organization or implementation of Orientation week activities may be granted early returns.</p>"
	},
	publicity_chair: {
		title: 'Publicity',
		full_title: 'Publicity Chair',
		description:
			"<p><h1>The Publicity Chair is tasked with the promotion and publicity of the dorm and its events through the use of media content including, but not limited to, posters, flyers, web campaigns, 7K display, and the I3 video.</h1></p><p>The Publicity Chair is responsible for <ol type='a'><li>promoting the dorm; </li><li>assisting the House Team and House Officers in publicizing dorm events; </li><li>writing and releasing an alumni newsletter as a high-level overview of occurrences at Simmons;</li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	facilities_chair: {
		title: 'Facilities',
		full_title: 'Facilities Chair',
		description:
			"<p><h1>The Facilities Chair leads the Facilities Committee comprised of the Electrical Engineering Lab Chair, the Library Chair, the Entertainment Chair, the Reservations Chair, and the Workshop Chair.</h1></p><p>The Facilities Chair is responsible for <ol type='a'><li>organizing, scheduling and running meetings of the Facilities Committee; </li><li>ensuring that the Electrical Engineering Lab Chair, the Library Chair, the Entertainment Chair, the Reservations Chair, and the Workshop Chair fulfill their jobs to their fullest extent; </li><li>working with the House Manager to accomplish tasks; </li><li>reporting to the House Chair; </li><li>reporting regularly to the House.</li></ol></p><p>The Facilities Committee is responsible for creating, recommending, and overseeing the implementation of policies regarding the use of House-owned equipment and spaces.</p>"
	},
	ee_lab_chair: {
		title: 'EE Lab',
		full_title: 'EE Lab Chair',
		description:
			"<p><h1>The Electrical Engineering Lab Chair is part of the Facilities Committee and maintains the lab facility on the seventh floor.</h1></p><p>The Electrical Engineering Lab Chair is responsible for <ol type='a'><li>organizing training sessions for residents who want to use the lab </li><li>ensuring that residents are properly trained and certified to use the lab </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	workshop_chair: {
		title: 'Workshop',
		full_title: 'Workshop Chair',
		description:
			"<p><h1>The Workshop Chair is part of the Facilities Committee and maintains the workshop facility in the basement.</h1></p><p>The Workshop Chair must communicate with the administrators of the MIT Environment, Health, and Safety Headquarters to ensure that residents are properly trained and certified to use the workshop.</p><p>The Workshop Chair is responsible for: <ol type='a'><li>organizing training sessions for residents who want to use the workshop; </li><li>communicating with the House Manager to grant card access to the workshop for residents who have been properly trained and certified; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	library_chair: {
		title: 'Library',
		full_title: 'Library Chair',
		description:
			"<p><h1>The Library Chair is part of the Facilities Committee and supervises the library on the second floor.</h1></p><p>The Library Chair is responsible for <ol type='a'><li>creating and maintaining a checkout system for library materials; </li><li>organizing the library; </li><li>obtaining new books when the desire is expressed by the House; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	entertainment_chair: {
		title: 'Entertainment',
		full_title: 'Entertainment Chair',
		description:
			"<p><h1>The Entertainment Chair is part of the Facilities Committee and maintains the Simmons Hall movie, video game, and board game collection.</h1></p><p>The Entertainment Chair is responsible for: <ol type='a'><li>maintaining an easily accessible, public list of movies, video games, and board games; </li><li>soliciting opinions from the House regarding what new movies, video games, board games, or Pay-Per-View programming should be purchased; </li><li>requesting funding for the purchase of new movies, video games, board games and Pay-Per-View programming; </li><li>purchasing new movies, video games, and board games to be added to the Simmons Hall movie collection; </li><li>managing the Pay-Per-View account; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	reservations_chair: {
		title: 'Reservations',
		full_title: 'Reservations Chair',
		description:
			'<p><h1>The Reservations Chair is part of the Facilities Committee and oversees the reservation process of all Simmons public spaces according to the Policies of the Reservations Chair.</h1></p><p>The Reservations Chair is responsible for reporting regularly to the Facilities Chair and the House.</p>'
	},
	kitchen_chair: {
		title: 'Kitchen',
		full_title: 'Kitchen Chair',
		description:
			"<p><h1>The Kitchen Chair is part of the Facilities Committee and maintains the kitchen facilities in Simmons.</h1></p><p>The Kitchen Chair is responsible for: <ol type='a'><li>maintaining a stock of permanent cookware available to Simmons residents;</li><li>maintaining a stock of basic ingredients available to Simmons residents;</li><li>ensuring that residents keep kitchens clean.</li></ol></p>"
	},
	gym_chair: {
		title: 'Gym',
		full_title: 'Gym Chair',
		description:
			"<p><h1>The Gym Chair is part of the Facilities Committee and maintains the Simmons gym.</h1></p><p>The Gym Chair is responsible for: <ol type='a'><li>maintaining the safety and equipment standards of the machines and implements in the gym;</li><li>holding training sessions that promote proper use of gym equipment and the physical fitness of Simmons residents.</li></ol></p>"
	},

	// HOUSE TEAM
	housemaster: {
		title: 'Heads of House',
		full_title: 'Heads of House',
		description:
			'John and Ellen Essignmann are the Heads of House for Simmons Hall. As heads of house, they lead the House Team, supervise the GRTs, and take a lead role in building community and supporting and advocating for students.'
	},
	associate_housemaster: {
		title: 'Assc. HoH',
		full_title: 'Associate Head of House',
		description:
			'As associate head of house, Steve assists John and Ellen in leading the House Team, building community and supporting and advocating for students, and is particularly involved with the Residential Scholars program at Simmons.'
	},
	rlad: {
		title: 'Area Director',
		full_title: 'Residential Life Area Director',
		description:
			'An Area Director (AD) is a full-time professional employee of the Residential Life Programs office. As a live-in member of the House Team, the AD provides individual assistance to students through personal advising, counseling and crisis intervention.'
	},

	// OTHER
	house_manager: {
		title: 'House Mgr.',
		full_title: 'House Manager',
		description:
			'A House Manager is a full-time employee of the Housing office who is responsible for the operations and facilities of a residence. He or she supervises the front desk, cleaning, and maintenance staff.'
	},
	desk_captain: {
		title: 'Desk Captain',
		full_title: 'Desk Captain',
		description: 'The Desk Captain oversees desk workers.'
	}
} as const satisfies Record<string, office>;

// Contains personal details for people by kerberos.
export const people = {
	ebeltran: {
		name: 'Endy',
		full_name: 'Endy Beltran',
		year: '2022',
		room: '776',
		email: 'ebeltran@mit.edu',
		photo: 'endy.jpg'
	},
	dklahn: {
		name: 'Daniel',
		full_name: 'Daniel Klahn',
		year: '2021',
		room: '733',
		email: 'dlkahn@mit.edu',
		photo: 'snishat-dklahn.jpg'
	},
	snishat: {
		name: 'Shaida',
		full_name: 'Shaida Nishat',
		year: '2022',
		room: '732',
		email: 'snishat@mit.edu',
		photo: 'snishat-dklahn.jpg'
	},
	kwicks: {
		name: 'Kathryn',
		full_name: 'Kathryn Wicks',
		year: '2021',
		room: '966',
		email: 'kwicks@mit.edu',
		photo: 'gkim21-kwicks.jpg'
	},
	aprilxie: {
		name: 'April',
		full_name: 'April Xie',
		year: '2021',
		room: '452',
		email: 'aprilxie@mit.edu',
		photo: 'aprilxie.jpg'
	},
	gkim21: {
		name: 'Gyuna',
		full_name: 'Gyuna Kim',
		year: '2021',
		room: '966',
		email: 'gkim21@mit.edu',
		photo: 'gkim21-kwicks.jpg'
	},
	rujul: {
		name: 'Rujul',
		full_name: 'Rujul Gandhi',
		year: '2022',
		room: '921C',
		email: 'rujul@mit.edu',
		photo: 'photo.jpg'
	},
	quel: {
		name: 'Raquel',
		full_name: 'Raquel Garcia',
		year: '2022',
		room: '225',
		email: 'quel@mit.edu',
		photo: 'photo.jpg'
	},
	sendaoc: {
		name: 'Carlos',
		full_name: 'Carlos Sendao',
		year: '2020',
		room: '741A',
		email: 'sendaoc@mit.edu',
		photo: 'csendao.jpg'
	},
	himawan: {
		name: 'Jenna',
		full_name: 'Jenna Himawan',
		year: '2021',
		room: '549B',
		email: 'himawan@mit.edu',
		photo: 'himawan.png'
	},
	animrick: {
		name: 'Alicia',
		full_name: 'Alicia Nimrick',
		year: '2020',
		room: '866',
		email: 'animrick@mit.edu',
		photo: 'nimrick.jpg'
	},
	ambick: {
		name: 'Amber',
		full_name: 'Amber Bick',
		year: '2021',
		room: '932',
		email: 'ambick@mit.edu',
		photo: 'bick.jpg'
	},
	sidne: {
		name: 'Sidne',
		full_name: 'Sidne Gregory',
		year: '2021',
		room: '428',
		email: 'sidne@mit.edu',
		photo: 'ijb-sidne.jpg'
	},
	jorgenin: {
		name: 'Jorge',
		full_name: 'Jorge Nin',
		year: '2022',
		room: '1066',
		email: 'jorgenin@mit.edu',
		photo: 'jorgenin.jpg'
	},
	adapoz: {
		name: 'Annemarie',
		full_name: 'Annemarie Dapoz',
		year: '2022',
		room: '732',
		email: 'adapoz@mit.edu',
		photo: 'photo.jpg'
	},
	ijb: {
		name: 'Israel',
		full_name: 'Israel Bonilla',
		year: '2021',
		room: '424A',
		email: 'ijb@mit.edu',
		photo: 'ijb-sidne.jpg'
	},
	itorres: {
		name: 'Isabella',
		full_name: 'Isabella Torres',
		year: '2022',
		room: '921B',
		email: 'itorres@mit.edu',
		photo: 'itorres.jpg'
	},
	mayalevy: {
		name: 'Maya',
		full_name: 'Maya Levy',
		year: '2021',
		room: '872',
		email: 'mayalevy@mit.edu',
		photo: 'photo.jpg'
	},
	phoebeli: {
		name: 'Phoebe',
		full_name: 'Phoebe Li',
		year: '2021',
		room: '966',
		email: 'phoebeli@mit.edu',
		photo: 'phoebeli.jpg'
	},
	eobermai: {
		name: 'Liz',
		full_name: 'Elizabeth Obermaier',
		year: '2021',
		room: '932',
		email: 'eobermai@mit.edu',
		photo: 'photo.jpg'
	},
	sneve: {
		name: 'Madison',
		full_name: 'Madison Sneve',
		year: '2022',
		room: '732',
		email: 'sneve@mit.edu',
		photo: 'photo.jpg'
	},
	bsockol: {
		name: 'Ben',
		full_name: 'Ben Sockol',
		year: '2020',
		room: '1032',
		email: 'bsockol@mit.edu',
		photo: 'photo.jpg'
	},
	kdowney: {
		name: 'Katelyn',
		full_name: 'Katelyn Downey',
		year: '2021',
		room: '1040',
		email: 'kdowney@mit.edu',
		photo: 'kdowney-rachel.jpg'
	},
	rmcintos: {
		name: 'Rachel',
		full_name: 'Rachel McIntosh',
		year: '2021',
		room: '1025',
		email: 'rmcintos@mit.edu',
		photo: 'kdowney-rachel.jpg'
	},
	goridkov: {
		name: 'Nicole',
		full_name: 'Nicole Goridkov',
		year: '2021',
		room: '428',
		email: 'goridkov@mit.edu',
		photo: 'goridkov-frzepeda.jpg'
	},
	frzepeda: {
		name: 'Francisco',
		full_name: 'Francisco Zepeda',
		year: '2021',
		room: '653',
		email: 'frzepeda@mit.edu',
		photo: 'goridkov-frzepeda.jpg'
	},
	sborjan: {
		name: 'Stefan',
		full_name: 'Stefan Borjan',
		year: '2022',
		room: '846',
		email: 'sborjan@mit.edu',
		photo: 'stefan_yaseen.jpg'
	},
	yaseen: {
		name: 'Yaseen',
		full_name: 'Yaseen Alkhafaji',
		year: '2021',
		room: '447',
		email: 'yaseen@mit.edu',
		photo: 'stefan_yaseen.jpg'
	},
	axie: {
		name: 'Ari',
		full_name: 'Ari Xie',
		year: '2021',
		room: '636',
		email: 'axie@mit.edu',
		photo: 'axie.jpeg'
	},
	angellop: {
		name: 'Angel',
		full_name: 'Angel Lopez',
		year: '2019',
		room: '779',
		email: 'angellop@mit.edu',
		photo: 'photo.jpg'
	},

	// HOUSE TEAM
	jessig: {
		name: 'John',
		full_name: 'John Essigmann',
		year: '1970',
		room: '265',
		email: 'jessig@mit.edu',
		photo: 'emessig.jpg'
	},
	emessig: {
		name: 'Ellen',
		full_name: 'Ellen Essigmann',
		room: '265',
		email: 'emessig@mit.edu',
		photo: 'emessig.jpg'
	},
	srhall: {
		name: 'Steve',
		full_name: 'Steve Hall',
		year: '1980',
		room: '772',
		email: 'srhall@mit.edu',
		photo: 'srhall.jpg'
	},
	knshann: {
		name: 'Kristen',
		full_name: 'Kristen Shannon',
		room: '580',
		email: 'knshann@mit.edu',
		photo: 'kristin.jpg'
	},

	// OTHER
	nika_h: {
		name: 'Nika',
		full_name: 'Nika Hollingsworth',
		room: 'N/A',
		email: 'nika_h@mit.edu',
		photo: 'nika_h.jpg'
	},
	vacant: {
		name: '-',
		full_name: 'Vacant',
		photo: 'photo.jpg'
	}
} as const satisfies Record<string, person>;

// Maps offices to people by kerberos.
export const incumbents: Record<keyof typeof offices, (keyof typeof people)[]> = {
	// OFFICERS
	president: ['sendaoc'],
	house_chair: ['ambick'],
	treasurer: ['himawan'],
	secretary: ['ebeltran'],

	rooming_chair_1: ['phoebeli'],
	rooming_chair_2: ['animrick'],
	social_chair: ['kwicks', 'gkim21'],
	frosh_1: ['dklahn'],
	frosh_2: ['snishat'],
	technology_chair: ['aprilxie'],

	publicity_chair: ['rujul', 'quel'],
	history_chair: ['axie'],
	facilities_chair: ['jorgenin'],
	athletics_chair: ['ijb', 'sidne'],
	ee_lab_chair: ['adapoz'],
	library_chair: ['sneve', 'bsockol'],
	entertainment_chair: ['itorres'],
	reservations_chair: ['rmcintos', 'kdowney'],
	workshop_chair: ['sborjan', 'yaseen'],
	kitchen_chair: ['goridkov', 'frzepeda'],
	gym_chair: ['eobermai', 'mayalevy'],

	// HOUSE TEAM
	housemaster: ['jessig', 'emessig'],
	associate_housemaster: ['srhall'],
	rlad: ['knshann'],

	// OTHER
	house_manager: ['nika_h'],
	desk_captain: ['angellop', 'sendaoc']
};
