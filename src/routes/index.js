const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const bodyParser = require("body-parser");
var cors = require("cors");

let routes = (app) => {
  router.get("/gd/ping", controller.ping);

  router.get("/hoe/stripekey", controller.stripeKey);
  router.post("/hoe/charge", controller.charge);

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/.netlify/functions/server", router);
};

module.exports = routes;
