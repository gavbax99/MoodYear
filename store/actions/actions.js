export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOAD_DATA = "LOAD_DATA";
export const UPDATE_SINGLE_DAY = "UPDATE_SINGLE_DAY";
export const LOAD_SINGLE_DAY = "LOAD_SINGLE_DAY";
export const LOAD_ACTIVE_YEARS = "LOAD_ACTIVE_YEARS";

export const UPDATEDATA = "UPDATEDATA";

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
			userId: resData.localId,
		});
	};
};

// Loading data (fetched from firebase)
export const loadData = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);

		const resData = await response.json(); 

		dispatch({
			type: LOAD_DATA,
			data: resData
		});
	};
};

// Loading data (fetched from firebase)
export const loadActiveYears = (uid) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}.json`);

		const resData = await response.json(); 

		// console.log(typeof resData);
		// console.log(Object.keys(resData))

		dispatch({
			type: LOAD_ACTIVE_YEARS,
			years: Object.keys(resData)
		});
	};
};

// Loading single day (fetched from firebase)
// export const loadSingleDay = (uid, year, monthNo, dayNo) => {
// 	return async dispatch => {
// 		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}/months/${monthNo}/days/${dayNo}.json`);

// 		const resData = await response.json(); 

// 		console.log(resData);

// 		dispatch({
// 			type: LOAD_SINGLE_DAY,
// 			// data: resData
// 			data:
// 		});
// 	};
// };

// Updating single day (put to firebase) WORKS
export const updateSingleDay = (uid, year, monthNo, dayNo, dayData) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}/months/${monthNo}/days/${dayNo}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dayData)
		});
		// const resData = await response.json(); 
		// console.log("actions.updateSingleDay resdata: ", resData);

		const loadNewDataResponse = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);
		const newDataResData = await loadNewDataResponse.json(); 
		// console.log("new res data: ", newDataResData.months[10].days[11]);

		dispatch({
			type: UPDATE_SINGLE_DAY,
			data: newDataResData
		});
	};
};









// Updating data (put to firebase)
export const updateData = (uid, year, data) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const resData = await response.json(); 
		console.log("actions.updateData resdata: ", resData);

		dispatch({
			type: UPDATEDATA,
			data: resData
		});
	};
};


// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
