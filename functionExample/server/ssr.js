// SSR 服务端渲染
// 启动：node server/ssr.js
// 接口地址：http://localhost:9001/getData

import express from 'express';

const app = express();

app.get('/getData', async (req, res) => {
    const name = '张三';
    const html = `<div style="color: #f00">Hello, ${name}</div>`; // 渲染组件为 HTML 字符串

    try {
        // 返回完整 HTML
        res.send(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="root">${html}</div>
            </body>
            </html>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(9001, () => {
    console.log('接口地址为：http://localhost:9001/getData');
});
