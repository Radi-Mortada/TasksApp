// login-middleware.js
const DB = require('../../db.json');

const { users } = DB;

module.exports = (req, res) => {
  const { body } = req;

  const { username, password } = body;
  const existingUser = users.find(dbUser => dbUser.username === username);

  if (existingUser) {
    if (
      existingUser.username === username &&
      existingUser.password === password
    )
      return res.status(200).json(existingUser);
  }
  res.statusMessage = 'wrong `username` or `password`';
  return res.status(400).end();
};
