# Creating a new cognito user by API

### References

- https://app.clubhouse.io/pontte/story/2115/cria%C3%A7%C3%A3o-do-usu%C3%A1rio-cognito-via-sistema
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property

# Creating a user with SDK using cognito

- UserAttributes is required fields to create a cognito user
- ValidationData is required to validate fields on `pre_register_insert.py` lambda function.

```js
const params = {
  UserPoolId: "us-east-1_z78yfwDLK" /* required */,
  Username: "email.test@gmail.com" /* required */,
  DesiredDeliveryMediums: ["EMAIL", "SMS"],
  ForceAliasCreation: false,
  MessageAction: "SUPPRESS",
  UserAttributes: [
    { Name: "email", Value: "email.test@gmail.com" },
    { Name: "phone_number", Value: "+5551981980387" },
    { Name: "custom:cpf", Value: "04212286017" }
  ],
  ValidationData: [
    { Name: "trackCode", Value: "21a81129400fbf441ae138e52eae8778" },
    { Name: "simulationId", Value: "mHPkDoN3TNqw7G3nxA4GAw" },
    { Name: "loanValue", Value: "123123" },
    { Name: "term", Value: "180" },
    { Name: "installment", Value: "2439.02" },
    { Name: "loanValueSelected", Value: "123123" },
    { Name: "phone", Value: "+55 (51) 99999-9999" }
  ]
};
CognitoIdentityServiceProvider.adminCreateUser(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
```

### Requesting a new temporary password using `adminCreateUser` function.

```js
const params = {
  UserPoolId: "us-east-1_z78yfwDLK" /* required */,
  Username: "email.test@gmail.com" /* required /email */,
  DesiredDeliveryMediums: ["EMAIL", "SMS"],
  MessageAction: "RESEND" /* Action */
};
```

### After validate register endpoint, we need to setup cognito

- Cognito uses the lambda (pre_register_insert.py) to verify and validade fields

  1. O cpf informado não é válido
  2. Uma conta com esse CPF já existe
  3. o parâmetro trackCode não foi enviado
  4. informações da simulação estão erradas

  ```py
  if (not simulation["id"]
      or not simulation["loanValue"]
      or not simulation["term"]
      or not simulation["loanValueSelected"]
      or not simulation["installment"]
      or not simulation["phone"]):
  ```

- If everything is valid, cognito will create a new Cognito user, sending a temporary password, updating their own `UserStatus` with `FORCE_CHANGE_PASSWORD`, which is forcing to change the password in the next `SignUp` <- need to be validated

- A new page/endpoint must be created to update with the new password

## Questions

1. Could we use a temporary password instead of a link?

2. Will we use a `cognito` or `AWS SES` to send e-mails? (because of the limits)

[Back to the index](..)
