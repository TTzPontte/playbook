require('dotenv/config');
const request = require('request');

const data = {
  pipeId: 301601916,
}

const payload = `{ \"query\": \"{ pipes(ids: [${data.pipeId}]) { id name start_form_fields { id internal_id type required editable description  } } }\" }`

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