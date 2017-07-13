const OfficeSchema = require('./office.model');

module.exports =  (socket) => {

  const aggregateOffice = [
    {
      $group: {
        _id: "$office",
        count: {$sum: 1}
      }
    }
  ]
  OfficeSchema.aggregate(aggregateOffice).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      socket.emit('updateOffice', data)
    }
  })
}
