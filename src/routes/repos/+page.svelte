<script lang="ts">
    import type { PageProps } from "./$types";

    import Star from "~icons/octicon/star"
    import Fork from "~icons/octicon/repo-forked"
    
    let { data }: PageProps = $props()

    let x = (() => data)().data?.map(y => ({
        ...y,
        languages: y.languages.edges.map(xy => ({
            name: xy.node.name,
            color: xy.node.color,
            size: (xy.size / y.languages.totalSize * 100).toFixed(1)
        }))
    }))
</script>

<div class="grid md:grid-cols-2 auto-rows-fr gap-4">
    {#each x as repo}
        <a 
            href={repo.url} 
            target="_blank"
            class="w-full card-body bg-base-300/50 rounded-xl"
        >
            <div class="flex justify-between">
                <h2 class="font-semibold flex">
                    <span class="text-current/50">
                        {repo.owner.login}/
                    </span>
                    {repo.name}
                    <img class="ml-1" src="https://api.iconify.design/devicon/{repo.primaryLanguage.name.toLowerCase()}.svg?height=16" alt={repo.primaryLanguage.name} />
                </h2>
                <span class="flex items-center space-x-1">
                    <Fork />
                    <h3 class="mr-3">{repo.forkCount}</h3>
                    <Star />
                    <h3>{repo.stargazerCount}</h3>
                </span>
            </div>
            <h2>{repo.description || "No description"}</h2>
            <div class="mt-3">
                <div class="w-full h-3 rounded-xl bg-black mt-3 overflow-hidden">
                    {#each repo.languages as language}
                        <div
                            style:width="{language.size}%"
                            style:background-color={language.color}
                            class="h-full float-left"
                        ></div>
                    {/each}
                </div>
                <div class="grid grid-cols-3">
                    {#each repo.languages as language}
                        <div class="flex items-center space-x-1 mt-3">
                            <div
                                style:background-color={language.color}
                                class="rounded-full w-1 h-1"
                            ></div>
                            <h2>{language.name}</h2>
                            <span class="text-base-content/50">{language.size}%</span>
                        </div>
                    {/each}
                </div>
            </div>
        </a>
    {/each}
</div>