// React
import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { logoutAuth, logoutCreds, deleteAccount } from "../store/actions/authActions";
import { logoutData } from "../store/actions/dataActions";

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';
import RecentFeelings from "../components/RecentFeelings";

// ==================== Component ====================
const AboutScreen = props => {

	// Nav params
	const displayContentIdentifier = props.navigation.getParam("display");

	// Redux
	const dispatch = useDispatch();
	const registeredDate = useSelector(state => state.authReducer.registeredDate);
	const data = useSelector(state => state.dataReducer.data);
	const email = useSelector(state => state.authReducer.email);
	const token = useSelector(state => state.authReducer.token);
	const uid = useSelector(state => state.authReducer.userId);

	// State
	const [last7, setLast7] = useState(0);
	const [last30, setLast30] = useState(0);
	const [last7Entries, setLast7Entries] = useState(0);
	const [last30Entries, setLast30Entries] = useState(0);

	// Handle logout
	const handleLogout = () => {
		dispatch(logoutData());
		dispatch(logoutCreds());
		dispatch(logoutAuth());
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
						dispatch(logoutData());
						dispatch(logoutCreds());
						dispatch(logoutAuth());
						dispatch(deleteAccount(uid, token));
					},
					style: "destructive"
				}
			],
			{ cancelable: false }
		);
	};

	// Last 7/30 logic
	useEffect(() => {
		if (Object.keys(data).length === 0 || displayContentIdentifier === "About") return;

		const date = new Date();
		const monthNoForArray = date.getMonth();
		const dayNoForArray = date.getDate();

		// ==================== 30 ====================
		let thirtyArray = [];
		let thirtyTotal = 0;
		const startingIndex30 = 30 - dayNoForArray >= 0 ? 0 : 1; // 30-27= 3 -> 0
		const thirtyRemainder = startingIndex30 === 0 ? 30 - dayNoForArray : 0; // true -> 30-27= 3
		const endingIndex30 = dayNoForArray;

		// Current month
		for (i = startingIndex30; i < endingIndex30; i++) {
			const color = data.months[monthNoForArray].days[i].color;
			if (color !== 0) {
				thirtyTotal++;
				thirtyArray = [...thirtyArray, color];
			}
		}

		// If remainder, pull from previous month
		if (thirtyRemainder > 0) {
			const prevMonthLength = data.months[monthNoForArray - 1].days.length;
			// Accounting for March 1st (pML - tR = -1)
			for (i = prevMonthLength - thirtyRemainder >= 0 ? prevMonthLength - thirtyRemainder : 0; i < prevMonthLength; i++) {
				const color = data.months[monthNoForArray - 1].days[i].color;
				if (color !== 0) {
					thirtyTotal++;
					thirtyArray = [...thirtyArray, color];
				}
			}
		}

		if (thirtyArray.length > 0) {
			const thirtyArraySum = thirtyArray.reduce((acc, t) => acc + t);
			const thirtyArrayAverage = thirtyArraySum / thirtyArray.length;

			setLast30(Math.round(thirtyArrayAverage));
			setLast30Entries(thirtyTotal);
		}

		// ==================== 7 ====================
		let sevenArray = [];
		let sevenTotal = 0;
		const startingIndex7 = dayNoForArray - 7 >= 0 ? dayNoForArray - 7 : 0;
		const sevenRemainder = startingIndex7 === 0 ? 7 - dayNoForArray : 0;
		const endingIndex7 = dayNoForArray;

		// Current month
		for (i = startingIndex7; i < endingIndex7; i++) {
			const color = data.months[monthNoForArray].days[i].color;
			if (color !== 0) {
				sevenTotal++;
				sevenArray = [...sevenArray, color];
			}
		}

		// If remainder, pull from previous month
		if (sevenRemainder > 0) {
			const prevMonthLength = data.months[monthNoForArray - 1].days.length;
			for (i = prevMonthLength - sevenRemainder; i < prevMonthLength; i++) {
				const color = data.months[monthNoForArray - 1].days[i].color;
				if (color !== 0) {
					sevenTotal++;
					sevenArray = [...sevenArray, color];
				}
			}
		}

		if (sevenArray.length > 0) {
			const sevenArraySum = sevenArray.reduce((acc, t) => acc + t);
			const sevenArrayAverage = sevenArraySum / sevenArray.length;

			setLast7(Math.round(sevenArrayAverage));
			setLast7Entries(sevenTotal);
		}
	}, [data])

	// Dynamic component based on nav param
	const ScreenContent = () => {
		switch (displayContentIdentifier) {
			case "Account":
				return (
					<View style={styles.dynamicContentContainer}>
						{/* Recent feelings */}
						<View style={styles.feelingsContainer}>
							<Text style={{ ...styles.infoTextHeadline, paddingHorizontal: 0, marginBottom: Tools.paddingNormal }}>
								Recent Averages:
							</Text>
							
							<View style={{ ...styles.accountInfoContainer }}>
								{/* 7 */}
								<RecentFeelings 
									entries={last7Entries}
									totalEntries={7}
									faceColor={last7}
								/>
								
								{/* 30 */}
								<RecentFeelings 
									style={{marginTop: Tools.paddingNormal}}
									entries={last30Entries}
									totalEntries={30}
									faceColor={last30}
								/>
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

						{/* Account info */}
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

					</View>)

			case "About":
				return (
					<View style={styles.dynamicContentContainer}>

						<Text style={styles.infoTextHeadline}>
							The App
						</Text>

						<Text style={styles.aboutText}>
							MoodYear is a mood tracking and journaling tool designed to see how you've been feeling over time and to identify trends that make you feel better.
						</Text>

						{/* <Text style={styles.aboutText}>
							If you like MoodYear, please consider leaving a positive review on the App Store:
						</Text> */}

						{/* Review button */}
						{/* <TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={{ ...styles.accountButton, backgroundColor: Tools.color3 }}
							onPress={() => {
								Linking.openURL("https://gavinbaxter.com");
							}}>
							<Text style={styles.buttonText}>Leave a Review</Text>
						</TouchableOpacity> */}

						<Text style={styles.infoTextHeadline}>
							Data &amp; Privacy
						</Text>

						<Text style={styles.aboutText}>
							MoodYear believes in privacy. The only data we store on our secure database is the email you registered with, the registration date, and your journal entries. Your data will <Text style={{ fontWeight: "500" }}>never</Text> be sold, transferred, or otherwise used outside of the MoodYear app. To learn more, read our official Privacy Policy.
						</Text>

						{/* PP button */}
						<TouchableOpacity
							activeOpacity={Tools.activeOpacity}
							style={styles.accountButton}
							onPress={() => {
								Linking.openURL("https://gavinbaxter.com/moodyear-privacy-policy.html");
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
	feelingsContainer: {
		width: "100%",
	},
});

export default AboutScreen;