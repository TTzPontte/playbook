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
