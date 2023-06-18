import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite'
import path from 'path'

const dirname = path.resolve()

export default defineConfig({
    root: 'src',
    publicDir: '../static',
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [glsl()]
})