const Language = require('../language/language.model');
const Navigation = require('../navigation/navigation.model');
const Office = require('../office/office.model');
const ZipCode = require('../zip/zip.model');

const generateNavs = require('./navs');
const generateLanguages = require('./languages');
const generateOffices = require('./offices');
const generateZips = require('./zips');

const createDoc = (Model, doc) => new Promise((resolve, reject) => {
    new Model(doc).save((err, saved) => err ? reject(err) : resolve(saved));
  });

const cleanDB = () => {
  const promises = [
    Language,
    ZipCode,
    Office,
    Navigation,
  ].map(model => model.remove().exec());
  console.log('seeding...🌱...🌻...🌲');
  return Promise.all(promises);
};

const createLanguages = data => {
  const promises = generateLanguages().map(lang =>
    createDoc(Language, lang)
  );
  return Promise.all(promises).then(lang =>
    Object.assign({ languages: lang }, data || {})
  );
};

/*
{
  "lang": "Spanish" || "English"
}
*/

const createNavs = data => {
  const promises = generateNavs().map(nav =>
    createDoc(Navigation, nav)
  );
  return Promise.all(promises).then(nav =>
    Object.assign({ navigation: nav }, data || {})
  );
};

/*
{
  "date": "7/15/2017",
  "office": "SNAP" || "WIC"
}
*/

const createOffices = data => {
  const promises = generateOffices().map(office =>
    createDoc(Office, office)
  );
  return Promise.all(promises).then(office =>
    Object.assign({ officeChoosen: office }, data || {})
  );
};

/*
{
  "date": "7/15/2017",
  "office": "SNAP" || "WIC"
}
*/

const createZipCode = data => {
  const promises = generateZips().map(zip => createDoc(ZipCode, zip));
  return Promise.all(promises).then(zip =>
    Object.assign({ zipCode: zip }, data || {})
  );
};

/*
{
  "zipCode": "94962"
}
*/

cleanDB()
  .then(createLanguages)
  .then(createNavs)
  .then(createOffices)
  .then(createZipCode)
  .then(() => console.log('seeded 👨‍🌾'))
