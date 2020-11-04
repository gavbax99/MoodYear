export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOADDATA = "LOADDATA";
export const CREATE_NEW_ACCOUNT_DATA = "CREATE_NEW_ACCOUNT_DATA";

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
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong. Please try again.";
			switch (errorId) {
				case "EMAIL_EXISTS": 
					message = "This email already has an account.";
					break;
				// case "INVALID_PASSWORD":
				// 	message = "Invalid password.";
				// 	break;
				default: break;
			}
			throw new Error(message);
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ 
			type: SIGNUP,
			token: resData.idToken,
			userId: resData.loaclId,
		});
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
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = "Something went wrong. Please try again.";
			switch (errorId) {
				case "EMAIL_NOT_FOUND": 
					message = "This email cannot be found.";
					break;
				case "INVALID_PASSWORD":
					message = "Invalid password.";
					break;
				default: break;
			}
			throw new Error(message);
		};

		const resData = await response.json();

		console.log(resData);

		dispatch({ 
			type: LOGIN,
			token: resData.idToken,
			userId: resData.loaclId,
		});
	};
};

// Loading data (fetched from firebase)
export const loadData = (userId) => {

	// ====================================
	// ====================================
	// ====================================
	// ====================================
	// ====================================
	// when login, first we load data from firebase, THEN goes to home
	// when reg, we create and post a new user to firebse, then loads the info, THEN goes to home
	// ====================================
	// ====================================
	// ====================================
	// ====================================
	// ====================================


	// return async dispatch => {
	// 	const response = await fetch(`https://rn-health.firebaseio.com/users/${userId}.json`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify({
	// 			userId: userId,
	// 			data: emptyObj,
	// 		})
	// 	});

	// 	const resData = await response.json(); 

	// 	console.log(resData);

	// 	dispatch({
	// 		type: LOADDATA,
	// 		data: resData
	// 	});
	// ;}
}

// Reducing new data
// export const createNewAccountData = (userId, emptyObj) => {
// 	return async dispatch => {
// 		const response = await fetch(`https://rn-health.firebaseio.com/users/${userId}.json`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify({
// 				userId: userId,
// 				data: emptyObj,
// 			})
// 		});

// 		const resData = await response.json(); 

// 		console.log(resData);

// 		dispatch({
// 			type: CREATE_NEW_ACCOUNT_DATA,
// 			data: resData
// 		});
// 	}
	
// 	// {
// 	// 	type: CREATE_NEW_ACCOUNT_DATA,
// 	// 	data: accountObj
// 	// }
// }


// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
