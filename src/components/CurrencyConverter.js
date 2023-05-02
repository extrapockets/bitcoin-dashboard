import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  //future currencies could include Bitcoin, Dollars, Euros, and Oil prices
  const currencies = [`BTC`, `ETH`, `XRP`, `ADA`, `USD`];
  const [chosenPrimaryCurrency, SetChosenPrimaryCurrency] = useState(`BTC`);
  const [chosenSecondaryCurrency, SetChosenSecondaryCurrency] = useState(`BTC`);
  const [amount, setAmount] = useState(1);

  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: `BTC`,
    secondaryCurrency: `BTC`,
    exchangeRate: 0,
  });

  const [result, SetResult] = useState(0);

  console.log(exchangedData);

  const convert = () => {
    const options = {
      method: "GET",
      url: `http://localhost:8000/convert`,
      params: {
        to_currency: chosenSecondaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: chosenPrimaryCurrency,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        SetResult(response.data * amount);
        setExchangedData({
          primaryCurrency: chosenPrimaryCurrency,
          secondaryCurrency: chosenSecondaryCurrency,
          exchangeRate: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>

      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimaryCurrency}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => SetChosenPrimaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input
                  name="currency-amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  value={chosenSecondaryCurrency}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => SetChosenSecondaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate exchangedData={exchangedData} />
    </div>
  );
};

export default CurrencyConverter;
