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
