<script lang="ts">
    import type { Post } from "$lib/types/Post";
    import { toDateString, toYear } from "$lib/utils";

    let { data } = $props()

    let reduce = (posts: Post[]): Map<number,Post[]> => {
        return posts.reduce((a,c) => {
            let k = toYear(c.date)
            return a.set(k, [...(a.get(k) || []), c])
        }, new Map())
    }

</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

{#each reduce(data.posts) as [year, posts]}
    <div class="mb-10 space-y-4">
        <h1 class="text-4xl font-bold">{year}</h1>
        {#each posts as post}
            <div>
                <a href="blog/{post.slug}">
                    <div class="card border border-base-300 bg-base-200 hover:bg-base-300 min-h-15 flex flex-row p-4 sm:tooltip before:delay-200 after:delay-200" data-tip={post.description}>
                        <h1 class="text-current/60 w-[20%] md:w-1/12 shrink-0">{toDateString(post.date, "short")}</h1>
                        <h1 class="font-semibold">{post.title}</h1>
                    </div>
                </a>
            </div>
        {/each}
    </div>
{/each}