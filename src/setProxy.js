import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api/auth/mail", {
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
};

export default function (app) {
    app.use(
      createProxyMiddleware("/api/auth/check", {
        target: "http://localhost:8082",
        changeOrigin: true,
      })
    );
  };

export default function (app) {
app.use(
    createProxyMiddleware("/api/account/signup", {
    target: "http://localhost:8082",
    changeOrigin: true,
    })
);
};