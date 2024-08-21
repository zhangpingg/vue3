import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vue3',
    server: {
        host: '0.0.0.0',
        port: 8084,
        cors: true,
        origin: 'http://localhost:8084',
        proxy: {
            '/test/api': {
                target: 'http://10.1.13.23',
                changeOrigin: true,
                bypass(req, res, options) {
                    const realUrl = new URL(req.url || '', options.target).href || '';
                    res.setHeader('x-res-proxyUrl', realUrl);
                }
            }
        }
    },
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        extensions: ['.js', '.vue', '.json']
    }
});
