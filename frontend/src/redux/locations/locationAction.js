import axios from "axios";
import {
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  ADD_LOCATION_LOADING,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  DELETE_LOCATION_LOADING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR,
} from "./locationType";
import { BASE_URL } from "../config";

export const fetchLocations = () => async (dispatch) => {
  dispatch({ type: GET_LOCATION_LOADING });
  try {
    const res = await axios("http://localhost:4000/locations",{
      method: "GET",
    });
    console.log(res.data);
    const { status, message, data } = res.data;
    if (status === 1) {
      dispatch({ type: GET_LOCATION_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_LOCATION_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    dispatch({ type: GET_LOCATION_ERROR });
  }
}

export const addLocation = (obj) => async (dispatch) => {
  dispatch({ type: ADD_LOCATION_LOADING });
  try {
    const res = await axios(BASE_URL + "/locations/add", {
      method: "POST",
      data: obj,
    });
    const { status, message } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: ADD_LOCATION_SUCCESS });
      dispatch(fetchLocations());
      window.location.href="/";
    } else {
      dispatch({ type: ADD_LOCATION_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    dispatch({ type: ADD_LOCATION_ERROR });
  }
}

export const deleteLocation = (locationId) => async (dispatch) => {
  dispatch({ type: DELETE_LOCATION_LOADING });
  try {
    const res = await axios.delete(BASE_URL + "/locations/" + locationId);
    const { status, message } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: DELETE_LOCATION_SUCCESS });
      dispatch(fetchLocations());
      window.location.href = "/";
    } else {
      dispatch({ type: DELETE_LOCATION_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    dispatch({ type: DELETE_LOCATION_ERROR });
  }
}