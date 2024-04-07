import axios from "axios";
import { BASE_URL } from "../config";
import {
  GET_DEVICE_LOADING,
  GET_DEVICE_SUCCESS,
  GET_DEVICE_ERROR,
  ADD_DEVICE_LOADING,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_ERROR,
  DELETE_DEVICE_LOADING,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_ERROR
} from "./deviceType";

export const getDevices = () => async (dispatch) => {
  dispatch({ type: GET_DEVICE_LOADING });
  try {
    const res = await axios(BASE_URL + "/devices", {
      method: "GET",
    });
    const { status, message, data } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: GET_DEVICE_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_DEVICE_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    dispatch({ type: GET_DEVICE_ERROR });
  }
};

export const addDevice = (formData) => async (dispatch) => {
  dispatch({ type: ADD_DEVICE_LOADING });
  try {
    console.log("Form Data", formData);
    const res = await axios.post(BASE_URL + "/devices/add", formData);
    const { status, message } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: ADD_DEVICE_SUCCESS });
      dispatch(getDevices());
      window.location.href = "/";
    } else {
      dispatch({ type: ADD_DEVICE_ERROR });
      console.log(message.error);
      window.location.reload();
    }
  } catch (error) {
    console.error("Error adding device:", error);
    dispatch({ type: ADD_DEVICE_ERROR });
  }
};

export const deleteDevice = (serialNumber) => async (dispatch) => {
  dispatch({ type: DELETE_DEVICE_LOADING });
  try {
    const res = await axios.delete(BASE_URL + "/devices/" + serialNumber);
    const { status, message } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: DELETE_DEVICE_SUCCESS });
      dispatch(getDevices());
      window.location.href = "/";
    } else {
      dispatch({ type: DELETE_DEVICE_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_DEVICE_ERROR });
  }
};
