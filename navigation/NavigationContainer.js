// React
import React, { useEffect, useRef } from 'react';
import { NavigationActions } from "react-navigation";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components
import AppNavigator from "./AppNavigator";


// ==================== Component
const NavigationContainer = props => {

	const dispatch = useDispatch();
	const navRef = useRef();
	const isAuth = useSelector(state => !!state.authReducer.token);

	// This container is used to check if the user's login token is valid (action creates a timer that expires)
	useEffect(() => {
		if (!isAuth) {
			navRef.current.dispatch(
				NavigationActions.navigate({ 
					routeName: "Startup",
					params: { update: Math.random() },
				})
			);
		}
	}, [isAuth]) 

	return <AppNavigator ref={navRef} />;
}

export default NavigationContainer;