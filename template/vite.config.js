import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import zipPack from 'vite-plugin-zip-pack';
import path from 'path';
import dayjs from 'dayjs';
import proxy from './config/proxy';

const timeStamp = dayjs().format('YYYYMMDD_HHmmss');

export default defineConfig({
    server: {
        port: 8080,
        cors: true,
        origin: 'http://localhost:8080',
        proxy,
    },
    plugins: [
        vue(),
        zipPack({
            inDir: 'dist', // 输入的文件夹
            outDir: 'dist-zip', // 打包好的 zip 文件放到哪个文件夹下
            outFileName: `dist_${timeStamp}.zip`, // 打包好的文件名
            pathPrefix: 'dist',
        }),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        extensions: ['.js', '.vue', '.json'],
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    build: {
        //sourcemap: true,
    },
});
