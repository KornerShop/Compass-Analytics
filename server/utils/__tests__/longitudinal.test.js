const formatLongitudinalData = require('../longitudinal');

const mockData = [
  {
    _id: {
      office: 'WIC',
      date: '7/28/2017',
    },
    count: 1,
  },
  {
    _id: {
      office: 'SNAP',
      date: '7/29/2017',
    },
    count: 3,
  },
  {
    _id: {
      office: 'SNAP',
      date: '7/26/2017',
    },
    count: 2,
  },
  {
    _id: {
      office: 'WIC',
      date: '7/26/2017',
    },
    count: 1,
  },
];

describe('formatLongitudinalData', () => {
  it('formats longitudinal data appropriately', () => {
    const formattedData = formatLongitudinalData(mockData);
    expect(formattedData.length).toBeGreaterThan(1);
    formattedData.forEach(obj => {
      expect(obj).toHaveProperty('date');
      expect(obj).toHaveProperty('WIC');
      expect(obj).toHaveProperty('SNAP');
    })
  });
});
