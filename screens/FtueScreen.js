// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Linking
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
	loadActiveYears,
	updateEmptyYear,
	putNewActiveYear
} from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';

// ==================== Component ====================
const FtueScreen = props => {

	// Nav params
	const newUserNavProp = props.navigation.getParam("newUser");

	// Redux
	const dispatch = useDispatch();
	const uid = useSelector(state => state.authReducer.userId);

	// State
	const [newUser, setNewUser] = useState(false);
	const currentYear = new Date().getFullYear();

	// ASYNC: load the active years of the user (not year data)
	const loadActiveYear = async () => {
		dispatch(loadActiveYears(uid));
	};

	// ASYNC: adds a new active year to the user's active years based on current year if they have none
	const loadNewActiveYear = async () => {
		dispatch(putNewActiveYear(uid, currentYear));
	};

	// ASYNC: if they don't have the active year, grab it from FB and put it into their data
	const loadNewEmptyYearFromCalendar = async () => {
		dispatch(updateEmptyYear(uid, currentYear));
	};

	// Use effects
	useEffect(() => {
		setNewUser(newUserNavProp);
	}, [newUserNavProp]);

	useEffect(() => {
		if (newUser === false) return;
		loadNewActiveYear().then(() => {
			loadActiveYear().then(() => {
				loadNewEmptyYearFromCalendar();
			});
		});
	}, [newUser]);

	// Ftue header component
	const FtueHeader = () => {
		return (
			<View style={styles.ftueHeader}>
				{/* Title text */}
				<Text style={styles.welcomeText}>Welcome!</Text>

				{/* Continue button */}
				<TouchableOpacity
					activeOpacity={Tools.activeOpacity}
					style={styles.navButton}
					onPress={() => { props.navigation.replace("Home") }}>
					<Text style={{ ...styles.welcomeText, paddingRight: 10, color: Tools.color3 }}>Continue</Text>
					<Svg style={{
							shadowColor: '#000',
							shadowOffset: { width: 0, height: -3 },
							shadowRadius: 2,
							shadowOpacity: 1,
						}}
						width={14}
						height={16}
						viewBox="0 0 14 16">
						<Path fill={Tools.color3} d={Tools.arrowPath} />
					</Svg>
				</TouchableOpacity>
			</View>
		)
	};

	return (
		<View style={styles.screen}>
			{/* Header */}
			{newUserNavProp === false ?
				<OtherPagesHeader navigation={props.navigation} title={"How to Use"} />
				:
				<FtueHeader />
			}

			{/* Inner screen */}
			<View style={styles.innerScreen}>
				<ScrollView
					style={{ flex: 1, width: "100%" }}
					contentContainerStyle={{ flexGrow: 1 }}
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}>
					<View style={styles.scrollContentContainer}>
						{/* Summary text */}
						<Text style={styles.bodyText}>
							FeelGood is a simple daily mood tracking and journaling tool. Submitting a daily entry is easy: tap the bottom text bar to open the console, slide the mood bar, and write about your day. Submit your entry by tapping the <Text style={{ fontWeight: "500", color: Tools.accentColor }}>blue "+" button</Text>.
						</Text>

						{/* Image */}
						<View style={styles.ftueImageContainer}>
							<Image
								style={{ width: "100%", height: 212 }}
								source={require("../assets/images/ftue-home_op.png")}
								resizeMode={"contain"} 
							/>
						</View>

						{/* Arrow */}
						<Image
							style={styles.ftueArrow}
							source={require("../assets/images/ftue-arrow_grey.png")}
							resizeMode={"contain"} 
						/>

						{/* Image */}
						<View style={{ ...styles.ftueImageContainer, marginTop: 0 }}>
							<Image
								style={{ width: "100%", height: 280 }}
								source={require("../assets/images/ftue-console_op.png")}
								resizeMode={"contain"} 
							/>
						</View>

						{/* Headline */}
						<Text style={styles.bodyTextHeadline}>
							View Past Entires
						</Text>

						{/* Past entries text */}
						<Text style={styles.bodyText}>
							Tap on the desired month to be taken to the Month Detail screen. Tapping on a day in the Month Detail screen will display that day's entry.
						</Text>

						{/* Image */}
						<View style={styles.ftueImageContainer}>
							<Image
								style={{ width: "100%", height: 220 }}
								source={require("../assets/images/ftue-month_op.png")}
								resizeMode={"contain"} 
							/>
						</View>

						{/* Arrow */}
						<Image
							style={styles.ftueArrow}
							source={require("../assets/images/ftue-arrow_grey.png")}
							resizeMode={"contain"} 
						/>

						{/* Image */}
						<View style={{ ...styles.ftueImageContainer, marginTop: 0 }}>
							<Image
								style={{ width: "100%", height: 462 }}
								source={require("../assets/images/ftue-detail_op.png")}
								resizeMode={"contain"} 
							/>
						</View>

						{/* Headline */}
						<Text style={styles.bodyTextHeadline}>
							Submit Daily!
						</Text>

						<Text style={styles.bodyText}>
							It's easy for us to forget how we feel now in the future. Be sure to submit an entry every day; there is no way to submit or edit past entries. However, if you have already made an entry for today and would like to change it, simply create a new entry and submit it.
						</Text>

						{/* Headline */}
						<Text style={styles.bodyTextHeadline}>
							Data &amp; Privacy
						</Text>

						<Text style={styles.bodyText}>
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

					</View>
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
	// Header for FTUE
	ftueHeader: {
		height: 65,
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
		paddingHorizontal: Tools.paddingNormal,
	},
	navButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	// Scroll content
	scrollContentContainer: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	// Images
	ftueImageContainer: {
		width: "100%",
		marginTop: Tools.paddingNormal,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: Tools.colorHeaderGrey,
	},
	ftueArrow: {
		width: "100%",
		height: 30,
	},
	// Text
	welcomeText: {
		color: Tools.color5,
		fontSize: 24,
		fontWeight: "500",
	},
	bodyTextHeadline: {
		width: "100%",
		textAlign: "left",
		color: Tools.color5,
		marginTop: Tools.paddingLarge,
		paddingHorizontal: Tools.paddingHalf,
		fontSize: 24,
		fontWeight: "500",
	},
	bodyText: {
		width: "100%",
		color: Tools.colorLight,
		marginTop: Tools.paddingNormal,
		paddingHorizontal: Tools.paddingHalf,
		fontSize: 20,
		fontWeight: "100",
		letterSpacing: 0.75,
	},
	buttonText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
	},
	// Button
	accountButton: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Tools.colorTextboxGrey,
		paddingHorizontal: Tools.paddingLarge,
		paddingVertical: Tools.paddingNormal,
		marginVertical: Tools.paddingLarge,
		borderRadius: 3,
	},
});

export default FtueScreen;