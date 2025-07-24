const envApi = {
    test: {
        api: 'http://10.1.13.23:8080',
    },
    prod: {
        api: 'https://quality.chaoyang.com:4434',
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
