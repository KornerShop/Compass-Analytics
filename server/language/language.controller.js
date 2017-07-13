/* eslint-disable no-console */

import LanguageSchema from './language.model';

module.exports = (server, socket) => {
  // look at how to consume an event
  // look at how to emit an event
  // create a listener for language event
  // socket.on('language', data => {
  //   // add language object to collection
  //   LanguageSchema.create(data, (err, doc) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     // query entire collections
  //     LanguageSchema.find({}, data => {
  //       console.log(`data: ${data}`)
  //       server.emit('updateLanguage', data => {
  //         console.log(`${data}`)
  //       })
  //     })
  //   });
  // })
  LanguageSchema.find({}, (err, languageData) => {
    server.emit('updateLanguage', languageData)
  })
}
