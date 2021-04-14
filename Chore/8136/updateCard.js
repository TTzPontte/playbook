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
