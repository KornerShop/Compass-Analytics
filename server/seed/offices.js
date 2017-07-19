const moment = require('moment');

module.exports = () => {
  const offices = [];
  for (let i = 7; i >= 0; i--) {
    for (let j = Math.floor(Math.random() * 13 + 1); j >= 1; j--) {
      if (i === 0) {
        offices.push(moment().format('l'));
      } else {
        offices.push(moment().subtract(`${i}`, 'days').format('l'));
      }
    }
  }
  return offices.map(date => ({
    date,
    office: Math.random() * 1 > 0.5 ? 'WIC' : 'SNAP'
  }))
};
