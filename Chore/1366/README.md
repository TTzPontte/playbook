# API Authentication

### Creating a API_KEY

```js
const handler = async (event, context) => {
  const clientId = createKey.create().apiKey;
  return Lambda.Response.success({ clientId });
};
```

We're using `uuid-apikey` to create a key for us. The response will look something like:

```
N8PAR8M-JXT4C8G-QNYTJBZ-0DGM0SE
```

With this `API_KEY` the client can request a `TOKEN` that will be used to make HTTP requests to API. He just needs to pass this `api_key` in the request header.

```json
"headers": {
  "Referer": "link",
  "api-client-id": "N8PAR8M-JXT4C8G-QNYTJBZ-0DGM0SE"
}
```

### Creating a JWT Token

```js
const handler = async (event, context) => {
  const clientId = event.headers['api-client-id'];
  if (!isClientIdValid(clientId)) {
    return Lambda.Response.error('Invalid client ID');
  }

  const token = jwt.sign(
    { clientId },
    ']W5!{p2,<m^)0\vQjo!)+QVk{[di&)&8S:V+Dpx)bLQE+[<=zlLZE+qnd^_v@s^'
  );

  return Lambda.Response.success({ token });
};
```

We're using `jsonwebtoken` library to create and validate tokens for us.

First we've to get the `api_key` from the request header and validate it. The `isClientIdValid` function will receive an `api_key` and check if this key is valid or not by checking it in database.

If the `api_key` is valid we create a jwt token with `sign` function of `jsonwebtoken`. This function accepts two parameters the first one is the object payload, we're passing the `clientId` in this payload because it will be used on `verify` function. The second Parameter is a `secretKey` that will be used to encrypt and decrypt the token. Finally we send the token to the client.

The token will look something like:

```
N8PAR8M-JXT4C8G-QNYTJBZ-0DGM0SE.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Ik44UEFSOE0tSlhUNEM4Ry1RTllUSkJaLTBER00wU0UiLCJpYXQiOjE1ODM0MjY5ODJ9.dFdr27z7Z2-N0w99xMchSK5aIH2Lfvd31uXu04UxbU8
```

### Verifying Token

Once the user has the token he can make http requests to the API by passing it in the header.

```json
"header":{
  "Referer": "link",
  "x-access-token": "N8PAR8M-JXT4C8G-QNYTJBZ-0DGM0SE.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Ik44UEFSOE0tSlhUNEM4Ry1RTllUSkJaLTBER00wU0UiLCJpYXQiOjE1ODM0MjY5ODJ9.dFdr27z7Z2-N0w99xMchSK5aIH2Lfvd31uXu04UxbU8"
}
```

Each request will go through a middleware that will check whether this token is valid or not.

```js
module.exports = () => {
  return {
    before: async (handler, next) => {
      const { event } = handler;
      const token = event.headers['x-access-token'];
      if (!token) throw new createError.Unauthorized();
      try {
        const decode = await jwt.verify(
          token,
          ']W5!{p2,<m^)0\vQjo!)+QVk{[di&)&8S:V+Dpx)bLQE+[<=zlLZE+qnd^_v@s^'
        );
        const clientId = decode.clientId;
        if (!isClientIdValid(clientId)) {
          throw new createError.Unauthorized();
        }
        next();
      } catch {
        throw new createError.Unauthorized();
      }
    }
  };
};
```

We're using `verify` function of `jsonwebtoken` witch accepts two parameters the first one is the token to be verified and the second is the `secretKey` to decrypt the token. This function returns a `decode` object that will be the same object passed on token creation. Or the function throw a error saying that the token is invalid. If the token do not exist, is invalid or the `api_key` is invalid the use can't access the API and an `Unauthorized` error is returned. If all goes right the request continue and the user receives a successfully response.

### Authentication flow

![image](https://user-images.githubusercontent.com/19830660/76007306-99920d80-5eec-11ea-9954-6cd3e53fd84e.png)

### Questions

- Will the user encrypt the data to be sent?

### References

- https://auth0.com/learn/json-web-tokens/
- https://github.com/auth0/node-jsonwebtoken
- https://github.com/chronosis/uuid-apikey
