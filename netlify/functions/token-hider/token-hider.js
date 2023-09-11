const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = event.queryStringParameters
  console.log('API_PARAMS', API_PARAMS)
  
  const { API_KEY, API_HOST } = process.env

  console.log('Constructed URL is ...', URL)

  const options = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${API_PARAMS.word}/definitions`,
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const { data } = await axios.request(options)
    
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

module.exports = { handler }
