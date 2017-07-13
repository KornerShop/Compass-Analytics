const ZipCodeSchema = require('./zip.model');
module.exports = socket => {
  const aggregateZipCodes = [
    {
      $group: {
        _id: "$zipCode",
        count: {$sum: 1}
      }
    }
  ]
  ZipCodeSchema.aggregate(aggregateZipCodes).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      socket.emit('updateZip', data)
    }
  })
}
