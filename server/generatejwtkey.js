const crypto = require('crypto');

const generateJWTSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateJWTSecretKey());
