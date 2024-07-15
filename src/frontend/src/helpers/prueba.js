import axios from "axios";

const API_KEY = 'CG-Fp12f1rhwzh4QrGK8vCkRpKc';

const getPrice = async (currency = "USD") => {
  const options = {
    method: 'GET',
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&ids=rootstock`,
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data[0]; // Assuming the response is an array with one object
    console.log(data);
    return data.current_price;
  } catch (error) {
    console.error('Error fetching RBTC price:', error);
    return null;
  }
};

getPrice().then(price => console.log(`RBTC price in USD: ${price}`));
getPrice('EUR').then(price => console.log(`RBTC price in EUR: ${price}`));
