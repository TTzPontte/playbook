const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config.region = "us-east-1";
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const params = {
  UserPoolId: "us-east-1_z78yfwDLK" /* required */,
  Username: "email.test@gmail.com" /* required */,
  DesiredDeliveryMediums: ["EMAIL", "SMS"],
  ForceAliasCreation: false,
  MessageAction: "SUPPRESS",
  UserAttributes: [
    { Name: "email", Value: "email.test@gmail.com" } /* required */,
    { Name: "phone_number", Value: "+5551981980387" } /* required */,
    { Name: "custom:cpf", Value: "04212286017" } /* required */
  ],
  ValidationData: [
    {
      Name: "trackCode",
      Value: "21a81129400fbf441ae138e52eae8778"
    } /* required */,
    { Name: "simulationId", Value: "mHPkDoN3TNqw7G3nxA4GAw" } /* required */,
    { Name: "loanValue", Value: "123123" } /* required */,
    { Name: "term", Value: "180" } /* required */,
    { Name: "installment", Value: "2439.02" } /* required */,
    { Name: "loanValueSelected", Value: "123123" } /* required */,
    { Name: "phone", Value: "+55 (51) 98198-0387" } /* required */,
    { Name: "campaign", Value: "meugiro" },
    { Name: "source", Value: "meugiro" }
  ]
};

cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
