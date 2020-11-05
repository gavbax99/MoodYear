import { 
	LOADDATA,
	CREATE_NEW_ACCOUNT_DATA,
 } from "../actions/actions";

const initialState = {
	data: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOADDATA:
			// If no data
			// if (Object.keys(initialState.data).length) {

			// }
			return { 
				...state, 
				data: action.data 
			};

		case CREATE_NEW_ACCOUNT_DATA:
			return { 
				...state, 
				data: action.data 
			};
	};
	return state;
};

// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.navReducer.headerHeightState);