/* eslint-disable no-console */

const Language = require('./language.model');

// strictly listening for data for initial render
const populateLang = socket => {
  const aggregateLanguage = [
    {
      $group: {
        _id: "$lang",
        value: {$sum: 1}
      }
    }
  ]
  Language.aggregate(aggregateLanguage).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      socket.emit('populate-language-data', data);
    }
  });
}

const updateLang = async (io, langData) => {
  await Language.create(langData);
  populateLang(io);
};

module.exports = {
  populateLang,
  updateLang
};
