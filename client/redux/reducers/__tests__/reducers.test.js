import rootReducer from "../index";
import initialState from "../../initialState";
import * as actions from "../../actions/actions";

let appState = initialState;
let payload;

describe("reducers", () => {
  test("@@INIT", () => {
    const state = rootReducer(undefined, {});
    expect(state).toEqual(appState);
  });
  test("TOGGLE_AUTHENTICATED", () => {
    payload = true;
    const state = rootReducer(appState, actions.toggleAuthenticated(payload));
    expect(state).toEqual({ ...appState, authenticated: payload });
  });
  test("UPDATE_ERROR_MESSAGE", () => {
    appState = { ...appState, authenticated: payload };
    payload = "No user with the given username";
    const state = rootReducer(appState, actions.updateErrorMessage(payload));
    expect(state).toEqual({
      ...appState,
      errorMessage: payload
    });
  });
  test("TOGGLE_FETCHING", () => {
    appState = { ...appState, errorMessage: payload };
    payload = true;
    const state = rootReducer(appState, actions.toggleFetching(payload));
    expect(state).toEqual({
      ...appState,
      fetching: payload
    });
  });
  test("POPULATE_LANG_DATA", () => {
    appState = { ...appState, fetching: payload };
    payload = [
      {
        _id: "English",
        value: 15
      },
      {
        _id: "Spanish",
        value: 27
      }
    ];
    const state = rootReducer(appState, actions.populateLangData(payload));
    expect(state).toEqual({
      ...appState,
      langData: payload
    });
  });
  test("POPULATE_OFFICE_DATA", () => {
    appState = {
      ...appState,
      langData: payload
    };
    payload = [
      {
        _id: {
          office: "WIC",
          date: "7/28/2017"
        },
        count: 1
      },
      {
        _id: {
          office: "SNAP",
          date: "7/29/2017"
        },
        count: 3
      }
    ];
    const state = rootReducer(appState, actions.populateOfficeData(payload));
    expect(state).toEqual({
      ...appState,
      officeData: payload
    });
  });
  test("POPULATE_NAV_DATA", () => {
    appState = {
      ...appState,
      officeData: payload
    };
    payload = [
      {
        _id: {
          office: "WIC",
          date: "7/28/2017"
        },
        count: 1
      },
      {
        _id: {
          office: "SNAP",
          date: "7/29/2017"
        },
        count: 3
      }
    ];

    const state = rootReducer(appState, actions.populateNavData(payload));
    expect(state).toEqual({
      ...appState,
      navData: payload
    });
  });
  test("POPULATE_ZIP_DATA", () => {
    appState = {
      ...appState,
      navData: payload
    };
    payload = [
      {
        _id: 95404,
        count: 2
      }
    ];
    const state = rootReducer(appState, actions.populateZipData(payload));
    expect(state).toEqual({
      ...appState,
      zipData: payload
    });
  });
});
