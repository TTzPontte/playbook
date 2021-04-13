require('dotenv/config');
const request = require('request');

const fields = {
  nome_do_requisitante: 'Lucas',
  email_do_requisitante: 'lucao@email.com',
  dinhiero: 10000,
  campo_dono_lucas: 'Yes',
  what_s_the_bug: 'BUG LUCAO é Chateado'
}

const data = `[ {field_id: \"${Object.keys(fields)[0]}\", field_value: \"${fields.nome_do_requisitante}\"} {field_id: \"${Object.keys(fields)[1]}\", field_value: \"${fields.email_do_requisitante}\"} {field_id: \"${Object.keys(fields)[2]}\", field_value: \"${fields.dinhiero}\"} {field_id: \"${Object.keys(fields)[3]}\", field_value: \"${fields.campo_dono_lucas}\"} {field_id: \"${Object.keys(fields)[4]}\", field_value: \"${fields.what_s_the_bug}\"} ]`
const payload = {
  "query": "mutation{ createCard(input: {pipe_id: 301601916 fields_attributes: " + data + " }) { card {id title }} }"
}

request({
  method: 'POST',
  url: 'https://app.pipefy.com/queries',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.PIPEFY_TOKEN}`
  },
  body: JSON.stringify(payload)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
