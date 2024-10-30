import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import loadingReducer from "./reducers/loadingReducer";
import errorReducer from "./reducers/errorReducer";
import projectReducer from "./reducers/projectReducer";
import projectdetailReducer from "./reducers/projectdetailReducer";
import roomdetailReducer from "./reducers/roomdetailReducer";
import userhistoryReducer from "./reducers/userhistoryReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  errors: errorReducer,
  project: projectReducer,
  projectdetail: projectdetailReducer,
  roomdetail: roomdetailReducer,
  userhistory: userhistoryReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
};

export default configureStore;
