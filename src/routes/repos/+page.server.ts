import type { PageServerLoad } from "./$types"
import { GH_API_KEY } from "$env/static/private"
import { Temporal } from "temporal-polyfill"

type Nullable<T> = T | null

type GQLData = {
    data: {
        user: {
            pinnedItems: {
                nodes: Array<{
                    name: string;
                    owner: {
                        login: string;
                        url: string;
                    }
                    description: Nullable<string>;
                    stargazerCount: number;
                    forkCount: number;
                    url: string;
                    primaryLanguage: {
                        name: string;
                    }
                    languages: {
                        totalSize: number;
                        edges: Array<{
                            size: number;
                            node: {
                                name: string;
                                color: string;
                            }
                        }>
                    }
                }>
            }
        }
    }
}

let cache: {
    data: Nullable<GQLData>;
    exp: Nullable<Temporal.PlainDateTime>
} = {
    data: null,
    exp: null
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
    const query = `
        query {
            user(login:"synysterzv") {
                pinnedItems(first: 6, types: [REPOSITORY]) {
                    nodes {
                        ... on Repository {
                            name
                            owner {
                                login
                                url
                            }
                            description
                            stargazerCount
                            forkCount
                            url
                            primaryLanguage {
                                name
                            }
                            languages(first: 5, orderBy: { field: SIZE, direction: DESC} ) {
                                totalSize
                                edges {
                                    size
                                    node {
                                        name
                                        color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    setHeaders({
        'cache-control': 'public, max-age=60'
    })

    let now = Temporal.Now.plainDateTimeISO()
    let duration = Temporal.Duration.from({ days: 1 })
    let error

    if(cache['data'] == null || cache['exp'] == null || Temporal.PlainDateTime.compare(cache['exp'], now) === -1) {
        let data = await fetch("https://api.github.com/graphql", { 
            method: "POST", 
            headers: { 
                Authorization: `Bearer ${GH_API_KEY}`
            },
            body: JSON.stringify({
                query
            }) 
        })
            .then(res => res.json())

        if(data['data']) {
            cache['data'] = data
        } else {
            return {
                error: "Content could not be loaded"
            }
        }

        cache['exp'] = now.add(duration)
    }

    return { data: cache.data?.data.user.pinnedItems.nodes }
}