// signup-middleware.js
const fs = require('fs');
const { db: dbPath } = require('../paths');

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

module.exports = (req, res, next) => {
  const { body } = req;

  const DB = fs.readFileSync(dbPath);
  const { users } = JSON.parse(DB);

  const { email, password } = body;

  const existingUser = users.some(dbUser => dbUser.email === email);

  if (!password) {
    res.statusMessage = 'Password field is required.';
    return res.status(400).end();
  }

  const validEmail = validateEmail(email);

  if (!validEmail) {
    res.statusMessage = 'Invalid email address.';
    return res.status(400).end();
  }

  if (existingUser) {
    res.statusMessage =
      'Existing email address, please use another email or login.';
    return res.status(400).end();
  }
  next();
  return undefined;
};
