import {
  GET_DEVICE_LOADING,
  GET_DEVICE_SUCCESS,
  GET_DEVICE_ERROR,
  ADD_DEVICE_LOADING,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_ERROR,
  DELETE_DEVICE_LOADING,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_ERROR,
} from "./deviceType";

let initialState = {
  loading: false,
  data: [],
  imageDataUrl:null,
  error: false,
};

export const deviceReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_DEVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        imageDataUrl: payload.imageUrl,
        error: false,
      };
    case GET_DEVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ADD_DEVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ADD_DEVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DELETE_DEVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false ,
      };
    case DELETE_DEVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}