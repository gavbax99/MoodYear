// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loadData, loadActiveYears, updateEmptyYear, putNewActiveYear } from "../store/actions/actions";


// ==================== Functional component 
const FtueScreen = props => {

	const newUserNavProp = props.navigation.getParam("newUser");
	const [newUser, setNewUser] = useState(false);

	const dispatch = useDispatch();
	const date = new Date();
	const getYear = date.getFullYear();

	// Redux variables
	const uid = useSelector(state => state.authReducer.userId);

	const navToHome = () => {
		props.navigation.replace("Home");
	}

	// ASYNC: load the active years of the user (not year data)
	const loadActiveYear = async () => {
		dispatch(loadActiveYears(uid));
	}

	// // ASYNC: loads the year data of the current year (first time page load; year can change in settings)
	// const loadYearData = async () => {
	// 	dispatch(loadData(uid, getYear));
	// }

	// // ASYNC: adds a new active year to the user's active years based on current year if they have none
	const loadNewActiveYear = async () => {
		dispatch(putNewActiveYear(uid, getYear));
	}

	// // ASYNC: if they don't have the active year, grab it from FB and put it into their data
	const loadNewEmptyYearFromCalendar = async () => {
		dispatch(updateEmptyYear(uid, getYear));
	}

	useEffect(() => {
		setNewUser(newUserNavProp);
	}, [newUserNavProp]);

	useEffect(() => {
		if (newUser === false) return;

		console.log("newuser = true", newUser);
		loadNewActiveYear().then(() => {
			loadActiveYear().then(() => {
				loadNewEmptyYearFromCalendar()
			})
		})

	}, [newUser]);

	return (
		<View style={styles.screen}>
				{/* Header */}
				{newUserNavProp === false ? 
					<OtherPagesHeader navigation={props.navigation} title={"How to Use"}/>
					: 
					<View style={styles.welcomeView}>
						<Text style={styles.welcomeText}>Welcome</Text>
						<Text style={styles.welcomeText}>X</Text>
					</View>
				}

				{/* <AppHeader navigation={props.navigation} backButton={false} isSettings={false} /> */}

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					<View style={{flex: 1, width: "100%", borderWidth: 1,
					borderColor: 'red'}}>						
					</View>
				</View>

			{/* <TouchableOpacity 
					activeOpacity={Tools.activeOpacity} 
					style={styles.to} 
					onPress={navToHome}
					>
					<View style={styles.box}>
						<Text>ftue boi</Text>
					</View>
				</TouchableOpacity> */}
		</View>

	);
};


// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},

	innerScreen: {
		position: "relative",
		width: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: Tools.paddingNormal,
	},

	welcomeView: {
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
	},

	welcomeText: {
		color: Tools.color5,
		fontSize: 24,
		fontWeight: "700",
		paddingLeft: Tools.paddingHalf,
	},

	to: {
		borderWidth: 1,
		borderColor: 'red'
	},

	box: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: 'blue'
	}
});

export default FtueScreen;