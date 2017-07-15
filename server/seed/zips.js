const RandExp = require('randexp');

module.exports = () => {
  const zips = []
  for (let i = 5; i > 0; i--) {
    zips.push({
      zipCode: new RandExp(/^9[0-6]\d\d\d$/).gen()
    })
  }
  return zips
};
