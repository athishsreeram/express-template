const request = require("request");

function getAPIKey() {
  if (process.env.API_KEY) {
    return JSON.parse(process.env.API_KEY);
  }
  throw new Error("Unable to load API_KEY");
}

const ping = async (req, res) => {
  apiKey(req, res);

  res.status(200).send({ message: "Ok" });
};

function apiKey(req, res) {
  const apiKey = getAPIKey();
  const apiKeyHeader = req.headers["x-api-key"];

  if (apiKeyHeader == undefined || apiKeyHeader != apiKey) {
    return res.status(400).send('{ noauth: "Please Pass Details" }');
  }
}

module.exports = {
  ping,
};
