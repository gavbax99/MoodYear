import { combineReducers } from "redux";
import keyboardReducer from "./keyboardReducer";
import navReducer from "./navReducer";
import dataReducer from "./dataReducer";
import authReducer from "./authReducer";

export default combineReducers({
	keyboardReducer: keyboardReducer,
	navReducer: navReducer,
	dataReducer: dataReducer,
	authReducer: authReducer,
});