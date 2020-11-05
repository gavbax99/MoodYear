import { 
	SET_KEYBOARD_OPEN,
} from "../actions/actions";

const initialState = {
	keyboardReducerState: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_KEYBOARD_OPEN:
			return { ...state, keyboardReducerState: action.openBool };

		default:
			return state;
	}
	return state;
};

// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.keyboardReducer.keyboardReducerState);