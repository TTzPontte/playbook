require('dotenv/config');
const request = require('request');

const data = {
  cardId: 416284084,
}

const payload = `{ \"query\": \"{ card(id: ${data.cardId}) { title assignees { id } comments { id } comments_count current_phase { name } done due_date fields { name value } labels { name } phases_history { phase { name } firstTimeIn lastTimeOut } url } }\" }`

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
