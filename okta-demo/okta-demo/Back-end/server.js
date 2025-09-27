const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Replace with your actual Okta domain and audience
const oktaDomain = 'https://demo-azure-marsupial-56101.okta.com/oauth2/ausjfu4hbumYKoFdA697';
const audience = 'App5475856';

const client = jwksClient({
  jwksUri: `${oktaDomain}/v1/keys`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

app.get('/secure', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Missing or invalid Authorization header');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, {
    audience: audience,
    issuer: oktaDomain,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    res.send('Congrats! You just granted access to your Angular app using Okta as IDP');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
