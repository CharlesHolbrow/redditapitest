const snoowrap = require('snoowrap');

const result = {
  "access_token": "LJFZdsaGeht_YgAD-ZDTqWZrbv8",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "20771843-JnBlWPizEHNiQC6bxtDBjrcculw",
  "scope": "read wikiread"
}

const clientID = 'v27B6bRx4_oh2Q';
const clientSecret = 'tX30NERDIl72xsgEil8M2_4IBiw';

const r = new snoowrap({
  userAgent: 'charlesbot',
  clientId: clientID,
  clientSecret: clientSecret,
  refreshToken: result.refresh_token,
});

// r.getSubreddit('bitcoin').getHot().forEach((val) => {
//   console.log(val.score, val.title);
// });

// console.log('break\n\n\n');

r.getSubreddit('altcoin').getHot().forEach((val) => {
  console.log(val.score, val.title);
});
