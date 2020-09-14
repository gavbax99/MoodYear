export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";

export const setKeyboardOpen = (openBool) => {
	return {
		type: SET_KEYBOARD_OPEN,
		openBool: openBool
	}
}