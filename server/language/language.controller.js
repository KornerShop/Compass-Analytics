/* eslint-disable no-console */
const LanguageSchema = require('./language.model');

module.exports = (socket, lang) => {
  LanguageSchema.create(lang)
  const aggregateLanguage = [
    {
      $group: {
        _id: "$lang",
        count: {$sum: 1}
      }
    }
  ]
  LanguageSchema.aggregate(aggregateLanguage).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      socket.emit('update-language', data)
    }
  })
}
