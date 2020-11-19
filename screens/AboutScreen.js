// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';

// Redux
import { logoutAuth, logoutData, deleteAccount } from "../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";


// ==================== Functional component 
const AboutScreen = props => {

	const dispatch = useDispatch();

	const displayContentIdentifier = props.navigation.getParam("display");


	// CONTENT FOR ACCOUNT SCREEN
	const email = useSelector(state => state.authReducer.email);
	const registeredDate = useSelector(state => state.authReducer.registeredDate);
	const uid = useSelector(state => state.authReducer.userId);

	const test = () => {
		Alert.alert(
			"Are you sure?", 
			"This will completely delete your account and personal data from out records.",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Delete",
					onPress: () => {
						console.log("deleted bitch")
						dispatch(logoutAuth());
						dispatch(logoutData());
						dispatch(deleteAccount(uid));
						props.navigation.replace("Login");
					},
					style: "destructive"
				}
			],
			{ cancelable: false }
			)
	}

	// DYNAMIC CONTENT
	const ScreenContent = () => {
		switch (displayContentIdentifier) {
			case "Account":
				return (
					<View style={styles.dynamicContentContainer}>
						{/* Year selection */}
						<View style={styles.accountInfoContainer}>
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoTitleText}>Email:</Text>
								<Text style={styles.infoText}>{email}</Text>
							</View>
							<View style={{...styles.infoTextContainer, marginTop: 10}}>
								<Text style={styles.infoTitleText}>Registered:</Text>
								<Text style={styles.infoText}>{registeredDate}</Text>
							</View>
						</View>

						{/* Logout button */}
						<TouchableOpacity 
							activeOpacity={Tools.activeOpacity} 
							style={styles.accountButton} 
							onPress={() => {
								dispatch(logoutAuth());
								dispatch(logoutData());
								props.navigation.replace("Login");
							}}>
							<Text style={styles.buttonText}>Logout</Text>
						</TouchableOpacity>

						{/* Logout button */}
						<TouchableOpacity 
							activeOpacity={Tools.activeOpacity} 
							style={{...styles.accountButton, backgroundColor: Tools.color3}} 
							onPress={test}>
							<Text style={styles.buttonText}>Delete Account</Text>
						</TouchableOpacity>

					</View>)













			case "About":
				return (
					<View style={styles.dynamicContentContainer}>
						<Text>
							This is about.
						</Text>
					</View>)

			default: return (
				<Text style={{color: "#fff"}}>Something went wrong.</Text>
			);
		}
	}

	return (
		<View style={styles.screen}>
				{/* Header */}
				<OtherPagesHeader navigation={props.navigation} title={displayContentIdentifier}/>


				{/* Inner screen */}
				<View style={styles.innerScreen}>

					<ScrollView
						style={{flex: 1, width: "100%"}}
						contentContainerStyle={{flexGrow: 1}}
						scrollEnabled={false}>

						{/* Dynamic content */}
						<ScreenContent/>

					</ScrollView>

					{/* <TouchableOpacity 
						activeOpacity={Tools.activeOpacity} 
						style={{width: 100, height: 100, backgroundColor: "red"}} 
						onPress={() => {props.navigation.navigate({
							routeName: "Ftue",
							params: { newUser: false },
						})}}>

					</TouchableOpacity> */}

				</View>

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
		flex: 1,
		width: "100%",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: Tools.paddingNormal,
	},

	// DYNAMIC
	dynamicContentContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",

		// borderWidth: 1,
		// borderColor: 'red'
	},


	// ACCOUNT
	accountInfoContainer: {
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 3,
		borderWidth: 2,
		borderColor: Tools.colorTextboxGrey,
		padding: Tools.paddingNormal,
	},
	infoTextContainer: {
		width: "100%", 
		flexDirection: "row", 
		justifyContent: "flex-start",
		alignItems: "center"
	},
	infoTitleText: {
		color: Tools.colorLight,
		fontSize: 20,
		fontWeight: "500",
	},
	infoText: {
		flex: 1, 
		paddingLeft: 10,
		fontSize: 20,
		fontWeight: "100", 
		color: Tools.colorLight,
	},
	accountButton: {
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

export default AboutScreen;