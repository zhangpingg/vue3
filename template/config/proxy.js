const envApi = {
    test: {
        api: 'http://10.1.12.123:8080',
    },
    prod: {
        api: 'https://supplier.xxx.com:4434',
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
