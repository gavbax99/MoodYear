import { 
	HANDLE_DATA_UPDATE,
	LOAD_ACTIVE_YEARS,
	LOGOUT_DATA
 } from "../actions/dataActions";

const initialState = {
	data: {},
	years: null,
	yearsLoaded: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_DATA_UPDATE:
			return { 
				...state, 
				data: action.data 
			};

		case LOAD_ACTIVE_YEARS:
			return { 
				...state, 
				years: action.years,
				yearsLoaded: action.yearsLoaded
			};

		case LOGOUT_DATA:
			return initialState;

		default: return state;
	}
};