export default {
  auth: {
    authenticated: localStorage.getItem('token'),
    fetching: true,
    errorMessage: '',
  },
  charts: {
    langData: null,
    officeData: null,
    navData: null,
    zipData: null,
  }
};
