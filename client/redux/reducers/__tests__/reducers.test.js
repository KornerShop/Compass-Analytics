import rootReducer from "../index";
import initialState from "../../initialState";
import * as actions from "../../actions/actions";

let appState = initialState;

describe("reducers", () => {
  test("@@INIT", () => {
    const state = rootReducer(undefined, {});
    expect(state).toEqual(appState);
  });
  test("TOGGLE_AUTHENTICATED", () => {
    const state = rootReducer(appState, actions.toggleAuthenticated(true));
    expect(state).toEqual({ ...appState, authenticated: true });
  });
  test("UPDATE_ERROR_MESSAGE", () => {
    appState = { ...appState, authenticated: true };
    const state = rootReducer(
      appState,
      actions.updateErrorMessage("No user with the given username")
    );
    expect(state).toEqual({
      ...appState,
      errorMessage: "No user with the given username"
    });
  });
  test("TOGGLE_FETCHING", () => {
    appState = { ...appState, errorMessage: "No user with the given username" };
    const state = rootReducer(appState, actions.toggleFetching(true));
    expect(state).toEqual({
      ...appState,
      fetching: true
    });
  });
  test("POPULATE_LANG_DATA", () => {
    appState = { ...appState, fetching: true };
    const state = rootReducer(
      appState,
      actions.populateLangData([
        {
          _id: "English",
          value: 15
        },
        {
          _id: "Spanish",
          value: 27
        }
      ])
    );
    expect(state).toEqual({
      ...appState,
      langData: [
        {
          _id: "English",
          value: 15
        },
        {
          _id: "Spanish",
          value: 27
        }
      ]
    });
  });
  test("POPULATE_OFFICE_DATA", () => {
    appState = {
      ...appState,
      langData: [
        {
          _id: "English",
          value: 15
        },
        {
          _id: "Spanish",
          value: 27
        }
      ]
    };
    const state = rootReducer(
      appState,
      actions.populateOfficeData([
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
      ])
    );
    expect(state).toEqual({
      ...appState,
      officeData: [
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
      ]
    });
  });
  test("POPULATE_NAV_DATA", () => {
    appState = {
      ...appState,
      officeData: [
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
      ]
    };
    const state = rootReducer(
      appState,
      actions.populateNavData([
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
      ])
    );
    expect(state).toEqual({
      ...appState,
      navData: [
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
      ]
    });
  });
  test("POPULATE_ZIP_DATA", () => {
    appState = {
      ...appState,
      navData: [
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
      ]
    };
    const state = rootReducer(
      appState,
      actions.populateZipData([
        {
          _id: 95404,
          count: 2
        }
      ])
    );
    expect(state).toEqual({
      ...appState,
      zipData: [
        {
          _id: 95404,
          count: 2
        }
      ]
    });
  });
});
