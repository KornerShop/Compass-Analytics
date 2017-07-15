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
  const cleanPromises = [Language, ZipCode, Office, Navigation]
    .map((model) => {
      return model.remove().exec();
    });
    console.log('...🌱...🌻...🌲');
  return Promise.all(cleanPromises);
}

const createLanguages = data => {
  const promises = generateLanguages().map(lang => createDoc(Language, lang));
  return Promise.all(promises)
    .then(lang => Object.assign({languages: lang}, data || {}));
};

const createNavs = data => {
  console.log(`navigation: ${JSON.stringify(generateNavs(), null, 2)}`);
  const promises = generateNavs().map(nav => createDoc(Navigation, nav));
  return Promise.all(promises)
    .then(nav => Object.assign({navigation: nav}, data || {}));
};
//
// const createofficeChoosen = (data)  => {
//   const promises = officeChoosen.map((office) =>{
//     return createDoc(Office, office);
//   });
//   return Promise.all(promises)
//     .then(office => {
//       return Object.assign({officeChoosen: office}, data || {});
//     });
// }
//
// const createZipCode = (data) => {
//   const promises = zipCode.map(zip =>{
//     return createDoc(ZipCode, zip);
//   });
//   return Promise.all(promises)
//     .then(zip => {
//       return Object.assign({zipCode: zip}, data || {});
//     });
// }

cleanDB()
  .then(createLanguages)
  .then(createNavs);
  // .then(createofficeChoosen)
  // .then(createZipCode)
