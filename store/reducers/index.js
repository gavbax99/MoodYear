import { combineReducers } from "redux";
import keyboardReducer from "./keyboardReducer";
import navReducer from "./navReducer";

export default combineReducers({
	keyboardReducer: keyboardReducer,
	navReducer: navReducer,
	//keyboardOpen
});