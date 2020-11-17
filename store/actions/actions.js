export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOAD_DATA = "LOAD_DATA";
export const UPDATE_SINGLE_DAY = "UPDATE_SINGLE_DAY";
export const LOAD_SINGLE_DAY = "LOAD_SINGLE_DAY";
export const LOAD_ACTIVE_YEARS = "LOAD_ACTIVE_YEARS"; 
export const REMOVE_DATA = "REMOVE_DATA"; 

export const UPDATEDATA = "UPDATEDATA";
export const UPDATE_EMPTY_YEAR = "UPDATE_EMPTY_YEAR";

export const LOAD_YEARS_ARRAY = "LOAD_YEARS_ARRAY";
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
		// const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears/20202020.json`);
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears.json`);

		const resData = await response.json(); 

		// console.log("activeyears data", resData);
		// console.log("is null?", Object.keys(resData).length > 0);

		dispatch({
			type: LOAD_ACTIVE_YEARS,
			years: resData,
			yearsLoaded: Object.keys(resData).length > 0 ? true : false,
		});
	};
};

// Updating single day (put to firebase) WORKS
export const loadYearsArray = (uid, year) => {
	return async dispatch => {
		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(year)
		});

		dispatch({
			type: LOAD_YEARS_ARRAY,
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

		// const loadNewYearResponse = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${year}.json`);
		// const newDataResData = await loadNewDataResponse.json(); 
		// console.log("new res data: ", newDataResData.months[10].days[11]);

		dispatch({
			type: UPDATE_EMPTY_YEAR,
			data: resLoadNewYearData
		});
	};
};








// ???
// export const findYears = (uid) => {
// 	return async dispatch => {
// 		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/activeYears.json`);

// 		const resData = await response.json(); 
// 		// console.log("DATA: ", typeof resData, resData);

// 		dispatch({
// 			type: FIND_YEARS,
// 		});
// 	};
// };




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


// import { useDispatch } from "react-redux";
//import * as Actions from "../store/actions/actions";
// const dispatch = useDispatch();
// dispatch(setKeyboardOpen(true));
