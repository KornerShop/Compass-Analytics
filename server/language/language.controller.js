/* eslint-disable no-console */
const LanguageSchema = require('./language.model');

module.exports = socket => {
  LanguageSchema.find({}, (err, languageData) => {
    // const data = [
    //       {name: 'English', uv: 4000, amt: 2400},
    //       {name: 'Spanish', uv: 3000, amt: 2210},
    // ];
    // use count, that's typically how totals are calculated
    let enUV = 0;
    let esUV = 0;
    let barChartData = {}
    languageData.forEach(data => {
      data.lang === "en" ? enUV += 1 : esUV += 1
    })
    barChartData =[
      {
        name: "English",
        uv: enUV
      },
      {
        name: "Spanish",
        uv: esUV
      }
    ]
    console.log(`language controller ${JSON.stringify(barChartData, 2, null)}`)
    socket.emit('update-language', barChartData);
  })
}
