import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import locationReducer from "./locations/locationReducer";
import {deviceReducer} from "./devices/deviceReducer";

let rootReducer = combineReducers({
  locationReducer: locationReducer,
  deviceReducer: deviceReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));