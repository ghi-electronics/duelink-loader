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
                update: resolve(__dirname, 'update.html'),
                microblocks: resolve(__dirname, 'microblocks.html'),
                discover: resolve(__dirname, 'discover.html'),
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
