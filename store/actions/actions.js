export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const LOGOUT_DATA = "LOGOUT_DATA";

export const LOAD_DATA = "LOAD_DATA";
export const UPDATE_SINGLE_DAY = "UPDATE_SINGLE_DAY";
export const LOAD_SINGLE_DAY = "LOAD_SINGLE_DAY";
export const LOAD_ACTIVE_YEARS = "LOAD_ACTIVE_YEARS"; 
export const REMOVE_DATA = "REMOVE_DATA"; 

export const UPDATEDATA = "UPDATEDATA";
export const UPDATE_EMPTY_YEAR = "UPDATE_EMPTY_YEAR";

export const PUT_NEW_ACTIVE_YEAR = "PUT_NEW_ACTIVE_YEAR";
export const FIND_YEARS = "FIND_YEARS";


// ==================== UI ====================

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


// ==================== AUTH ====================

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
		// console.log("res in actions", resData)

		const date = new Date();
		const yearNumber = date.getFullYear();
		const monthNumber = date.getMonth();
		const dayNumber = date.getDate();
		const dayDate = ((monthNumber + 1) + '/' + dayNumber + '/' + yearNumber);

		const newUid = await fetch(`https://rn-health.firebaseio.com/userData/${resData.localId}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({accountInfo: {email: resData.email, registeredDate: dayDate}})
		});


		dispatch({ 
			type: SIGNUP,
			token: resData.idToken,
			userId: resData.localId,
			email: resData.email,
			registeredDate: dayDate
		});
	};
};

// Login
export const login = (email, password) => {
	return async dispatch => {
		// Login with email and password
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

		// Error handling
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

		// Grabs auth creds
		const resData = await response.json();
		// console.log(resData);

		// Grabs account info 
		const accountInfo = await fetch(`https://rn-health.firebaseio.com/userData/${resData.localId}/accountInfo.json`);
		const resAccountInfo = await accountInfo.json();

		dispatch({ 
			type: LOGIN,
			token: resData.idToken,
			userId: resData.localId,
			email:  resAccountInfo.email,
			registeredDate: resAccountInfo.registeredDate
		});
	};
};

// Logout AUTH
export const logoutAuth = () => {
	return {
		type: LOGOUT_AUTH,
	};
};

// Logout DATA
export const logoutData = () => {
	return {
		type: LOGOUT_DATA,
	};
};

// DELETE ACCOUNT
export const deleteAccount = (uid) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}.json`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		});

		const resData = await response.json(); 

		console.log("delete data: ", resData)

		dispatch({
			type: DELETE_ACCOUNT,
		});
	};
};

// ==================== LOADING/UPDATING/DELETING DATA ====================

// Remove data (primarily for loading ui)
export const removeData = () => {
	return {
		type: REMOVE_DATA,
		data: {}
	};
};

// Loading a yea'rs data (fetched from firebase) for login and changing year
export const loadData = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);

		const resData = await response.json(); 

		// console.log("loaddata in action: ", resData)

		dispatch({
			type: LOAD_DATA,
			data: resData
		});
	};
};

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

		const loadNewDataResponse = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);
		const newDataResData = await loadNewDataResponse.json(); 

		dispatch({
			type: UPDATE_SINGLE_DAY,
			data: newDataResData
		});
	};
};


// Updating ENTIRE data (put to firebase) ***FOR DEV USE ONLY***
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

		dispatch({
			type: UPDATEDATA,
			data: resData
		});
	};
};


// ==================== YEARS =========================

// Loading data (fetched from firebase)
export const loadActiveYears = (uid) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears.json`);
		const resData = await response.json(); 

		dispatch({
			type: LOAD_ACTIVE_YEARS,
			years: resData,
			yearsLoaded: true,
		});
	};
};


// export const loadActiveYears = (uid) => {
// 	return async dispatch => {
// 		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears.json`);
// 		const resData = await response.json(); 

// 		// if no data for active years, create the current active year
// 		// PROBLEM: assigns active year but not empty calendar data so logic breaks down in HomeScreenCalendar
// 		let jsonHold;
// 		if (resData === null) {
// 			const date = new Date().getFullYear();
// 			const putNewDate = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears/${date}.json`, {
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify(date)
// 			});
// 			jsonHold = await putNewDate.json(); 
// 		}

// 		// let loaded = false;
// 		// if (jsonHold !== null || resData !== null) loaded = true;

// 		dispatch({
// 			type: LOAD_ACTIVE_YEARS,
// 			years: resData === null ? {[jsonHold]: jsonHold} : resData,
// 			// yearsLoaded: loaded,
// 			yearsLoaded: true,
// 		});
// 	};
// };

// Put new year into /activeyears
// loadYearsArray
export const putNewActiveYear = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(year)
		});

		dispatch({
			type: PUT_NEW_ACTIVE_YEAR,
		});
	};
};

// Updating ENTIRE year from empty calendar (put to firebase)
export const updateEmptyYear = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/emptyCalendar/${year}.json`);
		const resData = await response.json(); 

		const loadNewYear = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(resData)
		});
		const resLoadNewYearData = await loadNewYear.json(); 

		dispatch({
			type: UPDATE_EMPTY_YEAR,
			data: resLoadNewYearData
		});
	};
};



// Loading single day (fetched from firebase) maybe works someday
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



// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
