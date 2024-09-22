const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://namestone.xyz/',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api/public_v1', // rewrite path
    },
}));

app.listen(5005, () => {
    console.log('Proxy server running on port 5005');
});
