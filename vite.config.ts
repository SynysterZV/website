import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from "unplugin-icons/vite"
import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer"

const isDev = process.env.NODE_ENV == "development"

export default defineConfig({ 
    plugins: [
        tailwindcss(), 
        sveltekit(), 
        Icons({ compiler: 'svelte' }), 
        isDev && visualizer({ 
            emitFile: true, 
            filename: "stats.html", 
            template: "network",
            gzipSize: true,
            brotliSize: true
        })
    ]
});
