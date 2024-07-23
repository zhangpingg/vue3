import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vue3',
    publicPath: '/vue3',
    server: {
        port: 8084,
        cors: true,
        origin: "http://localhost:8084/zp",
    },
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            extensions: [".js", ".vue", ".json"],
        },
    },
});
