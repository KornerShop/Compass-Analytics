import ZipCodeSchema from './zip.model';

module.exports = webSocket => {
  webSocket.emit('zipCode', data => {
    ZipCodeSchema.create(data, (err, doc) => {
      if (err) {
        console.log(err)
      }
      console.log(`the zipCode doc: ${doc}`)
    })
  })
}
