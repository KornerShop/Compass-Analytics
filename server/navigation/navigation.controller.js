/* eslint-disable no-console */

const Navigation = require('./navigation.model');

const populateNav = socket => {
  const aggregateNavigation = [
    {
      $group: {
        _id: "$navigation",
        count: {$sum: 1}
      }
    }
  ]
  Navigation.aggregate(aggregateNavigation).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      socket.emit('populate-nav-data', data)
    }
  })
};

const updateNav = async (io, navData) => {
  await Navigation.create(navData);
  populateNav(io);
};

module.exports = {
  populateNav,
  updateNav
};