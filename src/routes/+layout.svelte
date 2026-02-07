<script lang="ts">

	// CSS
	import './layout.css';

	// Library 
	import favicon from '$lib/assets/favicon.svg';	
	import GridPattern from '$lib/components/GridPattern.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// SvelteKit
	import { page } from '$app/state';

	// 3P
	import { SvelteTheme } from 'svelte-themes';

	// Types
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>SynDev</title>

	<meta name="description" content="My portfolio website" />
	<meta name="author" content="SynysterZV" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:description" content="Portfolio Website" />
	<meta name="twitter:title" content="SynDev" />
	<meta name="twitter:image" content="{page.url.origin}/images/favicon.png" />


	<link rel="icon" href={favicon} />
</svelte:head>

<SvelteTheme
	themes={['light','dark']}
	value={{
		dark: "dracula"
	}}
>
	<div class="font-bric flex relative flex-col min-h-svh overflow-hidden bg-radial to-90% to-base-100">

		<GridPattern class="-z-1 h-[200%] w-[200%] motion-safe:animate-shift stroke-1 dark:stroke-[0.3]" />

		<Navbar />

		<div class="container p-1 flex flex-col space-y-4 mx-auto max-w-sm sm:max-w-4xl mt-5 grow">
			{@render children()}
		</div>

		<!-- <footer class="footer mt-4 footer-center text-base-content p-2">
			<aside>
				<p>Copyright © {new Date().getFullYear()} - All Rights Reserved</p>
			</aside>
		</footer> -->

	</div>
</SvelteTheme>
