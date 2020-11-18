// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { loadActiveYears, loadData, removeData } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import dataReducer from '../store/reducers/dataReducer';


// ==================== Component
const SettingsScreen = props => {
	
	console.log("settings rere");

	const dispatch = useDispatch();
	const activeYears = useSelector(state => state.dataReducer.years);
	const data = useSelector(state => state.dataReducer.data);
	const uid = useSelector(state => state.authReducer.userId);

	useEffect(() => {
		dispatch(loadActiveYears(uid));
	}, [activeYears])

	const switchYear = (year) => {
		dispatch(removeData());
		dispatch(loadData(uid, year));
		props.navigation.navigate("Home");
	}

	return (
		<View style={styles.screen}>
			{/* Header */}
			<AppHeader navigation={props.navigation} backButton={true} isSettings={true} />

			<View style={styles.innerScreen}>

				{/* Year selection */}
				<View style={styles.selectYearContainer}>
					<Text style={styles.buttonText}>View Previous Years:</Text>
					{Object.keys(activeYears).map((val) => {
						return (
							<TouchableOpacity
								style={(data.year === val) ? 
									{...styles.yearButton, borderWidth: 2, borderColor: Tools.accentColor}
									: 
									styles.yearButton
								}
								key={val}
								activeOpacity={Tools.activeOpacity}
								onPress={() => switchYear(val)}
								>
								<Text style={styles.yearText}>{val}</Text>
							</TouchableOpacity>
						)
					})}
				</View>

				{/* Help button */}
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity} 
					style={styles.settingsButton} 
					onPress={() => {props.navigation.goBack()}}>
					<Text style={styles.buttonText}>How to Use</Text>
				</TouchableOpacity>

				{/* About button */}
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity} 
					style={styles.settingsButton} 
					onPress={() => {props.navigation.goBack()}}>
					<Text style={styles.buttonText}>About</Text>
				</TouchableOpacity>

				{/* Logout button */}
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity} 
					style={styles.settingsButton} 
					onPress={() => {props.navigation.goBack()}}>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>

			</View>

		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},
	innerScreen: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: Tools.paddingNormal,
	},

	selectYearContainer: {
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 3,
		borderWidth: 2,
		borderColor: Tools.colorTextboxGrey,
		padding: Tools.paddingNormal,
	},
	yearButton: {
		width: "100%",
		backgroundColor: Tools.colorTextboxGrey,
		paddingHorizontal: Tools.paddingLarge,
		paddingVertical: Tools.paddingNormal,
		borderRadius: 3,
		marginTop: Tools.paddingNormal,
	},
	yearText: {
		color: Tools.colorLight,
		fontSize: 20,
		fontWeight: "200",
	},

	settingsButton: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Tools.colorTextboxGrey,
		paddingHorizontal: Tools.paddingLarge,
		paddingVertical: Tools.paddingNormal,
		marginTop: Tools.paddingNormal,
		borderRadius: 3,
	},
	buttonText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
	},
});

export default SettingsScreen;