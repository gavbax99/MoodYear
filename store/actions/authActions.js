// Functions:
// authenticate
// loginFromLocalStorage
// logoutAuth
// login
// signup
// deleteAccount

import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../../config";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"; // no reducer import


// ==================== TIMER ====================
let timer;

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (expirationTime) => {
	return dispatch => {
		timer = setTimeout(() => {
			dispatch(logoutAuth());
		}, expirationTime);
	};
};

// Saving data locally
const saveDataToStorage = (token, userId, expirationDate) => {
	AsyncStorage.setItem("@authData", JSON.stringify({
		token: token,
		userId: userId,
		expirationDate: expirationDate.toISOString()
	}));
};


// ==================== ACTIONS ====================
// Authenticate user and set token expiraton time
export const authenticate = (token, userId, email, registeredDate, expirationTime) => {
	return dispatch => {
		dispatch(setLogoutTimer(expirationTime));
		dispatch({ 
			type: AUTHENTICATE,
			token: token,
			userId: userId,
			email: email,
			registeredDate: registeredDate
		});
	};
};

// Logout (reset auth, clear token timer) and remove local storage 
export const logoutAuth = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem("@authData");
	return {
		type: LOGOUT_AUTH,
	};
};

// Login from local storage
export const loginFromLocalStorage = (token, userId, expirationTime) => {
	return async dispatch => {	
		// Grabs account info 
		const accountInfo = await fetch(`https://moodyear-e7dee.firebaseio.com/userData/${userId}/accountInfo.json?auth=${token}`);
		const resAccountInfo = await accountInfo.json();

		dispatch(authenticate( 
			token,
			userId,
			resAccountInfo.email,
			resAccountInfo.registeredDate,
			expirationTime
		));
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

		dispatch(authenticate( 
			resData.idToken,
			resData.localId,
			resAccountInfo.email,
			resAccountInfo.registeredDate,
			parseInt(resData.expiresIn) * 1000
		));

		// Save data to local storage
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

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

		dispatch(authenticate( 
			resData.idToken,
			resData.localId,
			resData.email,
			dayDate,
			parseInt(resData.expiresIn) * 1000
		));

		// Save data to local storage
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

// Delete account (remove data info from db)
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
		const deleteAccountAction = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${config.API_KEY}`, {
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