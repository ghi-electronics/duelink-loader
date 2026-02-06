import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: './', // Make assets relative

    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },

        
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                dfu: resolve(__dirname, 'dfu.html'),
                official: resolve(__dirname, 'official.html'),
                microblocks: resolve(__dirname, 'microblocks.html'),
            },
        },
    },

    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },

    plugins: [
        vue(),
    ],
});
