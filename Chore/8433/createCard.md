## Summary

- [Getting Started](#Document Upload)

# Create a card

[comment]:<todo> ( todo ref! form fields xls)

> for a list of fields please refer to the `fields.xls`
```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const fields = {
  nome_do_requisitante: 'John Doe',
  email_do_requisitante: 'johndoe@email.com',
  what_s_the_bug: 'BUG Do John DOE'
}

const data = [
  {field_id: Object.keys(fields)[0], field_value: fields.nome_do_requisitante},
  {field_id: Object.keys(fields)[1], field_value: fields.email_do_requisitante},
  {field_id: Object.keys(fields)[2], field_value: fields.what_s_the_bug}
]

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const mutation = gql`
    mutation CreateCard($pipeId: ID!, $fieldsAttributes: [FieldValueInput]!) {
      createCard(
        input: {
          pipe_id: $pipeId
          fields_attributes: $fieldsAttributes
        }
      )
      {
        card { id }
      }
    }
  `

  const response = await graphQLClient.request(mutation, { pipeId: process.env.PIPE_ID, fieldsAttributes: data });
  console.log(JSON.stringify(response));
}

main().catch((err) => console.log(err));
```

<br>