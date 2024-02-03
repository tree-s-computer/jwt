import crypto from 'node:crypto';
import * as jose from 'jose';

function base64url(source: string) {
  // Encode in classical base64
  const encoded = Buffer.from(source).toString('base64');
  // Turn the base64 string into a base64url string
  return base64urlEscape(encoded);
}

function base64urlEscape(str: string) {
  // Remove padding equal characters and replace characters according to base64url specifications
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Function to sign a JWT
function signJWT(header: object, payload: object, secret: string) {
  // Convert the header and payload into JSON and base64url encode them
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  // Create the unsignedToken
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  // Sign the unsignedToken using HMAC SHA256
  const signature = crypto
    .createHmac('sha256', secret)
    .update(unsignedToken)
    .digest('base64');

  // Return the complete JWT
  return `${unsignedToken}.${base64urlEscape(signature)}`;
}

(async () => {
  // Example usage
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022,
  };

  // Secret key to sign the JWT
  const secret = 'tree';

  const jwt = signJWT(header, payload, secret);

  console.log(jwt);

  const result = await jose.jwtVerify(jwt, Buffer.from(secret));
  console.log(result);
})();
