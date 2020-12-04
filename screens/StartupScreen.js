// React
import React, { useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { useDispatch } from "react-redux"; 
import { loginFromLocalStorage, login } from "../store/actions/authActions";

// Constants
import Tools from '../constants/Tools';

// ==================== Component ====================
const StartupScreen = props => {

	// Nav params
	const navParam = props.navigation.getParam("update");

	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			// Try to find local uid/token
			const userData = await AsyncStorage.getItem("@authData");
			const userCreds = await AsyncStorage.getItem("@authCreds");

			// If none, go to login screen
			if (!userData && !userCreds) {
				props.navigation.navigate("Login");
				return;
			}

			if (userData) {
				// Gather data
				const jsonData = JSON.parse(userData);
				const { token, userId, expirationDate } = jsonData;
				const expDate = new Date(expirationDate);

				// If token expired/no token/no user id, go to login screen
				if (expDate <= new Date() || !token || !userId) {
					props.navigation.navigate("Login");
					return;
				}

				// If token is valid, login from local storage through token
				if (expDate > new Date()) {
					const expirationTime = expDate.getTime() - new Date().getTime();
					dispatch(loginFromLocalStorage(token, userId, expirationTime));
					props.navigation.navigate("Home");
					return;
				}
			}

			if (userCreds) {
				// Gather creds
				const jsonCreds = JSON.parse(userCreds);
				const { email, password } = jsonCreds;

				// Otherwise, regular login with un/pw
				if (email && password) {
					dispatch(login(email, password));
					props.navigation.navigate("Home");
					return;
				}
			}

			// If all else fails, just go to login
			props.navigation.navigate("Login");
		};

		tryLogin();
	}, [navParam]);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Tools.color5} />
		</View>
	);
}

// ==================== Styles ====================
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Tools.backgroundColor,
	}
});

export default StartupScreen;