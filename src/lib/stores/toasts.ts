import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid"

type ToastType = "success" | "error" | "default"

export type ToastMapValue = 
    {
        id: string,
        msg: string,
        type: ToastType,
        horizontal: string,
        vertical: string,
        timeout: number
    }

function createToastStore() {
    const { subscribe, update } = writable(new Map<string, ToastMapValue[]>())

    const dismissToast = (id: string) => {
        update(state => {
            state.forEach((v,k) => {
                const nv = v.filter(e => e.id !== id)
                if(nv.length > 0) {
                    state.set(k,nv)
                } else {
                    state.delete(k)
                }
            })
            return new Map(JSON.parse(JSON.stringify(Array.from(state))))
        })
    }

    const send = (msg: string, type: ToastType = "default", horizontal: string, vertical: string, timeout = 3000) => {
        update(state => {
            const key = `${horizontal}-${vertical}`
            const value = { id: uuidv4(), msg, type, horizontal, vertical, timeout }
            const is = state.get(key)

            if(is) {
                state.set(key, [...is, value])
            } else {
                state.set(key, [value])
            }

            if(value.timeout > 0) setTimeout(() => dismissToast(value.id), value.timeout)
            return new Map(JSON.parse(JSON.stringify(Array.from(state))))
        })
    }

    return {
        subscribe,
        send,
        delete: (id: string) => dismissToast(id),
        error: (msg: string, horizontal: string, vertical: string, timeout: number) => send(msg, "error", horizontal, vertical, timeout),
        success: (msg: string, horizontal: string, vertical: string, timeout: number) => send(msg, "success", horizontal, vertical, timeout)
    }
}

export const toasts = createToastStore()