require('dotenv/config');
const request = require('request');

const fields = {
  nome_do_cliente: 'John Doe',
  email_do_cliente: 'johndoe@email.com',
  what_s_the_bug: 'BUG Do John DOE'
}

//const data = `[ {field_id: \"${Object.keys(fields)[0]}\", field_value: \"${fields.nome_do_requisitante}\"} {field_id: \"${Object.keys(fields)[1]}\", field_value: \"${fields.email_do_requisitante}\"} {field_id: \"${Object.keys(fields)[2]}\", field_value: \"${fields.dinhiero}\"} {field_id: \"${Object.keys(fields)[3]}\", field_value: \"${fields.campo_dono_lucas}\"} {field_id: \"${Object.keys(fields)[4]}\", field_value: \"${fields.what_s_the_bug}\"} ]`

const data = [
  {field_id: Object.keys(fields)[0], field_value: fields.nome_do_cliente},
  {field_id: Object.keys(fields)[1], field_value: fields.email_do_cliente},
  {field_id: Object.keys(fields)[2], field_value: fields.what_s_the_bug}
]

const teste = JSON.stringify(data)

const payload = `{ \"query\": \"mutation{ createCard(input: {pipe_id: ${process.env.PIPEID} fields_attributes: ${JSON.stringify(data)} }) { card {id title }} }\" }`
console.log(teste)

/*
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
*/