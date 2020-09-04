import { combineReducers } from "redux";
import mapPositionRequest from "./mapPositionRequest";
import sensorDetail from "./sensorDetail";
import loginDialog from "./loginDialog";

export default combineReducers({ mapPositionRequest, sensorDetail, loginDialog });
