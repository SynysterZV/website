import { writable, type Writable } from "svelte/store";
import type { LanyardAPI } from "$lib/types/LanyardAPI";

export const isConnected = writable(false)
export const userData: Writable<LanyardAPI> = writable({})