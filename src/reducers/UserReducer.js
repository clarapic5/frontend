import { ActionTypes } from 'const';

const initialState = {
  name: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      return Object.assign({}, state, {
        // If the name is not specified, do not change it
        // The places that will change the name is login
        name: typeof action.name === "undefined" ? state.name : action.name,
      });
    }
    default:
      return state;
  }
}
