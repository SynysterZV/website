import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';
import { createHighlighterCore } from 'shiki/core';

import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import { h } from "hastscript"
import { v4 as uuidv4 } from 'uuid';

const highlighter = await createHighlighterCore({
	themes: [
		import("@shikijs/themes/catppuccin-frappe"),
		import("@shikijs/themes/catppuccin-latte")
	],
	langs: [
		import("@shikijs/langs/javascript"),
		import("@shikijs/langs/typescript"),
		import("@shikijs/langs/rust"),
		import("@shikijs/langs/latex"),
		import("@shikijs/langs/css")
	],
	engine: createOnigurumaEngine(import('shiki/wasm'))
})

const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatexSvelte],
	highlight: {
		highlighter: async (code, lang = "text") => {

			const id = uuidv4()

			const html = escapeSvelte(highlighter.codeToHtml(code, { 
				lang, 
				themes: {
					light: "catppuccin-latte",
					dark: "catppuccin-frappe"
				},
				transformers: [
					{
						code(node) {
							node.properties['id'] = id
						},
						pre(node) {
							this.addClassToHast(node, "relative")

							let div = h(
								'div',
								[
									h('span',lang),
									h(
										'button',
										{
											onClick: `navigator.clipboard.writeText(document.getElementById("${id}").innerText);`
										},
										h(
											'label',
											{
												onClick: `
												this.classList.add('swap-active');
												setTimeout(() => this.classList.remove('swap-active'), 3000);
												`
											},
											[
												h('span', { class: 'swap-off' }),
												h('span', { class: 'swap-on' })
											]
										)
									)
								]
							)

							node.children.push(div)
						}
					}
				]
			}))
			return `{@html \`${html}\` }`
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;