const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME, RESULT_TABLE_NAME } = process.env;

module.exports.handler = async (event, context) => {
  const items = event.Records.filter((x) => x.eventName === "REMOVE").map(
    (x) => x.dynamodb.OldImage
  );

  const transactItems = items.map((item) => ({
    Update: {
      TableName: RESULT_TABLE_NAME,
      Key: {
        id: item.id.S,
      },
      UpdateExpression: "set executedAt = :now",
      ExpressionAttributeValues: {
        ":now": new Date().toJSON(),
      },
    },
  }));

  items.forEach((item) => {
    if (item.type.S === "UPLOAD") {
      console.log("send emails with upload", item.data);
    }
    if (item.type === "SIMULATION") {
      console.log("send emails with simulation PDF", item.data);
    }
    if (item.type === "GROUPED_ACTION") {
      console.log("send emails with upload", item.data);
    }
  });

  if (transactItems.length === 0) {
    return;
  }

  const req = {
    TransactItems: transactItems,
  };

  await DynamoDB.transactWrite(req).promise();
};
