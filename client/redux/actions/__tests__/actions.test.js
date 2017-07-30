import * as actions from '../actions';

describe('actions', () => {
  test('toggleAuthenticated', () => {
    expect(actions.toggleAuthenticated(true)).toMatchSnapshot();
  });
  test('toggleFetching', () => {
    expect(actions.toggleFetching(true)).toMatchSnapshot();
  });
  test('updateErrorMessage', () => {
    expect(actions.updateErrorMessage('No user with the given username')).toMatchSnapshot();
  });
  test('populateLangData', () => {
    expect(actions.populateLangData([
      {
        _id: "English",
        value: 15
      },
      {
        _id: "Spanish",
        value: 27
      }
    ]
  )).toMatchSnapshot();
  });
  test('populateOfficeData', () => {
    expect(actions.populateOfficeData([{
      _id: {
        office: 'SNAP',
        date: '7/29/2017',
      },
      count: 3,
    }])).toMatchSnapshot();
  });
  test('populateNavData', () => {
    expect(actions.populateNavData([
      {
        _id: {
          office: 'SNAP',
          date: '7/29/2017',
        },
        count: 3,
      }
    ])).toMatchSnapshot();
  });
  test('populateZipData', () => {
    expect(actions.populateZipData([
      {
        _id: 95404,
        count: 2
      }
    ])).toMatchSnapshot();
  });
});
