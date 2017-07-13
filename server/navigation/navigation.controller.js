import NavigationSchema from './navigation.model';

module.exports = (server, webSocket) => {
  NavigationSchema.find({}, (err, navData) => {
    server.emit('updateNav', navData)
  })
}
