// Functions:
// loadData
// updateSingleDay
// removeData
// logoutData
// loadActiveYears
// putNewActiveYear
// updateEmptyYear

// Main data
export const HANDLE_DATA_UPDATE = "HANDLE_DATA_UPDATE";
export const LOGOUT_DATA = "LOGOUT_DATA";

// Years
export const LOAD_ACTIVE_YEARS = "LOAD_ACTIVE_YEARS"; 
export const PUT_NEW_ACTIVE_YEAR = "PUT_NEW_ACTIVE_YEAR"; // no reducer import


// ==================== ACTIONS ====================
// Main way to load year data (on load, year change, update day)
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

// Updating single day
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

// Logout of data (resets data to initialstate)
export const logoutData = () => {
	return {
		type: LOGOUT_DATA,
	};
};

// Loading YEARS data
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

// Put new year into /activeyears if that year doesn't exist (chains into updateEmptyYear)
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

// Updating ENTIRE year from empty calendar if that year doesn't exist
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