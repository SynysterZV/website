import { json } from "@sveltejs/kit"
import type { Post } from "$lib/types/Post"

async function getPosts() {
    let posts: Post[] = []

    const paths = import.meta.glob('/src/posts/*.md', { eager: true })

    for (let path in paths) {
        let file = paths[path]
        const slug = path.split("/").at(-1)?.replace('.md', '')

        if(file && typeof file == 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>
            const post = { ...metadata, slug } satisfies Post
            post.published && posts.push(post)
        }
    }

    return posts.sort((a,b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export async function GET() {
    return json(await getPosts())
}