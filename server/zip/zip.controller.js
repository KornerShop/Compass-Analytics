import ZipCodeSchema from './zip.model';

module.exports = (server, webSocket) => {
  ZipCodeSchema.find({}, (err, zipData) => {
    server.emit('updateZip', zipData)
  })
}
