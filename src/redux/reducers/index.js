import { combineReducers } from "redux";
import mapPositionRequest from "./mapPositionRequest";
import sensorDetail from "./sensorDetail";

export default combineReducers({ mapPositionRequest, sensorDetail });
