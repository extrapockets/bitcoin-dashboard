const PORT = 8000;
const express = require(`express`);
const cors = require(`cors`);
const axios = require(`axios`);
require(`dotenv`).config();

const app = express();

app.use(cors());

//routing code example
app.get(`/`, (req, res) => {
  res.json(`1 BTC = 1 BTC`);
});

app.get(`/convert`, (req, res) => {
  const toCurrency = req.query.to_currency;
  const fromCurrency = req.query.from_currency;

  console.log(`toCurrency`, toCurrency);
  console.log(`fromCurrency`, fromCurrency);

  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      from_currency: fromCurrency,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: toCurrency,
    },
    headers: {
      //        'content-type': 'application/octet-stream',
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(
        response.data[`Realtime Currency Exchange Rate`][`5. Exchange Rate`]
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get(`/news`, (req, res) => {
  const options = {
    method: "GET",
    url: "https://bitcoin-news1.p.rapidapi.com/news/coindesk",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "bitcoin-news1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

//If blocked by browser, this changes the Content Security Policy
// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self'");
//     next();
//   });
//end of Content Security Policy code

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
