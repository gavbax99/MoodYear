export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";


// ==================== ACTIONS ====================
// Keyboard open bool
export const setKeyboardOpen = (openBool) => {
	return {
		type: SET_KEYBOARD_OPEN,
		openBool: openBool
	};
};

// Header height int
export const setHeaderHeight = (heightInt) => {
	return {
		type: SET_HEADER_HEIGHT,
		heightInt: heightInt
	};
};