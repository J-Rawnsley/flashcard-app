const process = require('process')

const axios = require('axios')
const qs = require('qs')

const { API_KEY, API_HOST, LOWER_LIMIT, DATA_KEY } = process.env

const getData = async () => {
  const url = "https://json.extendsclass.com/bin/8bc6b4a44137"
  try {
      const response = await fetch(url, {
          headers: {
              "Security-key": "Q43FBk9Zj7Xym"
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      count = json.count
      let date = new Date(json.timestamp)

      console.log(count);
      console.log(date)
      
      return json

  } catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  
}

const setData = async (count) => {
  const url = "https://json.extendsclass.com/bin/8bc6b4a44137"
  try {
      const response = await fetch(url, {
          method: "PUT",
          headers: {
              "Security-key": DATA_KEY
          },
          body: JSON.stringify({
              count: count,
              timestamp: Date.now(),
          })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("setting data - response", response.statusText)

  } catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }

}

const handler = async function (event) {
  
  const API_PARAMS = event.queryStringParameters
  console.log('API_PARAMS', API_PARAMS)
  


  console.log('Constructed URL is ...', URL)

  const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${API_PARAMS.word}/examples`,
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  let storedData = await getData()
  let now = Date.now()

  console.log("storedData:", storedData)
  console.log("lower limit is", LOWER_LIMIT);

  if (storedData.count > LOWER_LIMIT || storedData.timestamp < now - 100000000) {
    try {
      const response = await axios.request(options)
      const data = await response.data
  
      let remainingRequests = response.headers['x-ratelimit-requests-remaining']
      console.log("remaining requests from examples function:", remainingRequests)
    
      setData(remainingRequests)
      
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTION",
        }
      }
    } catch (error) {
      const { data, headers, status, statusText } = error.response
      return {
        statusCode: error.response.status,
        body: JSON.stringify({ status, statusText, headers, data }),
      }
    }
  }

  else {
    console.error("not enough requests remaining. Try again tomorrow.")
  }

  
}

module.exports = { handler }
