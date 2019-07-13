// Paths
const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// @see {@link https://github.com/facebook/create-react-app/issues/637}
const rootDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath =>
  path.resolve(rootDirectory, relativePath);

module.exports = {
  resolveAppPath,
  db: resolveAppPath('db.json'),
};
