import OfficeSchema from './office.model';

module.exports =  webSocket => {
  webSocket.emit('office', data => {
    OfficeSchema.create(data, (err, doc) => {
      if (err) {
        console.log(err)
      }
      console.log(`the office doc: ${doc}`)
    })
  })
}
