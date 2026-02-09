<script>
    import Toast from "./Toast.svelte";
    import { toasts } from "$lib/stores/toasts";
</script>

<div class="notifications">
    {#each [...$toasts] as [k,v]}
        {@const y = k.substring(0, k.indexOf("-"))}
        {@const x = k.substring(k.indexOf("-")+1)}

        <div class="toast toast-{x} toast-{y}">
            {#each v as toast}
                <Toast {...toast}/>
            {/each}
        </div>
    {/each}
</div>