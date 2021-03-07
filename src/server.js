const express = require("express");
const app = express();
const serverless = require('serverless-http');
require('encoding');
//const { createProxyMiddleware } = require('http-proxy-middleware');
const initRoutes = require("./routes");

require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
initRoutes(app);



/**let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});**/


/**app.use(
  '/',
  createProxyMiddleware('/recaptcha', {
    target: 'https://www.google.com/',
    logLevel: 'debug',
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
  })
);*/


// path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
