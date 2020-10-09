export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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

// Sign up
export const signup = (email, password) => {
	return async dispatch => {
		// any async code before dispatching
		const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSmR6DzYUNSsWlaaeyqyMTP2etMA01sOU", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true,
			})
		});

		if (!response.ok) {
			throw new Error("error actions.js signup");
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ type: SIGNUP });
	};
};

// Login
export const login = (email, password) => {
	return async dispatch => {
		// any async code before dispatching
		const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSmR6DzYUNSsWlaaeyqyMTP2etMA01sOU", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true,
			})
		});

		if (!response.ok) {
			throw new Error("error actions.js login");
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ type: LOGIN });
	};
};


// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
