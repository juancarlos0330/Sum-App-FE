import { GET_ROMMDETAIL_DATA } from "../actions/constants";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROMMDETAIL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
