import { LOADING_DATA } from "../actions/constants";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
