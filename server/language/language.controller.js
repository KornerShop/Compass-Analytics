/* eslint-disable no-console */
const Language = require('./language.model');

// strictly listening for data for initial render
const populateLang = socket => {
  const aggregateLanguage = [
    {
      $group: {
        _id: "$lang",
        count: {$sum: 1}
      }
    }
  ]
  Language.aggregate(aggregateLanguage).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      socket.emit('populate-language-data', data)
    }
  })
}

const updateLang = async (socket, langData) => {
  await Language.create(langData);
  populateLang(socket);
};

module.exports = {
  populateLang,
  updateLang
};
