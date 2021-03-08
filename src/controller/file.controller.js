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

const stripeKey = async (req, res) => {
  const keyPublishable = process.env.PUBLISHABLE_KEY;

  res.status(200).send({ message: { keyPublishable } });
};

const charge = async (req, res) => {
  const keySecret = process.env.SECRET_KEY;
  const stripe = require("stripe")(keySecret);

  stripe.charges
    .create({
      source: req.body.clienttoken.id,
      amount: req.body.amount,
      currency: "CAD",
    })
    .then((charge) =>
      res.status(200).send({ message: "You successfully paid " + charge })
    )
    .catch((err) => {
      res.status(500).send({ message: err });
    });
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
  stripeKey,
  charge,
};
