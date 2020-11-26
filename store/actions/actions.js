import config from "../../config";

// #################### UI ####################
export const SET_KEYBOARD_OPEN = "SET_KEYBOARD_OPEN";
export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";

// #################### AUTH ####################
export const HANDLE_AUTH_DATA = "HANDLE_AUTH_DATA"; 
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"; // no reducer import

// #################### DATA ####################
export const HANDLE_DATA_UPDATE = "HANDLE_DATA_UPDATE";
export const LOGOUT_DATA = "LOGOUT_DATA";
export const LOAD_ACTIVE_YEARS = "LOAD_ACTIVE_YEARS"; 

// #################### YEARS ####################
export const PUT_NEW_ACTIVE_YEAR = "PUT_NEW_ACTIVE_YEAR"; // no reducer import

// #################### DEV ####################
export const ADD_EMPTY_YEAR = "ADD_EMPTY_YEAR"; // no reducer import


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
		const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`, {
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

				default: break;
			}
			throw new Error(message);
		};

		// 
		const resData = await response.json();

		// Date for registration
		const date = new Date();
		const fullTime = date.getTime();
		const yearNumber = date.getFullYear();
		const monthNumber = date.getMonth();
		const dayNumber = date.getDate();
		const dayDate = ((monthNumber + 1) + '/' + dayNumber + '/' + yearNumber);

		const newUid = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${resData.localId}.json?auth=${resData.idToken}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({accountInfo: { email: resData.email, registeredDate: dayDate, registeredTime: fullTime }})
		});

		const resNewUidData = await newUid.json();
		console.log("res in actions", resNewUidData);

		dispatch({ 
			type: HANDLE_AUTH_DATA,
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
		const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`, {
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

		// Grabs account info 
		const accountInfo = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${resData.localId}/accountInfo.json?auth=${resData.idToken}`);
		const resAccountInfo = await accountInfo.json();

		dispatch({ 
			type: HANDLE_AUTH_DATA,
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

// DELETE ACCOUNT
export const deleteAccount = (uid, token) => {
	return async dispatch => {
		// Deletes user data
		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}.json?auth=${token}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		});

		// Deletes associated account
		const deleteAccount = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${config.API_KEY}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({idToken: token})
		});

		dispatch({
			type: DELETE_ACCOUNT,
		});
	};
};

// ==================== DATA ====================
// Loading a yea'rs data (fetched from firebase) for login and changing year
export const loadData = (uid, year) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/${year}.json?auth=${token}`);
		const resData = await response.json(); 

		dispatch({
			type: HANDLE_DATA_UPDATE,
			data: resData
		});
	};
};

// Updating single day (put to firebase)
export const updateSingleDay = (uid, year, monthNo, dayNo, dayData) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/${year}/months/${monthNo}/days/${dayNo}.json?auth=${token}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dayData)
		});

		const loadNewDataResponse = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/${year}.json?auth=${token}`);
		const newDataResData = await loadNewDataResponse.json(); 

		dispatch({
			type: HANDLE_DATA_UPDATE,
			data: newDataResData
		});
	};
};

// Remove data (primarily for loading ui after changing years)
export const removeData = () => {
	return {
		type: HANDLE_DATA_UPDATE,
		data: {}
	};
};

// Logout DATA
export const logoutData = () => {
	return {
		type: LOGOUT_DATA,
	};
};

// ==================== YEARS =========================
// Loading data (fetched from firebase)
export const loadActiveYears = (uid) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/activeYears.json?auth=${token}`);
		const resData = await response.json(); 

		dispatch({
			type: LOAD_ACTIVE_YEARS,
			years: resData,
			yearsLoaded: true,
		});
	};
};

// Put new year into /activeyears
export const putNewActiveYear = (uid, year) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/activeYears/${year}.json?auth=${token}`, {
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
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/emptyCalendar/${year}.json`);
		const resData = await response.json(); 

		const loadNewYear = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/${year}.json?auth=${token}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(resData)
		});
		const resLoadNewYearData = await loadNewYear.json(); 

		dispatch({
			type: HANDLE_DATA_UPDATE,
			data: resLoadNewYearData
		});
	};
};


// ============================= DEV =================================
// Updating ENTIRE data (put to firebase) ***FOR DEV USE ONLY***
export const updateData = (uid, year, data) => {
	return async (dispatch, getState) => {
		const token = getState().authReducer.token;

		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${uid}/${year}.json?auth=${token}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const resData = await response.json(); 

		dispatch({
			type: HANDLE_DATA_UPDATE,
			data: resData
		});
	};
};

// Add new empty year to emptyCalendar  ***FOR DEV USE ONLY***
export const addEmptyYear = (year, data) => {
	return async dispatch => {
		const response = await fetch(`https://moodyear-e7dee.firebaseio.com/emptyCalendar/${year}.json`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		dispatch({
			type: ADD_EMPTY_YEAR,
		});
	};
};