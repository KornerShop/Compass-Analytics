import ZipCodeSchema from './zip.model';

module.exports = socket => {
  ZipCodeSchema.find({}, (err, zipData) => {
    socket.emit('updateZip', zipData)
  })
}
