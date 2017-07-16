module.exports = navData => {
  const formattedData = [];
  navData.forEach(obj => {
    if (
      !formattedData.find(
        (element, idx) => element.date === obj._id.date
      )
    ) {
      formattedData.push({
        date: obj._id.date,
        [obj._id.office === 'SNAP' ? 'SNAP' : 'WIC']: obj.count,
      });
    } else {
      const objToEdit =
        formattedData[
          formattedData.findIndex(
            element => element.date === obj._id.date
          )
        ];
      objToEdit[obj._id.office === 'SNAP' ? 'SNAP' : 'WIC'] =
        obj.count;
    }
  });
  formattedData.forEach(element => {
    if (!element.SNAP) {
      element.SNAP = Math.floor(Math.random() * 100) + 1;
    }
    if (!element.WIC) {
      element.WIC = Math.floor(Math.random() * 100) + 1;
    }
  });
  return formattedData.sort((dis, dat) => {
    const thisDate = new Date(dis.date);
    const thatDate = new Date(dat.date);
    if (thisDate < thatDate) {
      return -1;
    }
    return 1;
  });
};
