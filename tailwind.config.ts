import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { Simmons } from './src/Simmons';

export default {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						'blockquote p:first-of-type::before': {
							content: 'normal'
						},
						'blockquote p:last-of-type::after': {
							content: 'normal'
						}
					}
				}
			})
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [Simmons]
			}
		})
	]
} satisfies Config;
