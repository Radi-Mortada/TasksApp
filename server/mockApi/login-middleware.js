// signup-middleware.js
const fs = require('fs');
const { db: dbPath } = require('../paths');

module.exports = (req, res) => {
  const { body } = req;

  const DB = fs.readFileSync(dbPath);

  const { users } = JSON.parse(DB);

  const { email, password } = body;
  const existingUser = users.find(dbUser => dbUser.email === email);

  if (existingUser) {
    if (existingUser.email === email && existingUser.password === password)
      return res.status(200).json(existingUser);
  }
  res.statusMessage = 'wrong `email` or `password`';
  return res.status(400).end();
};
