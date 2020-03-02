const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config.region = "us-east-1";
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

// params to send when the temporary password is expired and needs to be renewed
const params = {
  UserPoolId: "us-east-1_z78yfwDLK" /* required */,
  Username: "email.test@gmail.com" /* required */,
  DesiredDeliveryMediums: ["EMAIL", "SMS"],
  MessageAction: "RESEND"
};

cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
