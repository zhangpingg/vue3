const envApi = {
    test: {
        api: 'http://10.1.13.22', // 域名+
    },
    prod: {
        api: 'https://quality.cy.com:4433', // 域名+，端口+
    },
    environment: 'test',
};

export default {
    '/test/api': {
        target: envApi[envApi.environment].api,
        changeOrigin: true,
        bypass(req, res, options) {
            const realUrl = new URL(req.url || '', options.target).href || '';
            res.setHeader('x-res-proxyUrl', realUrl);
        },
    },
};
