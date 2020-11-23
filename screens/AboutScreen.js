// React
import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
	Linking
} from 'react-native';

// Redux
import {
	logoutAuth,
	logoutData,
	deleteAccount
} from "../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';

// ==================== Component ====================
const AboutScreen = props => {

	// Nav params
	const displayContentIdentifier = props.navigation.getParam("display");

	// Redux
	const dispatch = useDispatch();
	const registeredDate = useSelector(state => state.authReducer.registeredDate);
	const email = useSelector(state => state.authReducer.email);
	const token = useSelector(state => state.authReducer.token);
	const uid = useSelector(state => state.authReducer.userId);

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutAuth());
		dispatch(logoutData());
		props.navigation.replace("Login");
	};

	// Delete account warning alert
	const handleDeleteAccount = () => {
		Alert.alert(
			"Are you sure?",
			"This will completely delete your account, all personal data, and journal entries from our server. This acction cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Delete",
					onPress: () => {
						dispatch(logoutAuth());
						dispatch(logoutData());
						dispatch(deleteAccount(uid, token));
						props.navigation.replace("Login");
					},
					style: "destructive"
				}
			],
			{ cancelable: false }
		);
	};

	// Dynamic component based on nav param
	const ScreenContent = () => {
		switch (displayContentIdentifier) {
			case "Account":
				return (
					<View style={styles.dynamicContentContainer}>
						{/* Year selection */}
						<View style={{ ...styles.accountInfoContainer, marginTop: Tools.paddingLarge }}>
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoTitleText}>Email:</Text>
								<Text style={styles.infoText}>{email}</Text>
							</View>
							<View style={{ ...styles.infoTextContainer, marginTop: Tools.paddingHalf }}>
								<Text style={styles.infoTitleText}>Registered:</Text>
								<Text style={styles.infoText}>{registeredDate}</Text>
							</View>
						</View>

						{/* Logout button */}
						<TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={styles.accountButton}
							onPress={handleLogout}>
							<Text style={styles.buttonText}>Logout</Text>
						</TouchableOpacity>

						{/* Delete account button */}
						<TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={{ ...styles.accountButton, backgroundColor: Tools.color3 }}
							onPress={handleDeleteAccount}>
							<Text style={styles.buttonText}>Delete Account</Text>
						</TouchableOpacity>

					</View>)

			case "About":
				return (
					<View style={styles.dynamicContentContainer}>

						<Text style={styles.infoTextHeadline}>
							The App
						</Text>

						<Text style={styles.aboutText}>
							FeelGood is a mood tracking and journaling tool designed to see how you've been feeling over time and to identify trends that make you feel better.
						</Text>

						<Text style={styles.aboutText}>
							If you like FeelGood, please consider leaving a positive review on the App Store:
						</Text>

						{/* Review button */}
						<TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={{ ...styles.accountButton, backgroundColor: Tools.color3 }}
							onPress={() => {
								Linking.openURL("https://gavinbaxter.com");
							}}>
							<Text style={styles.buttonText}>Leave a Review</Text>
						</TouchableOpacity>

						<Text style={styles.infoTextHeadline}>
							Data &amp; Privacy
						</Text>

						<Text style={styles.aboutText}>
							FeelGood believes in privacy. The only data we store on our secure database is the email you registered with, the registration date, and your journal entries. Your data will <Text style={{ fontWeight: "500" }}>never</Text> be sold, transferred, or otherwise used outside of the FeelGood app. To learn more, read our Privacy Policy.
						</Text>

						{/* PP button */}
						<TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={styles.accountButton}
							onPress={() => {
								Linking.openURL("https://gavinbaxter.com");
							}}>
							<Text style={styles.buttonText}>Privacy Policy</Text>
						</TouchableOpacity>

						{/* Year selection */}
						<View style={{ ...styles.accountInfoContainer, marginTop: Tools.paddingLarge, marginBottom: Tools.paddingMonths }}>
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoTitleText}>Version:</Text>
								<Text style={styles.infoText}>1.0.0</Text>
							</View>
							<View style={{ ...styles.infoTextContainer, marginTop: Tools.paddingHalf }}>
								<Text style={styles.infoTitleText}>Built With:</Text>
								<Text style={styles.infoText}>React Native for iOS</Text>
							</View>
							<View style={{ ...styles.infoTextContainer, marginTop: Tools.paddingHalf }}>
								<Text style={styles.infoTitleText}>Developed By:</Text>
								<Text style={styles.infoText}>Gavin Baxter</Text>
							</View>
						</View>
					</View>)

			default: return (
				<Text style={{ color: "#fff" }}>Something went wrong.</Text>
			);
		}
	};

	return (
		<View style={styles.screen}>

			{/* Header */}
			<OtherPagesHeader
				navigation={props.navigation}
				title={displayContentIdentifier}
			/>

			{/* Inner screen */}
			<View style={styles.innerScreen}>
				<ScrollView
					style={{ flex: 1, width: "100%" }}
					contentContainerStyle={{ flexGrow: 1 }}
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}>

					{/* Dynamic content */}
					<ScreenContent />

				</ScrollView>
			</View>

		</View>
	);
};


// ==================== Styles ====================
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
		paddingHorizontal: Tools.paddingNormal,
	},
	// DYNAMIC
	dynamicContentContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
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
		marginTop: Tools.paddingLarge,
		borderRadius: 3,
	},
	// ABOUT
	infoTextHeadline: {
		width: "100%",
		paddingHorizontal: Tools.paddingHalf,
		color: Tools.color5,
		fontSize: 24,
		fontWeight: "500",
		marginTop: Tools.paddingLarge,
	},
	aboutText: {
		width: "100%",
		paddingHorizontal: Tools.paddingHalf,
		marginTop: Tools.paddingNormal,
		fontSize: 20,
		fontWeight: "100",
		color: Tools.colorLight,
		letterSpacing: 0.75,
	},
	buttonText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
	},
});

export default AboutScreen;