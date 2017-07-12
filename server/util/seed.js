import Language from '../api/language/languageModel';
import Navigation from '../api/navigation/navigationModel';
import Office from '../api/office/officeModel';
import ZipCode from '../api/zipCode/zipCodeModel';

const languages = [
  { lang: 'en' },
  { lang: 'es' },
  { lang: 'es' },
  { lang: 'es' },
  { lang: 'es' },
  { lang: 'en' },
  { lang: 'en' },
];

const navigationInitiated = [
  { navigation: true },
  { navigation: true },
  { navigation: true },
  { navigation: true },
  { navigation: true },
  { navigation: true },
];

const officeChoosen = [
  { office: 'wic' },
  { office: 'snap' },
  { office: 'wic' },
  { office: 'snap' },
  { office: 'wic' },
  { office: 'snap' },
  { office: 'wic' },
  { office: 'snap' },
];

const zipCode =[
  {zipCode: 90717},
  {zipCode:95404},
  {zipCode: 90001},
  {zipCode: 91436},
  {zipCode: 94080}
]

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
  return Promise.all(cleanPromises);
}

const createLanguages = (data) => {
  const promises = languages.map((lang) => {
    return createDoc(Language, lang);
  });
  return Promise.all(promises)
    .then(lang => {
      return Object.assign({languages: lang}, data || {});
    });
};

const createNavigationInitiated = (data) => {
  const promises = navigationInitiated.map((bool) => {
    return createDoc(Navigation, bool);
  });
  return Promise.all(promises)
    .then(bool => {
      return Object.assign({navigationInitiated: bool}, data || {});
    });
};

const createofficeChoosen = (data)  => {
  const promises = officeChoosen.map((office) =>{
    return createDoc(Office, office);
  });
  return Promise.all(promises)
    .then(office => {
      return Object.assign({officeChoosen: office}, data || {});
    });
}

const createZipCode = (data) => {
  const promises = zipCode.map(zip =>{
    return createDoc(ZipCode, zip);
  });
  return Promise.all(promises)
    .then(zip => {
      return Object.assign({zipCode: zip}, data || {});
    });
}

cleanDB()
  .then(createofficeChoosen)
  .then(createZipCode)
  .then(createLanguages)
  .then(createNavigationInitiated);
