import '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface User {
		/** ID of User */
		id?: string;
		/** Groups the user is a part of */
		groups?: readonly string[];
	}
}
