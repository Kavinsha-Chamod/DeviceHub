import { GET_LOCATION_LOADING,GET_LOCATION_SUCCESS, GET_LOCATION_ERROR,
ADD_LOCATION_LOADING,ADD_LOCATION_SUCCESS,ADD_LOCATION_ERROR  }    from "./locationType";

let initialState = {
  loading: false,
  data: [],
  error: false,
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
        error: false,
      };
    case GET_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
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
        error: false,
      };
    case ADD_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}