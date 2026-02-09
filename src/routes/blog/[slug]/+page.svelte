<script lang="ts">
    import { toDateString } from "$lib/utils";

    let { data } = $props()
</script>

<svelte:head>
    <title>Blog - {data.meta.title}</title>
</svelte:head>

<article class="lg:self-center lg:w-4xl">
    <hgroup>
        <h1 class="text-6xl">{data.meta.title}</h1>
        <p class="text-current/60">{toDateString(data.meta.date, "long")}</p>
    </hgroup>

    <div class="flex gap-3 mt-5 mb-10">
        {#each data.meta.categories as category}
            <span class="badge badge-primary">&num;{category}</span>
        {/each}
    </div>

    <div class="prose lg:prose-xl mt-3">
        <data.content />
    </div>
</article>