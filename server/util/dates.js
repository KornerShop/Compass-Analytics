const moment = require('moment');

const dateArray = (arr) => {
  arr.push(moment().format('l'))
  console.log(arr);
  return arr
}

const getDates = () => {
  const dates = [];
  for (let i = 6; i > 0; i--){
    dates.push(moment().subtract(`${i}`, 'days').format('l'));
  }
  dateArray(dates)
}

module.exports = {
  getDates,
  dateArray
}
