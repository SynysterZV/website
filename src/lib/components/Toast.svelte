<script lang="ts">
    import { toasts, type ToastMapValue } from "$lib/stores/toasts";

    import Close from "~icons/heroicons/x-mark"

    let {
        type,
        msg,
        timeout,
        id
    }: ToastMapValue = $props()
</script>

<div 
    class="alert"
    class:alert-success={type == "success"}
    class:alert-error={type == "error"}
>
    <div>
        <span>{msg}</span>
        {#if timeout === 0}
            <button
                onclick={() => {
                    toasts.delete(id)
                }}
                class="btn btn-ghost"
            ><Close/></button>
        {/if}
    </div>
</div>