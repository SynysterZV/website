import type { Post } from "$lib/types/Post";

export async function load({ fetch }) {
    const res = await fetch("/api/posts")
    const posts: Post[] = await res.json()
    return { posts }
}