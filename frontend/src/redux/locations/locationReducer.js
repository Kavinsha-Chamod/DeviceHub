import { GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  ADD_LOCATION_LOADING,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  UPDATE_LOCATION_LOADING,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR,
  DELETE_LOCATION_LOADING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR  }    from "./locationType";

let initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function locationReducer (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case GET_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}