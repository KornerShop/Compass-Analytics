const randtoken = require('rand-token').generator();

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 8080,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: randtoken.generate(64)
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
try {
  envConfig = require(`./${config.env}`);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = Object.assign(config, envConfig);
