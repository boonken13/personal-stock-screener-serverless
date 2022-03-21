"use strict";
const axios = require("axios");

module.exports.get = async (event) => {
  const querystring = event.queryStringParameters;
  const symbol = (querystring && querystring.symbol) || "AAPL";
  const apiKey = "J9D0I6YEMXQ8L0QR";
  const url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    symbol +
    "&apikey=" +
    apiKey;

  const res = await axios
    .get(url)
    .then((res) => {
      let statusCode;
      let result;
      if (res.status !== 200) {
        result = res.data;
        statusCode = res.status;
      } else {
        // data is successfully parsed as a JSON object: 
        result = res.data;
        statusCode = 200;
      }
      return {
        result,
        statusCode
      }
    })
    .catch((err) => {
      console.log("Error:", err);
    });

  return {
    statusCode: res && res.statusCode ? res.statusCode : 404,
    body: JSON.stringify(
      {
        data: res && res.result ? res.result : {}
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
