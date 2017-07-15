const RandExp = require('randexp');

module.exports = () => {
  const zips = [];
  for (let i = 7; i > 0; i--) {
    const zipCode = new RandExp(/^9[0-6]\d\d\d$/).gen();
    for (let j = Math.floor(Math.random() * 100); j > 0; j--) {
      zips.push({
        zipCode,
      });
    }
  }
  return zips;
};
