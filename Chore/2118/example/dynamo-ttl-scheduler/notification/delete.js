const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const DynamoDB = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME } = process.env;

module.exports.handler = async (event, context) => {
  const expired_timestamp = new Date().getTime();

  var params = {
    TableName: TABLE_NAME,
    IndexName: "ExpiredTime",
    FilterExpression: "expired_timestamp < :exp_time",
    ExpressionAttributeValues: {
      ":exp_time": expired_timestamp,
    },
  };

  const expired_data = await DynamoDB.scan(params).promise();

  if (expired_data && expired_data.Items && expired_data.Items.length) {
    console.log("Expired quantity: ", expired_data.Items.length);
    for (let item of expired_data.Items) {
      await DynamoDB.delete({
        TableName: TABLE_NAME,
        Key: {
          id: item.id,
        },
      }).promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ expired_data }),
    };
  } else {
    console.log("Nothing found", new Date());
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Nothing found" }),
    };
  }
};
