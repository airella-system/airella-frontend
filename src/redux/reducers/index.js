import { combineReducers } from "redux";
import mapPositionRequest from "./mapPositionRequest";
import sensorDetail from "./sensorDetail";
import loginDialog from "./loginDialog";
import authorization from "./authorization";

export default combineReducers({ mapPositionRequest, sensorDetail, loginDialog, authorization });
