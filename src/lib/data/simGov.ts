export interface Office {
	title: string;
	full_title: string;
	description: string;
}

export interface Person {
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
			"<h1>The President is the chief diplomat of Simmons Hall and the administrator of the House's external affairs.</h1> <p>The President is responsible for: </p> <ol type='a'><li>being the primary representative of the House to any outside groups, including, but not limited to, the Simmons' caterer, other dormitories and living groups, student governments, other student groups, MIT administration, MIT faculty, and groups outside MIT; </li><li>presenting the official opinion of the House, as determined by the House, to the aforementioned groups; </li><li>advocating and negotiating on behalf of Simmons Hall to the aforementioned groups; </li><li>presenting items for discussion and decision by the House on behalf of the aforementioned outside groups; </li><li>representing Simmons Hall to the Dormitory Council and casting votes on behalf of Simmons Hall; </li><li>communicating regularly with the Housemasters; </li><li>reporting regularly to the House; </li><li>inviting outside guests to address the House; </li><li>directly overseeing the FROSH Chairs, Athletics Chair, and Publicity Chair.</li></ol>"
	},
	treasurer: {
		title: 'Treasurer',
		full_title: 'Treasurer',
		description:
			"<h1>The Treasurer manages the finances of the House and implements the financial decisions made by the House.</h1> <p>The Treasurer is responsible for: </p> <ol type='a'><li>receiving signatory privileges for all House bank accounts, including the student activity account maintained by MIT; </li><li>keeping record of all financial decisions made by the House; </li><li>reimbursing individuals for House-related expenses approved by the House; </li><li>reporting at every meeting of the House, presenting the balances of all House bank accounts and an itemized report of all account activity, and making its reports available for viewing by all House Members; </li><li>Treasurer's report should include: current balances, anticipated budgets, and effects of current proposals on the budget.</li></ol>"
	},
	house_chair: {
		title: 'House Chair',
		full_title: 'House Chair',
		description:
			"<h1>The Chair of the House is the chief administrator of the House's internal affairs.</h1> <p>The Chair is responsible for: </p> <ol type='a'><li>creating and distributing to all members a schedule of House meetings for each academic semester, prior to the start of that semester; </li><li>explaining to the House how House meetings work at the start of each semester; </li><li>adding proposals to the agenda of the upcoming House meeting; </li><li>creating and distributing the agenda for each House meeting at least one day prior to the start of that meeting; </li><li>facilitating and maintaining order at all meetings of the House, following an established set of procedures and conducting meetings in a fair way that allows all members an opportunity to speak; </li><li>conducting elections; </li><li>generally overseeing the business of the House and directly overseeing the Historian, Social Chairs, Facilities, Inventory, and Sustainability Chair (FISCHair, pronounced Fish Chair), Technology Chair and the Rooming Chairs (also known as \"Scootah Hockey Draft Moderatahs\").</li></ol>"
	},
	secretary: {
		title: 'Secretary',
		full_title: 'Secretary',
		description:
			"<h1>The Secretary documents all business of the House</h1><p>The Secretary is responsible for: </p><ol type='a'><li>documenting all business of the House; </li><li>keeping a public record of all decisions made by the House; </li><li>maintaining an archive to ensure that such documentation is available to all present and future House members; </li><li>maintaining a public record of the events and discussions that happen in the House and presenting those records at every house meeting;</li><li>running full forum votes by publicly posting a description of the measure(s) being voted on, then issuing a ballot on said measures to be concluded before the next house meeting; </li><li>serving in lieu of the Chair of the House if the Chair is temporarily unable to serve; </li><li>updating the Constitution with all approved Constitutional Amendments.</li></ol>"
	},
	rooming_chair: {
		title: 'Rooming',
		full_title: 'Rooming Chair',
		description:
			"<h1>The Rooming Chairs manage room assignments for new and continuing residents according to the Rooming Policies.</h1><p>There are always two Rooming Chairs. At each election, the House elects an individual to serve as Rooming Chair for a two year term.</p> <p>The Rooming Chairs are responsible for: <ol type='a'><li>managing and executing the Rooming Policies; </li><li>maintaining a record of all Simmons Hall residents and their assigned rooms; </li><li>communicating regularly with the Housemasters, House Manager and Desk Captain; </li><li>communicating with the MIT Housing Office and DormCon Housing Committee on housing-related issues, with the assistance of the President; </li><li>providing assistance to the Desk Captain upon request whenever residents are moving into or out of the building; </li><li>reporting regularly to the House Chair and the House.</li></ol>"
	},
	historian: {
		title: 'History',
		full_title: 'Historian',
		description:
			"<h1>The Historian is tasked with the high-level goal of preserving a record of Simmons history for future students and alumni.</h1><p>The Historian will be responsible for </p><ol type='a'><li>ensuring the biweekly records written by the Secretary are complete; </li><li>assisting the Publicity Chair with the writing and publishing of the alumni newsletter; </li><li>creating a yearly retrospective as a high-level and student-opinion-aware summary of the year.</li></ol><p>The Historian is responsible for ensuring that the history recorded by the Secretary, the Publicity Chair, and the Historian is as unbiased as possible and reflects student opinions.</p>"
	},
	social_chair: {
		title: 'Social',
		full_title: 'Social Chair',
		description:
			'<h1>The Social Chairs leads the Social Committee. Any interested resident of the dorm may be a member of the Social Committee.</h1><p>The Social Chair is responsible for regularly reporting to the House Chair and the House. The Social Committee is responsible for organizing several House wide events each term. In addition, the Social Committee is responsible for interfacing with lounges and their representatives and ensuring that the lounge system is operating correctly. The Social Chairs shall have the power to create Social Committee subcommittees to organize more specific or long-term social events and functions.</p>'
	},
	technology_chair: {
		title: 'Technology',
		full_title: 'Technology Chair',
		description:
			"<h1>The Technology Chair leads the Technology Committee that maintains the computing resources managed by the House.</h1><p>The Technology Chair is responsible for </p><ol type='a'><li>organizing, scheduling and running meetings of the Technology Committee; </li><li>ensuring that the Technology Committee accomplishes its goals; </li><li>reporting to the House Chair; </li><li>reporting regularly to the House.</li></ol><p>The Technology Committee is responsible for: <ol type='a'><li>debugging and updating the Simmons Database System, House mailing lists, and House web server; </li><li>proposing, implementing, and maintaining technological solutions to meet and improve other House computing needs.</li></ol><p>The Technology Committee must maintain high standards of confidentiality and ethics when dealing with the Simmons database and sensitive issues.</p>"
	},
	athletics_chair: {
		title: 'Athletics',
		full_title: 'Athletics Chair',
		description:
			"<h1>The Athletics Chair heads the Athletic Committee made up of the Simmons' Intramural team captains.</h1><p>The Athletics Chair shall be responsible for </p><ol type='a'><li>organizing and coordinating House participation in external athletic programs, especially the MIT Intramural Sports Program </li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol><p>The Athletics Chair should communicate with the administrators of the MIT Intramural Sports Program and take steps to coordinate Simmons' involvement including, but not limited to, surveying interest in participating in a given sport, and helping to recruit members for intramural teams. The Athletics Chair should report regularly to the House regarding the status of the House's participation in Intramural Sports.</p><p>The Athletics Chair will also have an oversight role over the various Intramural teams and should take steps to ensure that teams remain active in their league and do not incur punitive fines. The Athletics Chair can recommend to the House not to fund historically negligent teams.</p>"
	},
	frosh_chair: {
		title: 'FROSH Chair',
		full_title: 'Freshmen Recruitment Organizers for Simmons Hall (FROSH) Chairs',
		description:
			"<h1>The FROSH Chairs lead the FROSH Committee in overseeing all activities related to the housing selection process for incoming new students.</h1><p>At each election, the House will elect two individuals to serve as FROSH Chairs for one-year terms.</p><p>The Recruitment Chairs are responsible for </p><ol type='a'><li>organizing, scheduling and running meetings of the FROSH Committee; </li><li>ensuring that the FROSH Committee accomplishes its goals; </li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol><p>The FROSH Committee is responsible for: </p><ol type='a'><li>working with the Publicity Chair to produce material for the Interactive Introduction to the Institute (i3) video, the Guide to First-Year Residences, and any other material sent to incoming students regarding residential life; </li><li>overseeing the planning and organization of events during Campus Preview Weekend and Orientation Week for prospective or incoming students; </li><li>providing assistance to the Desk Captain during any times at which residents are moving into or out of the building; </li><li>communicating with the DormCon Residence Orientation Chair, i3 staff, and administration on any of the above issues, with the assistance of the President.</li></ol><p>The FROSH Committee recruits specific volunteers to undertake particular activities, such as the production of the i3 video, or organizing a Campus Preview Weekend party. These volunteers are automatically and necessarily considered members of the FROSH Committee.</p><p>The FROSH Committee may request that its members be granted early returns from DormCon for Orientation Week. Only members of the FROSH Committee who assist in the organization or implementation of Orientation week activities may be granted early returns.</p>"
	},
	publicity_chair: {
		title: 'Publicity',
		full_title: 'Publicity Chair',
		description:
			"<h1>The Publicity Chair is tasked with the promotion and publicity of the dorm and its events through the use of media content including, but not limited to, posters, flyers, web campaigns, 7K display, and the i3 video.</h1><p>The Publicity Chair is responsible for </p><ol type='a'><li>promoting the dorm; </li><li>assisting the House Team and House Officers in publicizing dorm events; </li><li>writing and releasing an alumni newsletter as a high-level overview of occurrences at Simmons;</li><li>reporting to the President; </li><li>reporting regularly to the House.</li></ol>"
	},
	fisch_chair: {
		title: 'FISCHair',
		full_title: 'Facilities, Inventory, and Sustainability Chair (FISCHair)',
		description:
			"<h1>The FISCHair leads the Facilities Committee comprised of the Electrical Engineering Lab Chair, the Library Chair, the Entertainment Chair, the Reservations Chair, the Workshop Chair, the Kitchen Chair, and the Gym Chair.</h1><p>The Facilities Chair is responsible for </p><ol type='a'><li>organizing, scheduling and running meetings of the Facilities Committee; </li><li>ensuring that the Electrical Engineering Lab Chair, the Library Chair, the Entertainment Chair, the Reservations Chair, the Workshop Chair, the Kitchen Chair, and the Gym Chair fulfill their jobs to their fullest extent; </li><li>overseeing inventory reports from the above chairs; </li><li>working with the House Manager to accomplish tasks; </li><li>creating a frequent (at least monthly), publicly available sustainability report detailing the environmental impact of the House; </li><li>creating initiatives to improve said sustainability report; </li><li>reporting to the House Chair; </li><li>reporting regularly to the House.</li></ol></p><p>The Facilities Committee is responsible for creating, recommending, and overseeing the implementation of policies regarding the use of House-owned equipment and spaces.</p>"
	},
	ee_lab_chair: {
		title: 'EE Lab',
		full_title: 'Electrical Engineering Lab Chair',
		description:
			"<h1>The Electrical Engineering Lab Chair is part of the Facilities Committee and maintains the lab facility on the seventh floor.</h1><p>The Electrical Engineering Lab Chair is responsible for </p><ol type='a'><li>organizing training sessions for residents who want to use the lab </li><li>ensuring that residents are properly trained and certified to use the lab </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	workshop_chair: {
		title: 'Workshop',
		full_title: 'Workshop Chair',
		description:
			"<h1>The Workshop Chair is part of the Facilities Committee and maintains the workshop facility in the basement.</h1><p>The Workshop Chair must communicate with the administrators of the MIT Environment, Health, and Safety Headquarters to ensure that residents are properly trained and certified to use the workshop.</p><p>The Workshop Chair is responsible for: <ol type='a'><li>organizing training sessions for residents who want to use the workshop; </li><li>communicating with the House Manager to grant card access to the workshop for residents who have been properly trained and certified; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol>"
	},
	library_chair: {
		title: 'Library',
		full_title: 'Library Chair',
		description:
			"<h1>The Library Chair is part of the Facilities Committee and supervises the library on the second floor.</h1><p>The Library Chair is responsible for </p><ol type='a'><li>creating and maintaining a checkout system for library materials; </li><li>organizing the library; </li><li>obtaining new books when the desire is expressed by the House; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	entertainment_chair: {
		title: 'Entertainment',
		full_title: 'Entertainment Chair',
		description:
			"<h1>The Entertainment Chair is part of the Facilities Committee and maintains the Simmons Hall movie, video game, and board game collection.</h1><p>The Entertainment Chair is responsible for: </p><ol type='a'><li>maintaining an easily accessible, public list of movies, video games, and board games; </li><li>soliciting opinions from the House regarding what new movies, video games, board games, or Pay-Per-View programming should be purchased; </li><li>requesting funding for the purchase of new movies, video games, board games and Pay-Per-View programming; </li><li>purchasing new movies, video games, and board games to be added to the Simmons Hall movie collection; </li><li>managing the Pay-Per-View account; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol></p>"
	},
	reservations_chair: {
		title: 'Reservations',
		full_title: 'Reservations Chair',
		description:
			'<h1>The Reservations Chair is part of the Facilities Committee and oversees the reservation process of all Simmons public spaces according to the Policies of the Reservations Chair.</h1><p>The Reservations Chair is responsible for reporting regularly to the Facilities Chair and the House.</p>'
	},
	kitchen_chair: {
		title: 'Kitchen',
		full_title: 'Kitchen Chair',
		description:
			"<h1>The Kitchen Chair is part of the Facilities Committee and maintains the kitchen facilities in Simmons.</h1><p>The Kitchen Chair is responsible for: </p><ol type='a'><li>maintaining a stock of permanent cookware available to Simmons residents;</li><li>maintaining a stock of basic ingredients available to Simmons residents;</li><li>ensuring that residents keep kitchens clean.</li></ol>"
	},
	gym_chair: {
		title: 'Gym',
		full_title: 'Gym Chair',
		description:
			"<h1>The Gym Chair is part of the Facilities Committee and maintains the gym in Simmons.</h1><p>The Gym Chair is responsible for: </p><ol type='a'><li>maintaining the safety and equipment standards of the machines and implements in the gym;</li><li>holding training sessions that promote proper use of gym equipment and the physical fitness of Simmons residents.</li></ol>"
	},
	craft_room_chair: {
		title: 'Craft Room',
		full_title: 'Craft Room Chair',
		description:
			'<h1>The Craft Room Chair is part of the Facilities Committee and supervises the Craft Room on the second floor.</h1><p>The Craft Room Chair is responsible for: </p><ol type="a"><li>keeping the Craft Room well-organized and clean; </li><li>keeping inventory of the materials in the Craft Room and restocking existing supplies as necessary; </li><li>communicating with residents regarding desired new materials to add and stocking the Craft Room accordingly; </li><li>reporting to the Facilities Chair; </li><li>reporting regularly to the House.</li></ol>'
	},
	dining_chair: {
		title: 'Dining',
		full_title: 'Dining Chair',
		description:
			'<p>The Dining Chair is responsible for </p><ol type="a"><li>communicating with the Simmons dining manager as needed; </li><li>encouraging use of feedback forms for dining; </li><li>listening to student opinions on dining and advocating on behalf of Simmons residents; </li><li>Dattending DormCon dining meetings.</li></ol>'
	},

	// HOUSE TEAM
	hoh: {
		title: 'Heads of House',
		full_title: 'Heads of House',
		description:
			'<h1>The Heads of House are appointed to their positions by the Office of the Dean for Student Life. They are expected to integrate fully into Simmons and to support the entire dorm socially and intellectually.</h1><p>The Head of House role in Simmons falls into four areas:</p><ol type="a"><li>hold frequent social events, and participate actively in the social events held by House residents, in order to get to know as many undergraduates as possible; </li><li>help residents deal with problems, ranging from inter-personal or inter-group issues to those of a highly personal and individual nature; </li><li>supervise the Graduate Resident Advisors; </li><li>report to the rest of the MIT faculty and to the MIT administration.</li></ol>'
	},
	associate_hoh: {
		title: 'Assc. HoH',
		full_title: 'Associate Head of House',
		description:
			'<h1>The Associate Heads of House are appointed to their positions by the Office of the Dean for Student Life. They are expected to integrate fully into Simmons and to support the entire dorm socially and intellectually.</h1><p>The Head of House role in Simmons falls into four areas:</p><ol type="a"><li>hold frequent social events, and participate actively in the social events held by House residents, in order to get to know as many undergraduates as possible; </li><li>help residents deal with problems, ranging from inter-personal or inter-group issues to those of a highly personal and individual nature; </li><li>supervise the Graduate Resident Advisors; </li><li>report to the rest of the MIT faculty and to the MIT administration.</li></ol>'
	},
	area_director: {
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
} as const satisfies Record<string, Office>;

