const RandExp = require('randexp');

module.exports = () => {
  const zips = []
  for (let i = 10; i > 0; i--) {
    zips.push({
      zipCode: RandExp(/^9[0-6]\d\d\d$/).gen()
    })
  }
  return zips
}; 
