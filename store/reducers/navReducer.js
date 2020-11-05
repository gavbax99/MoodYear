import { SET_HEADER_HEIGHT } from "../actions/actions";

const initialState = {
	headerHeightState: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_HEADER_HEIGHT:
			return { ...state, headerHeightState: action.heightInt };

		default:
			return state;
	}
	return state;
};

// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.navReducer.headerHeightState);