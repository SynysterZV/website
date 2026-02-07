<script lang="ts">
    // Svelte
    import { onMount } from "svelte";

    // SvelteKit
    import { page } from "$app/state";
    import { onNavigate } from "$app/navigation";

    // Components
    import ThemeToggle from "./ThemeToggle.svelte";

    // Icons
    import Github from "~icons/line-md/github"
	import Fire from "$lib/assets/Fire.svelte"
	import Hamburger from "~icons/heroicons/bars-3"

    let menuVisible = $state(false)
    let origin = $state("")

    let routeList = [
		["Home", "/"],
		["About", "/about"],
		["Cat", "/cat"],
        ["Repos", "/repos"]
	]

    onNavigate(() => { menuVisible = false })
    onMount(() => {
        if(typeof window !== "undefined") {
            origin = window.location.origin
        }
    })
</script>

{#snippet routes()}
    <ul class="menu menu-vertical gap-1 menu-xl font-bold md:menu-horizontal md:menu-md">
        {#each routeList as [key, route]}
            <li class="{page.route.id == route ? "menu-active rounded-field" : ""}">
                <a tabindex=0 href={route}>
                    <h1>{key}</h1>
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

<div class="drawer">
    <input class="drawer-toggle" id="navdrawer" type="checkbox" bind:checked={menuVisible}>
    <div class="drawer-content flex flex-col md:p-4">
        <div class="navbar w-full mx-auto">

            <label for="navdrawer" aria-label="open sidebar" class="ml-3 md:hidden">
                <Hamburger class="size-8 swap-off" />
            </label>

            <div class="navbar-start md:hidden"></div>

            <div class="navbar-center relative right-10 md:navbar-start md:right-0">
                <a class="flex flex-col sm:flex-row items-center gap-1" href="/">
                    <span
                        class="w-10 h-10 bg-linear-to-r from-primary to-secondary [clip-path:url(#Fire)]"
                    >
                        <Fire />
                    </span>
                    <h1 class="text-xl font-bold">SynDev</h1>
                </a>
                <div class="hidden ml-4 md:flex">
                    {@render routes()}
                </div>
            </div>

            <div class="navbar-end">
                <ul class="menu menu-horizontal">
                    <li>
                        <a 
                            href="https://github.com/SynysterZV/website/{ origin.includes("synzv.com") ? "" : "tree/develop" }" 
                            target="_blank"
                        >
                            <Github class="size-7"/>
                        </a>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="drawer-side">
        <label for="navdrawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="flex items-center justify-center bg-base-200/75 min-h-full w-50 p-4">
            {@render routes()}
        </div>
    </div>
</div>