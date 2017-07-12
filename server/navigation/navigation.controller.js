import NavigationSchema from './navigation.model';

module.exports = webSocket => {
  webSocket.emit('navigation', data => {
    NavigationSchema.create(data, (err, doc) => {
      if (err) {
        console.log(err)
      }
      console.log(`the navigation doc: ${doc}`)
    })
  })
}
