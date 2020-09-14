import { SET_KEYBOARD_OPEN } from "../actions/actions";

const initialState = {
	keyboardOpenState: false,
}

const keyboardOpen = (state = initialState, action) => {
	switch (action.type) {
		case SET_KEYBOARD_OPEN:
			return { ...state, keyboardOpenState: action.openBool };

		default:
			return state;
	}
	return state;
}

export default keyboardOpen;