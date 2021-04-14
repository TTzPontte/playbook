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
