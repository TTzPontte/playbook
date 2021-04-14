require('dotenv/config');
const request = require('request');

const data = {
  pipeId: 301601916
}

const payload = `{ \"query\": \"{ cards(pipe_id: ${data.pipeId}) { edges { node { id title assignees { id } comments { text } comments_count current_phase { name } done due_date fields { name value } labels { name } phases_history { phase { name } firstTimeIn lastTimeOut } url } } } }\"}`

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
