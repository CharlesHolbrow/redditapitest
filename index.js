// Get Reddit oauth token via Oauth2, without using an oauth library.
//
// Following this tutorial here:
// https://github.com/reddit/reddit/wiki/OAuth2

// Npm imports
const qs = require('query-string');
const request = require('request-promise-native');
const app = require('express')();
const basic = require('basic-authorization-header');

// basic variables
const state = Math.random().toString(36).substring(2);
const redirect = 'http://127.0.0.1:9000/authcb';
const clientID = 'v27B6bRx4_oh2Q';
const clientSecret = 'tX30NERDIl72xsgEil8M2_4IBiw';

const queryString = qs.stringify({
  client_id: clientID,
  response_type: 'code',
  state: state,
  redirect_uri: redirect,
  duration: 'permanent',
  scope: 'read wikiread',
});

const url = 'https://www.reddit.com/api/v1/authorize?' + queryString;

console.log('query state:', state);
console.log(url);

app.get('/authcb', (req, res) => {
  if (req.query.error) return res.send(req.query);
  if (!req.query.code) console.log('error: /authcb request has no code');

  const body = qs.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: redirect,
  });

  request.post({
    uri: 'https://www.reddit.com/api/v1/access_token',
    body: body,
    headers: { Authorization: basic(clientID, clientSecret) },
  }).then(
    (result) => {
      console.log('success:', result);
      // {"access_token": "LJFZdsaGeht_YgAD-ZDTqWZrbv8",
      // "token_type": "bearer",
      // "expires_in": 3600,
      // "refresh_token": "20771843-JnBlWPizEHNiQC6bxtDBjrcculw",
      // "scope": "read wikiread"}
      res.send(result);
    },
    (reason) => {
      const ans = { name: reason.name, statusCode: reason.statusCode, message: reason.message, error: reason.error };
      console.log('error:', ans);
      res.send(ans);
    }
  );
});

app.listen(9000, () => {
    console.log('listening on 9000');
});
