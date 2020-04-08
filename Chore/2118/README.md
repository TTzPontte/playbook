# Creating a system to group messages and dispatch notification

The design chosen is with an expiration time and webhook triggered by dynamo.

The system will work with expiration time with a cron job verifying if the row of the table is expired.

1. When the time expires, the content will be deleted and triggered by dynamo sending it to another function.

2. That function will receive the data handle and distribute the notifications.

## Example

The complete example can be found in the example folder

## We will have 3 lambda functions.

1. To receive the data, expiration time and update if exists.

```json
{
  "execute_at": "Tue Apr 08 2020 17:26:09 GMT-0300 (Brasilia Standard Time)", // valid date
  "id": "random-id-4", // it can be a user_id, contract_id or something that need to be compared
  "type": "UPLOAD", // it can be UPLOAD emails, SIMULATION emails
  "data": [{ "upload_id": "1" }, { "upload_id": "2" }], // just a gross example, this will be defined later
  "message": [
    { "message": "message" },
    { "message": "second-message-added-by-update" }
  ]
}
```

2. To verify if the data expiration and delete if it expired.

The cron will execute a query verifying expiration time every 5 minutes and delete the date.

```js
var params = {
  TableName: TABLE_NAME,
  IndexName: "ExpiredTime",
  FilterExpression: "expired_timestamp < :exp_time",
  ExpressionAttributeValues: {
    ":exp_time": expired_timestamp,
  },
};
```

3. To receive data expired, handle and dispatch notifications.

```js
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
```

# References

- https://theburningmonk.com/2019/03/dynamodb-ttl-as-an-ad-hoc-scheduling-mechanism/
- https://theburningmonk.com/2019/05/using-cloudwatch-and-lambda-to-implement-ad-hoc-scheduling/
- https://github.com/theburningmonk/dynamodb-ttl-as-scheduling
