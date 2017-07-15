const moment = require('moment');

module.exports = () => {
  const dates = [];
  for (let i = 7; i >= 0; i--) {
    if (i === 0) {
      dates.push(moment().format('l'));
    } else {
      dates.push(moment().subtract(`${i}`, 'days').format('l'));
    }
  }
  return dates.map(date => ({
    date,
    office: Math.random() * 1 > 0.5 ? 'WIC' : 'SNAP'
  }))
};
