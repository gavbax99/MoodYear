import { 
	LOAD_DATA,
	UPDATE_SINGLE_DAY,
	UPDATEDATA,
	LOAD_ACTIVE_YEARS
 } from "../actions/actions";

const initialState = {
	data: {},
	years: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DATA:
			return { 
				...state, 
				data: action.data 
			};

		case UPDATE_SINGLE_DAY:
			return { 
				...state, 
				data: action.data
			};

		case UPDATEDATA:
			return { 
				...state, 
				data: action.data
			};

		case LOAD_ACTIVE_YEARS:
			return { 
				...state, 
				years: action.years
			};

	};
	return state;
};

// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.navReducer.headerHeightState);