require('dotenv/config');
const request = require('request');

const data = {
  cardId: 415855350,
}

const payload = `{ \"query\": \"mutation{ deleteCard(input: {id: ${data.cardId}}) { success } }\" }`

request({
  method: 'POST',
  url: 'https://app.pipefy.com/queries',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`
  },
  body: payload
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  // console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
