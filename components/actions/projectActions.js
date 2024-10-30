import {
  GET_PROJECT_DATA,
  LOADING_DATA,
  GET_PROJECTDETAIL_DATA,
  GET_ROMMDETAIL_DATA,
  GET_HISTORY_DATA,
} from "./constants";
import config from "../config/config";
import axios from "axios";

// get projects data
export const getData = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/all", paramData)
    .then((res) => {
      dispatch({
        type: GET_PROJECT_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// get projects by admin
export const getAdminData = () => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios.get(config.server + "/api/projects/adminall").then((res) => {
    dispatch({
      type: GET_PROJECT_DATA,
      payload: res.data,
    });
    dispatch(setLoadingdata(false));
  });
};

export const getDetailData = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/detail", paramData)
    .then((res) => {
      dispatch({
        type: GET_PROJECTDETAIL_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

export const getRoomdetaildata = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/roomdetail", paramData)
    .then((res) => {
      dispatch({
        type: GET_ROMMDETAIL_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// Add projects data
export const addData = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/savedata", paramData)
    .then((res) => {
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

export const gethistoryData = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/gethistory", paramData)
    .then((res) => {
      dispatch({
        type: GET_HISTORY_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    });
};

export const addcodehistory = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/savehistory", paramData)
    .then((res) => {
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// Add project with code
export const addcodeData = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(config.server + "/api/projects/savecodedata", paramData)
    .then(() => {
      dispatch(setLoadingdata(false));
    });
};

export const setLoadingdata = (flag) => {
  return {
    type: LOADING_DATA,
    payload: flag,
  };
};