// Contains personal details for people by kerberos.
export const people = {
	mtala: {
		name: 'Miguel',
		full_name: 'Miguel Talamantez',
		year: '2025',
		room: '741B',
		email: 'mtala@mit.edu',
		phone: '6194935702',
		// facebook: 'Miguel Talamantez',
		photo: 'mtala.jpg'
	},
	ejrice: {
		name: 'Elijah',
		full_name: 'Elijah Rice',
		year: '2027',
		room: '729',
		email: 'ejrice@mit.edu',
		phone: '5598190360',
		photo: 'ejrice.png'
	},
	dtemkin: {
		name: 'Diego',
		full_name: 'Diego Temkin',
		year: '2026',
		room: '631C',
		email: 'dtemkin@mit.edu',
		photo: 'dtemkin.jpg'
	},
	ashhong: {
		name: 'Ash',
		full_name: 'Ash Hong',
		year: '2026',
		room: '733',
		photo: 'ashhong.png'
	},
	elwright: {
		name: 'Elizabeth',
		full_name: 'Elizabeth Wright',
		year: '2026',
		room: '537',
		email: 'elwright@mit.edu',
		photo: 'elwright.png'
	},
	beap: {
		name: 'Bella',
		full_name: 'Bella Aparicio',
		photo: 'photo.jpg',
		year: '2026',
		email: 'beap@mit.edu'
	},
	djperrea: {
		name: 'David',
		full_name: 'David Perreault',
		photo: 'djperrea-hhn.jpeg',
		year: '1997',
		email: 'djperrea@mit.edu',
		phone: '617-312-5966',
		room: '365'
	},
	kelton: {
		name: 'Kelton',
		full_name: 'Kelton Aldridge',
		photo: 'kelton.png',
		year: '2027',
		email: 'kelton@mit.edu'
	},
	apputnam: {
		name: 'Amanda',
		full_name: 'Amanda Putnam',
		photo: 'apputnam.jpeg',
		room: '580',
		email: 'apputnam@mit.edu',
		phone: '6177191866'
	},
	kanotung: {
		name: 'Kano',
		full_name: 'Kanokwan Tungkitkancharoen',
		photo: 'avalos10-kanotung.jpeg',
		year: '2025',
		room: '478',
		email: 'kanotung@mit.edu',
		phone: '223-241-5365'
		// facebook: 'kanokwantung'
	},
	avalos10: {
		name: 'Servando',
		full_name: 'Servando Avalos',
		photo: 'avalos10-kanotung.jpeg',
		year: '2026'
	},

	// not yet filled out the google form, data from simmons db...
	ggirard: {
		name: 'Gabbie',
		full_name: 'Gabbie Girard',
		photo: 'photo.jpg'
	},
	mariojsm: {
		name: 'Mario',
		full_name: 'Mario Sánchez Méndez',
		photo: 'photo.jpg'
	},
	smoulder: {
		name: 'Summer',
		full_name: 'Summer Moulder',
		photo: 'photo.jpg'
	},
	eitanc27: {
		name: 'Eitan',
		full_name: 'Eitan Camacho',
		photo: 'photo.jpg'
	},
	deeptag: {
		name: 'Deepta',
		full_name: 'Deepta Gupta',
		photo: 'photo.jpg'
	},
	jenna49: {
		name: 'Jenna',
		full_name: 'Jenna Blair',
		photo: 'photo.jpg'
	},
	tuviedo: {
		name: 'Tessa',
		full_name: 'Tessa Uviedo',
		photo: 'photo.jpg'
	},
	mlstagg: {
		name: 'Mateo',
		full_name: 'Mateo Stagg',
		photo: 'photo.jpg'
	},
	ijuarez: {
		name: 'Isa',
		full_name: 'Isa Juarez',
		photo: 'photo.jpg'
	},
	htejada: {
		name: 'Hannah',
		full_name: 'Hannah Tejada',
		photo: 'photo.jpg'
	},
	amiyares: {
		name: 'Amanda',
		full_name: 'Amanda Miayres',
		photo: 'photo.jpg'
	},
	nic26: {
		name: 'Nicole',
		full_name: 'Nicole Schmidt',
		photo: 'photo.jpg'
	},
	alpeng: {
		name: 'Amber',
		full_name: 'Amber Peng',
		photo: 'photo.jpg'
	},
	maguiar: {
		name: 'Maria',
		full_name: 'Maria Aguiar',
		photo: 'photo.jpg'
	},
	nbuono: {
		name: 'Nicolaniello',
		full_name: 'Nicolaniello Buono',
		photo: 'photo.jpg'
	},
	tylon: {
		name: 'Tyler',
		full_name: 'Tyler Nguyen',
		photo: 'photo.jpg'
	},
	kkummel: {
		name: 'Koko',
		full_name: 'Koko Kummel',
		photo: 'photo.jpg'
	},
	fdma2405: {
		name: 'David',
		full_name: 'David Mora Armendariz',
		photo: 'photo.jpg'
	},
	faris: {
		name: 'Faris',
		full_name: 'Faris Elnager',
		photo: 'photo.jpg'
	},
	jayna: {
		name: 'Jayna',
		full_name: 'Jayna Ekelmann',
		photo: 'photo.jpg'
	},
	huafang: {
		name: 'Hua',
		full_name: 'Hua Fang',
		photo: 'photo.jpg'
	},
	audrey16: {
		name: 'Audrey',
		full_name: 'Audrey Lee',
		photo: 'photo.jpg'
	},
	ezraeyre: {
		name: 'Ezra',
		full_name: 'Ezra Eyre',
		photo: 'photo.jpg'
	},
	longale: {
		name: 'Isabella',
		full_name: 'Isabella Longale',
		photo: 'photo.jpg'
	},
	froit: {
		name: 'Fiona',
		full_name: 'Fiona Lu',
		photo: 'photo.jpg'
	},
	hhn: {
		name: 'Heidi',
		full_name: 'Heidi Nakajima',
		photo: 'photo.jpg'
	},
	bryand: {
		name: 'Bryan',
		full_name: 'Bryan Bryson',
		photo: 'photo.jpg'
	},
	leibyk: {
		name: 'Kevin',
		full_name: 'Kevin Leiby',
		photo: 'photo.jpg'
	},
	dasilvaj: {
		name: 'Bosco',
		full_name: 'João "Bosco" Da Silva',
		photo: 'photo.jpg'
	},
	vacant: {
		name: '-',
		full_name: 'Vacant',
		photo: 'photo.jpg'
	}
} as const satisfies Record<string, Person>;

