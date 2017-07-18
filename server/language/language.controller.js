/* eslint-disable no-console */

const Language = require('./language.model');

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
      socket.emit('populate-lang-data', data);
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
