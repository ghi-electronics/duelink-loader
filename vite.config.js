import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import fs from 'fs'; // <-- add this to read cert files

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
            },
        },
    },

    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },

    plugins: [
        vue(),
    ],

    // --- ADD THIS SECTION ---
    server: {
        https: {
            key: fs.readFileSync('localhost-key.pem'),   // path to your key
            cert: fs.readFileSync('localhost-cert.pem')  // path to your cert
        },
        host: true,   // allow access from LAN / Chromebook
        port: 5173,   // optional, default port
    },
});
