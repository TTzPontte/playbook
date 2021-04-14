require('dotenv/config');
const request = require('request');
const { format } = require('date-fns');

const data = {
  cardId: 416543002,
  title: 'BUG alterado TITLE',
  dueDate: format(new Date(2021, 3, 12, 17, 26), "yyyy-MM-dd'T'HH:mm:ssxxx"),
}

const payload = `{ \"query\": \"mutation{ updateCard(input: {id: ${data.cardId} title: \\"${data.title}\\" due_date: \\"${data.dueDate}\\" }) { card { id title }}}\" }`

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
