const NavigationSchema = require('./navigation.model');

module.exports = (socket) => {
  const aggregateNavigation = [
    {
      $group: {
        _id: "$navigation",
        count: {$sum: 1}
      }
    }
  ]
  NavigationSchema.aggregate(aggregateNavigation).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      socket.emit('updateNav', data)
    }
  })
}
