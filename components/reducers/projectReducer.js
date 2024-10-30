import { GET_PROJECT_DATA } from "../actions/constants";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
