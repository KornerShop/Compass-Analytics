const User = require('../user/model');
const Language = require('../language/language.model');
const Navigation = require('../navigation/navigation.model');
const Office = require('../office/office.model');
const ZipCode = require('../zip/zip.model');

const generateUsers = require('./users');
const generateNavs = require('./navs');
const generateLanguages = require('./languages');
const generateOffices = require('./offices');
const generateZips = require('./zips');

const createDoc = (Model, doc) =>
  new Promise((resolve, reject) => {
    new Model(doc).save(
      (err, saved) => (err ? reject(err) : resolve(saved)),
    );
  });

const cleanDB = () => {
  const promises = [
    User,
    Language,
    ZipCode,
    Office,
    Navigation,
  ].map(model => model.remove().exec());
  console.log('seeding...🌱...🌻...🌲');
  return Promise.all(promises);
};

const createUsers = data => {
  const promises = generateUsers().map(user => createDoc(User, user));
  return Promise.all(promises).then(user =>
    Object.assign(
      {
        users: user,
      },
      data || {},
    ),
  );
};

const createLanguages = data => {
  const promises = generateLanguages().map(lang =>
    createDoc(Language, lang),
  );
  return Promise.all(promises).then(lang =>
    Object.assign({ languages: lang }, data || {}),
  );
};

const createNavs = data => {
  const promises = generateNavs().map(nav =>
    createDoc(Navigation, nav),
  );
  return Promise.all(promises).then(nav =>
    Object.assign({ navigation: nav }, data || {}),
  );
};

const createOffices = data => {
  const promises = generateOffices().map(office =>
    createDoc(Office, office),
  );
  return Promise.all(promises).then(office =>
    Object.assign({ officeChoosen: office }, data || {}),
  );
};

const createZipCode = data => {
  const promises = generateZips().map(zip => createDoc(ZipCode, zip));
  return Promise.all(promises).then(zip =>
    Object.assign({ zipCode: zip }, data || {}),
  );
};

cleanDB()
  .then(createUsers)
  .then(createLanguages)
  .then(createNavs)
  .then(createOffices)
  .then(createZipCode)
  .then(() => console.log('seeded 👨‍🌾'));
