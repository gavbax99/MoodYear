export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const TEST = "TEST";

// Keyboard open bool
export const setKeyboardOpen = (openBool) => {
	return {
		type: SET_KEYBOARD_OPEN,
		openBool: openBool
	}
}

// Header height int
export const setHeaderHeight = (heightInt) => {
	return {
		type: SET_HEADER_HEIGHT,
		heightInt: heightInt
	}
}

// @@@@@@@@@@@@@ TEST
export const test = (test) => {
	return {
		type: TEST,
		test: test
	}
}

// import { useDispatch } from "react-redux";
// import { setKeyboardOpen } from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
