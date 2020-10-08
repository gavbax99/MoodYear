import { TEST } from "../actions/actions";

const initialState = {
	test: "hi",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TEST:
			return { ...state, test: action.test };

		default:
			return state;
	}
	return state;
};


// import { useSelector } from "react-redux";
// const headerHeightState = useSelector(state => state.navReducer.headerHeightState);