import { 
	AUTHENTICATE,
	LOGOUT_AUTH
} from "../actions/authActions";

const initialState = {
	token: null,
	userId: null,
	email: null,
	registeredDate: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				userId: action.userId,
				email: action.email,
				registeredDate: action.registeredDate
			}

		case LOGOUT_AUTH:
			return initialState;
			
		default: return state;
	}
};