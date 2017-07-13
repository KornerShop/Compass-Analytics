import OfficeSchema from './office.model';

module.exports =  (server, webSocket) => {
  OfficeSchema.find({}, (err, officeData) => {
    server.emit('updateOffice', officeData)
  })
}
