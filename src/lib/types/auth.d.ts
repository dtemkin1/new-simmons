import '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface User {
		id?: string;
		data?: {
			reminders: Record<string, string>;
		};
		groups?: readonly string[];
	}
}
