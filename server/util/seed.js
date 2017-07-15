const Language = require('../language/language.model');
const Navigation = require('../navigation/navigation.model');
const Office = require('../office/office.model');
const ZipCode = require('../zip/zip.model');
const { getDates, dateArray} = require('./dates');

const languages = [
  { lang: 'English' },
  { lang: 'Spanish' },
  { lang: 'Spanish' },
  { lang: 'Spanish' },
  { lang: 'Spanish' },
  { lang: 'English' },
  { lang: 'English' },
];

// date: {
//   type: String,
//   required: true
// },
// office: {
//   type: String,
//   required: true
// }
const navigationInitiated = [
  // add 6
  { date: dateArray[5], office: "WIC" },
  { date: dateArray[5], office:"SNAP" },
  { date: dateArray[5], office: "WIC" },
  { date: dateArray[5], office:"SNAP" },
  { date: dateArray[4], office: "WIC" },
  { date: dateArray[4], office:"SNAP" },
  { date: dateArray[4], office:"SNAP" },
  { date: dateArray[4], office:"SNAP" },
  { date: dateArray[3], office: "WIC" },
  { date: dateArray[3], office:"SNAP" },
  { date: dateArray[3], office: "WIC" },
  { date: dateArray[2], office:"SNAP" },
  { date: dateArray[2], office:"SNAP" },
  { date: dateArray[2], office:"SNAP" },
  { date: dateArray[1], office: "WIC" },
  { date: dateArray[1], office: "WIC" },
  { date: dateArray[1], office: "WIC" },
  { date: dateArray[1], office:"SNAP" },
  { date: dateArray[0], office: "WIC" },
  { date: dateArray[0], office: "SNAP" },
  { date: dateArray[0], office: "WIC" },
  { date: dateArray[0], office:"SNAP" },
];

const officeChoosen = [
  { office: 'WIC' },
  { office: 'SNAP' },
  { office: 'WIC' },
  { office: 'SNAP' },
  { office: 'WIC' },
  { office: 'SNAP' },
  { office: 'WIC' },
  { office: 'SNAP' },
];

const zipCode =[
  {zipCode: 90717},
  {zipCode:95404},
  {zipCode: 90717},
  {zipCode:95404},
  {zipCode: 90001},
  {zipCode: 91436},
  {zipCode: 91436},
  {zipCode: 91436},
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
    console.log('this is happening on seeds')
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
  getDates();
  const promises = navigationInitiated.map((init) => {
    return createDoc(Navigation, init);
  });
  return Promise.all(promises)
    .then(init => {
      return Object.assign({navigationInitiated: init}, data || {});
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
