// copied from https://github.com/mit-dormcon/website/blob/main/components/t-rex/types.ts

/** Raw API output */
export interface TRexAPIResponse {
	name: string; // The title of the current experience, such as "REX 2023"
	published: string; // ISO Date string of when the current JSON of events was published
	events: TRexRawEvent[];
	dorms: string[];
	tags: string[];
	colors: {
		dorms: Record<string, string>;
		tags: Record<string, string>;
	}; // Convert to Map<string, string>!
	start: string; // Convert to ISO Date string!
	end: string; // Convert to ISO Date string!
}

/** Event details */
export interface TRexRawEvent {
	name: string;
	dorm: string[];
	location: string;
	start: string; // Convert to ISO Date string!
	end: string; // Convert to ISO Date string!
	tags: string[];
	description: string;
	group: string | null; // The subcommunity or living group hosting this event, if any
}

/** Maps event properties to colors */
export interface TRexRawColors {
	dorms: Record<string, string>;
	tags: Record<string, string>;
}

export interface TRexProcessedData {
	name: string;
	published: Date;
	events: TRexProcessedEvent[];
	dorms: string[];
	tags: string[];
	colors: TRexProcessedAPIColors;
	start: Date;
	end: Date;
}

export interface TRexProcessedEvent {
	name: string;
	dorm: string[];
	location: string;
	start: Date;
	end: Date;
	tags: string[];
	description: string;
	group: string | null;
}

export interface TRexProcessedAPIColors {
	dorms: Map<string, string>;
	tags: Map<string, string>;
}
