module.exports = () => navData => {
  const formattedData = [];
  navData.forEach(obj => {
    if (
      !formattedData.find(
        (element, idx) => element.date === obj._id.date,
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
            element => element.date === obj._id.date,
          )
        ];
      objToEdit[obj._id.office === 'SNAP' ? 'SNAP' : 'WIC'] =
        obj.count;
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
