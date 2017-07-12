import LanguageSchema from './language.controller';

module.exports = socket => {
  // look at how to consume an event
  // look at ho to emit an event

  // create a listener for language event
  socket.on('language', data => {
    // add language object to collection
    LanguageSchema.create(data, (err, doc) => {
      if (err) {
        console.log(err);
      }
      // query entire collection
      console.log(`the language doc: ${doc}`);
      // emit that collection to analytics client
      socket.emit('updateLanguage', data => {

      });
    })
  });
}
