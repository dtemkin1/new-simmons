import type { TRexAPIResponse, TRexEvent, TRexEventResponse } from './types';

export const get_date_bucket = (event: TRexEventResponse, cutoff: number) => {
	const date = new Date(event.start);
	if (date.getHours() < cutoff) {
		date.setDate(date.getDate() - 1);
	}
	return date;
};

export const dateMaker = new Intl.DateTimeFormat('en-US', {
	weekday: 'long',
	month: 'long',
	day: 'numeric'
});

export const timeMaker = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: 'numeric'
});

function isEqual(startDate: Date, endDate: Date) {
	return (
		endDate.getDate() == startDate.getDate() &&
		endDate.getMonth() == startDate.getMonth() &&
		endDate.getFullYear() == startDate.getFullYear()
	);
}

export const process_raw_data = (data: TRexAPIResponse) => {
	const all_events = data.events;
	const all_dates: Date[] = [];
	all_events.forEach((event) => {
		const date = get_date_bucket(event, 4);
		if (all_dates.filter((checkDate) => isEqual(date, checkDate)).length == 0) {
			all_dates.push(date);
		}
	});
	const by_date: Record<string, TRexEvent[]> = {};
	all_events.forEach((rexEvent) => {
		if (rexEvent.dorm.toLowerCase().includes('simmons')) {
			const date = get_date_bucket(rexEvent, 4);
			if (!by_date[dateMaker.format(date)]) {
				by_date[dateMaker.format(date)] = [];
			}
			by_date[dateMaker.format(date)].push({
				...rexEvent,
				start: new Date(rexEvent.start),
				end: new Date(rexEvent.end)
			});
		}
	});

	Object.keys(by_date).forEach((date) => {
		by_date[date].sort((a, b) => a.end.getTime() - b.end.getTime());
		by_date[date].sort((a, b) => a.start.getTime() - b.start.getTime());
	});

	return { ...by_date };
};
