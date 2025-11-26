import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import removeConsole from 'vite-plugin-remove-console';
import viteCompression from 'vite-plugin-compression';
import cdn from 'vite-plugin-cdn-import';
import path from 'path';
import { checkVersion } from './src/plugins/vitePluginCheckVersion';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vue3',
    server: {
        open: '/vue3/home',
        host: '0.0.0.0',
        port: 8084,
        cors: true,
        origin: 'http://localhost:8084',
        proxy: {
            '/test/api': {
                //target: 'http://10.1.13.23',  // 质管项目
                target: 'http://10.1.13.23:8081', // CRM项目
                changeOrigin: true,
                bypass(req, res, options) {
                    const realUrl = new URL(req.url || '', options.target).href || '';
                    res.setHeader('x-res-proxyUrl', realUrl);
                }
            },
            '/api': {
                target: 'http://dtra.zhilun-k8s.com',
                changeOrigin: true,
                bypass(req, res, options) {
                    const realUrl = new URL(req.url || '', options.target).href || '';
                    res.setHeader('x-res-proxyUrl', realUrl);
                }
            }
        }
    },
    plugins: [
        vue(),
        vueJsx()
        //  checkVersion()
        //visualizer({
        //    filename: 'stats.html', // 输出文件的名称。默认 stats.html
        //    open: true, // 打包完成后自动打开生成的HTML文件，默认 true
        //    gzipSize: true, // 否考虑 gzip 压缩后的大小
        //    brotliSize: true // 否考虑 Brotli 压缩后的大小
        //})
        //removeConsole(),
        //viteCompression({
        //    algorithm: 'gzip', // 压缩算法，gzip-(默认)、brotliCompress
        //    ext: '.gz', // 压缩文件的扩展名，.gz-默认、.br
        //    deleteOriginFile: true, // 是否删除源文件，默认为 false（不删除）
        //    threshold: 10240, // 压缩阈值，只对大于 10KB 的文件进行压缩
        //    disable: false, // 是否禁用压缩功能，默认 false（不禁用，即开启压缩）
        //    verbose: true // 是否开启详细日志输出
        //}),
        //cdn({
        //    modules: [
        //        // 配置 Vue CDN
        //        {
        //            name: 'vue', // 模块名称（package.json 中的名称）
        //            var: 'Vue', // 全局变量名（CDN 脚本暴露的全局变量）
        //            path: 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.min.js' // 生产环境 CDN 地址
        //        },
        //        // 配置 Element Plus CDN
        //        {
        //            name: 'element-plus',
        //            var: 'ElementPlus',
        //            path: 'https://cdn.jsdelivr.net/npm/element-plus@2.3.8/dist/index.full.min.js',
        //            css: 'https://cdn.jsdelivr.net/npm/element-plus@2.3.8/dist/index.min.css' // CSS CDN 地址
        //        }
        //    ]
        //})
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        extensions: ['.js', '.vue', '.json']
    }
    //build: {
    //    sourcemap: true
    //}
});
