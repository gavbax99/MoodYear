// React
import React, { useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	ActivityIndicator, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { useDispatch } from "react-redux"; 
import { loginFromLocalStorage } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';
import { exp } from 'react-native/Libraries/Animated/src/Easing';

// ==================== Component
const StartupScreen = props => {

	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			// Try to find local uid/token
			const userData = await AsyncStorage.getItem("@authData");

			// If none, go to login screen
			if (!userData) {
				props.navigation.navigate("Login");
				return;
			}

			// Gather data
			const jsonData = JSON.parse(userData);
			const { token, userId, expirationDate } = jsonData;
			const expDate = new Date(expirationDate);

			// If token expired/no token/no user id, go to login screen
			if (expDate <= new Date() || !token || !userId) {
				props.navigation.navigate("Login");
				return;
			}

			const expirationTime = expDate.getTime() - new Date().getTime();

			// If stuff exists, autologin and go to home screen
			dispatch(loginFromLocalStorage(token, userId, expirationTime));
			props.navigation.navigate("Home");
		};

		tryLogin();
	}, [dispatch]);


	return (
		<View style={styles.screen} />
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Tools.backgroundColor,
	}
});

export default StartupScreen;