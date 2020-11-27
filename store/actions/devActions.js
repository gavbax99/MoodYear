export const HANDLE_DATA_UPDATE = "HANDLE_DATA_UPDATE";
export const ADD_EMPTY_YEAR = "ADD_EMPTY_YEAR"; // no reducer import


// ==================== ACTIONS ====================
// Updating ENTIRE year for that user
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

// Add new empty year to emptyCalendar (MUST CHANGE FB RULES TO BE ABLE TO WRITE)
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