// Maps offices to people by kerberos.
export const incumbents = {
	// OFFICERS
	president: ['ggirard'],
	house_chair: ['mariojsm', 'smoulder'],
	treasurer: ['eitanc27'],
	secretary: ['ejrice'],

	rooming_chair: ['deeptag', 'jenna49', 'beap'],
	social_chair: ['ijuarez', 'htejada'],
	frosh_chair: ['tuviedo', 'mlstagg'],
	technology_chair: ['dtemkin'],

	publicity_chair: ['amiyares', 'nic26', 'mtala'],
	historian: ['elwright'],
	fisch_chair: ['maguiar'],
	athletics_chair: ['alpeng'],
	ee_lab_chair: ['nbuono', 'tylon'],
	library_chair: ['kelton'],
	entertainment_chair: ['kkummel'],
	reservations_chair: ['ashhong'],
	workshop_chair: ['kanotung', 'avalos10'],
	kitchen_chair: ['jayna', 'huafang'],
	gym_chair: ['fdma2405', 'faris'],
	craft_room_chair: ['ezraeyre', 'longale'],
	dining_chair: ['froit'],

	// HOUSE TEAM
	hoh: ['djperrea', 'hhn'],
	associate_hoh: ['bryand', 'leibyk'],
	area_director: ['apputnam'],

	// OTHER
	house_manager: ['dasilvaj'],
	desk_captain: ['ggirard', 'audrey16']
} as const satisfies Record<keyof typeof offices, (keyof typeof people)[]>;
