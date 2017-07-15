const moment = require('moment');

module.exports = () => {
  const dates = [];
  for (let i = 7; i >= 0; i--) {
    for (let j = Math.floor(Math.random() * 100 + 1); j >= 1; j--) {
      if (i === 1) {
        dates.push(moment().format('l'));
      } else {
        dates.push(moment().subtract(`${i}`, 'days').format('l'));
      }
    }
  }
  return dates.map(date => ({
    date,
    office: Math.random() * 1 > 0.5 ? 'WIC' : 'SNAP'
  }))
};
