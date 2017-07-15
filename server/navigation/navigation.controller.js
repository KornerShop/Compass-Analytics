/* eslint-disable no-console */

const formatNavData = require('../utils/utils');

const Navigation = require('./navigation.model');
// date numSnap, num
const populateNav = socket => {
  const aggregateNavigation = [
    {
      $group: {
        _id: { office: '$office', date: '$date' },
        count: { $sum: 1 },
      },
    },
  ];
  Navigation.aggregate(aggregateNavigation).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      socket.emit('populate-nav-data', formatNavData(data));
    }
  });
};

const updateNav = async (io, navData) => {
  await Navigation.create(navData);
  populateNav(io);
};

module.exports = {
  populateNav,
  updateNav,
};
