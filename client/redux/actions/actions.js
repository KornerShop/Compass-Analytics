import {
  TOGGLE_AUTHENTICATED,
  TOGGLE_FETCHING,
  UPDATE_ERROR_MESSAGE,
  POPULATE_LANG_DATA,
  POPULATE_OFFICE_DATA,
  POPULATE_NAV_DATA,
  POPULATE_ZIP_DATA,
} from './types';

export const toggleAuthenticated = bool => ({
  type: TOGGLE_AUTHENTICATED,
  payload: bool,
});

export const toggleFetching = bool => ({
  type: TOGGLE_FETCHING,
  payload: bool,
});

export const updateErrorMessage = errorMessage => ({
  type: UPDATE_ERROR_MESSAGE,
  payload: errorMessage,
});

export const populateLangData = langData => ({
  type: POPULATE_LANG_DATA,
  payload: langData,
});

export const populateOfficeData = officeData => ({
  type: POPULATE_OFFICE_DATA,
  payload: officeData,
});

export const populateNavData = navData => ({
  type: POPULATE_NAV_DATA,
  payload: navData,
});

export const populateZipData = zipData => ({
  type: POPULATE_ZIP_DATA,
  payload: zipData,
});
