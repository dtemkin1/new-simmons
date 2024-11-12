import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
// import * as themes from '@skeletonlabs/skeleton/themes';

import Simmons from './src/Simmons';

export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			// NOTE: each theme included will be added to your CSS bundle
			themes: [Simmons]
		})
	]
} satisfies Config;
