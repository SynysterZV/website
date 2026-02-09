<script lang="ts">
    import { useTheme } from "svelte-themes"
    import { cn } from "$lib/utils";

    import Sun from "~icons/line-md/moon-to-sunny-outline-loop-transition"
	import Moon from "~icons/line-md/moon-loop"

    const handleKBD = (e: KeyboardEvent) => {
        if(e.ctrlKey && e.key.toLocaleLowerCase() == "t") toggleTheme()
    }

    const toggleTheme = () => {
        theme.theme = theme.resolvedTheme == "dark"
            ? "light"
            : "dark"
    }

    const theme = useTheme()

    let {
        class: className = "",
        ...rest
    } = $props()
</script>

<svelte:window onkeydown={handleKBD} />

<label 
    class={cn("swap swap-rotate", className)}
    {...rest}
>
    <input 
        type="checkbox" 
        onclick={toggleTheme} 
        checked={theme.resolvedTheme == "dark"}
    />
    <Sun class="size-7 swap-off"/>
    <Moon class="size-7 swap-on"/>
</label>