const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const bodyParser = require("body-parser");
var cors = require("cors");

let routes = (app) => {
  router.get("/gd/ping", controller.ping);
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //app.use(router);

  app.use("/.netlify/functions/server", router);

  //task.start();
};

module.exports = routes;
