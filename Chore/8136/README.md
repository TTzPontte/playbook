# Integration Pipefy API

### Docs Pipefy API
 - https://developers.pipefy.com/reference#what-is-graphql
 - https://api-docs.pipefy.com/reference/overview/Card/
 - https://pipefypipe.docs.apiary.io/#reference/0/list-pipes
 - https://app.pipefy.com/graphiql

<br>

# Getting Started

```bash
cd Chore/8136
```
### Install dependencies

```bash
yarn
```

### Add environments
### File .env

```env
PIPEFY_TOKEN=<PIPEFY-TOKEN-HERE>
PIPE_ID=<PIPE-ID-HERE>
```

<br><br>

# List Fields Start Form

```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const query = gql`
    query GetPipe($pipeId: ID!) {
      pipe(id: $pipeId) {
        id
        name
        start_form_fields {
          id
          internal_id
          type
          required
          editable
        }
      }
    }
  `

  const response = await graphQLClient.request(query, { pipeId: process.env.PIPE_ID })
  console.log(JSON.stringify(response))
}

main().catch(err => console.log(err))
```

# List cards

```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const query = gql`
    query ListCards($pipeId: ID!) {
      cards(pipe_id: $pipeId) {
        edges {
          node {
            id
            title
            done
            due_date
            url
            labels { name }
            assignees { id }
            comments { text }
            current_phase { name }
            fields { 
              name
              value
              field {
                id
                type
                description
              }
            }
            phases_history {
              phase { name }
              firstTimeIn
              lastTimeOut
            }
          }
        }
      }
    }
  `

  const response = await graphQLClient.request(query, { pipeId: process.env.PIPE_ID })
  console.log(JSON.stringify(response))
}

main().catch((err) => console.log(err));
```

# Show card

```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const query = gql`
    query ShowCard($cardId: ID!) {
      card(id: $cardId) {
        id
        url
        title
        done
        current_phase { name }
        labels { name }
        fields {
          name
          value
          field {
            id
            type
            description
          }
        }
        createdBy { created_at }
      }
    }
  `

  const response = await graphQLClient.request(query, { cardId: 415998599 })
  console.log(JSON.stringify(response))
}

main().catch((err) => console.log(err));
```

# Creating a card

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

# Update a Card

```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const mutation = gql`
    mutation UpdateCard($cardId: ID!) {
      updateCard(input: {
        id: $cardId
        title: "Atualizei esse CARA"
      })
      {
        card { id }
      }
      updateFieldsValues(input: {
        nodeId: $cardId
        values: [{ fieldId: "email_do_requisitante", value: "alterei@emailjoia.com" }]  
      }) 
      {
        success
      }
    }
  `

  const response = await graphQLClient.request(mutation, { cardId: 416284084 })
  console.log(JSON.stringify(response))
}

main().catch((err) => console.log(err));
```

# Delete a Card

```js
require('dotenv/config');
const { GraphQLClient, gql } = require('graphql-request');

const main = async () => {
  const endpoint = 'https://app.pipefy.com/queries';

  const graphQLClient = new GraphQLClient(endpoint);

  graphQLClient.setHeader('Content-Type', 'application/json')
  graphQLClient.setHeader('Authorization', `Bearer ${process.env.PIPEFY_TOKEN}`)

  const mutation = gql`
    mutation DeleteCard($cardId: ID!) {
      deleteCard(input: {
        id: $cardId
      })
      { 
        success
      }
    }
  `

  const response = await graphQLClient.request(mutation, { cardId: 416543002 });
  console.log(JSON.stringify(response));
}

main().catch((err) => console.log(err));
```

[Back to the index](..)
