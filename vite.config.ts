import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		purgeCss({
			safelist: {
				// Allow selectors with a regex match:
				greedy: [
					// Used for Highlight.js (code blocks)
					/^hljs-/,
					// Used for Highlight.js (code blocks)
					/^kg-/,
					// For table of contents
					/font-bold/,
					/opacity-60/,
					/hover:opacity-100/,
					/text-primary-500/,
					/space-y-2/
				]
			}
		})
	]
});
