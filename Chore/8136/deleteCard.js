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
