const Language = require('../language/language.model');
const Navigation = require('../navigation/navigation.model');
const Office = require('../office/office.model');
const ZipCode = require('../zip/zip.model');

const generateNavs = require('./navs');
const generateLanguages = require('./languages');
const generateOffices = require('./offices');
const generateZips = require('./zips');

const createDoc = (Model, doc) => {
  return new Promise((resolve, reject) => {
    new Model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = () => {
  const promises = [Language, ZipCode, Office, Navigation]
    .map(model => model.remove().exec());
    console.log('...🌱...🌻...🌲');
  return Promise.all(promises);
}

const createLanguages = data => {
  console.log(`languages: ${JSON.stringify(generateZips(), null, 2)}`)
  const promises = generateLanguages().map(lang => createDoc(Language, lang));
  return Promise.all(promises)
    .then(lang => Object.assign({languages: lang}, data || {}));
};

const createNavs = data => {
  console.log(`navs: ${JSON.stringify(generateNavs(), null, 2)}`)
  const promises = generateNavs().map(nav => createDoc(Navigation, nav));
  return Promise.all(promises)
    .then(nav => Object.assign({navigation: nav}, data || {}));
};

const createOffices = data  => {
  console.log(`offices: ${JSON.stringify(generateOffices(), null, 2)}`)
  const promises = generateOffices().map(office => createDoc(Office, office));
  return Promise.all(promises)
    .then(office => Object.assign({officeChoosen: office}, data || {}));
}

const createZipCode = data => {
  console.log(`zips: ${JSON.stringify(generateZips(), null, 2)}`);
  const promises = generateZips().map(zip => createDoc(ZipCode, zip));
  return Promise.all(promises)
    .then(zip => Object.assign({zipCode: zip}, data || {}));
}

cleanDB()
  .then(createLanguages)
  .then(createNavs)
  .then(createOffices)
  .then(createZipCode)
