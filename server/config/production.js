require('dotenv').config();

module.exports = {
  logging: false,
  seed: false,
  db: {
    url: process.env.DATABASE_URI,
  },
};
