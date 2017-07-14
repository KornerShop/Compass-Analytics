/* eslint-disable no-console */

const ZipCode = require('./zip.model');

const populateZip = socket => {
  const aggregateZipCodes = [
    {
      $group: {
        _id: "$zipCode",
        count: {$sum: 1}
      }
    }
  ]
  ZipCode.aggregate(aggregateZipCodes).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      socket.emit('populate-zip-data', data)
    }
  })
};

const updateZip = async (io, zipData) => {
  await ZipCode.create(zipData);
  populateZip(io);
};

module.exports = {
  populateZip,
  updateZip
}
