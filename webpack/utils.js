/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const env = fs.existsSync(path.join(__dirname, '../.env')) ? dotenv.config().parsed : {};

module.exports = {
  env,
};
