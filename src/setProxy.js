const { createProxyMiddleware } = require('http-proxy-middleware')

export default function (app) {
  app.use(
    createProxyMiddleware("api/", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
