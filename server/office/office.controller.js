/* eslint-disable no-console */

const Office = require('./office.model');

const populateOffice = socket => {

  const aggregateOffice = [
    {
      $group: {
        _id: "$office",
        count: {$sum: 1}
      }
    }
  ]
  Office.aggregate(aggregateOffice).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      socket.emit('populate-office-data', data)
    }
  })
};

const updateOffice = async (io, officeData) => {
  await Office.create(officeData);
  populateOffice(io);
};

module.exports = {
  populateOffice,
  updateOffice
};
