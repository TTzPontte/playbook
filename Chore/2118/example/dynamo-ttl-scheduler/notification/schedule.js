const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME, RESULT_TABLE_NAME } = process.env;

module.exports.handler = async (event, context) => {
  const { id, execute_at, type, data } = JSON.parse(event.body);
  const expired_timestamp = new Date(execute_at).getTime();
  const ttl = Math.ceil(new Date(execute_at).getTime() / 1000);

  console.log("event :", JSON.parse(event.body));

  const params = {
    TransactItems: [
      {
        Put: {
          TableName: TABLE_NAME,
          Item: {
            id,
            expired_timestamp,
            ttl,
            type,
            data,
          },
        },
      },
      {
        Put: {
          TableName: RESULT_TABLE_NAME,
          Item: {
            id,
            scheduledFor: new Date(execute_at).toJSON(),
          },
        },
      },
    ],
  };
  try {
    await DynamoDB.transactWrite(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ id, ttl }),
    };
  } catch (error) {
    console.log("error.message :", error.message);
  }
};
