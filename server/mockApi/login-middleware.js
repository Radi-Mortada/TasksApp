// login-middleware.js

module.exports = (req, res) => {
  const { body } = req;
  // eslint-disable-next-line
  const DB = require('../../db.json');

  const { users } = DB;

  const { email, password } = body;
  const existingUser = users.find(dbUser => dbUser.email === email);

  if (existingUser) {
    if (existingUser.email === email && existingUser.password === password)
      return res.status(200).json(existingUser);
  }
  res.statusMessage = 'wrong `email` or `password`';
  return res.status(400).end();
};
