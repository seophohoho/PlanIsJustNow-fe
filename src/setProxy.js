import { serverUrl } from './serverConfig';
const { createProxyMiddleware } = require('http-proxy-middleware')

export default function (app) {
  app.use(
    createProxyMiddleware("api/", {
      target: serverUrl,
      changeOrigin: true,
    })
  );
};
