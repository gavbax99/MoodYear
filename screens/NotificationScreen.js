// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Linking, 
	Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Expo
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';

// ==================== Component ====================
const NotificationScreen = props => {

	// State
	const [hour, setHour] = useState(12);
	const [permission, setPermission] = useState(true);
	const [currentNotification, setCurrentNotification] = useState(null);

	// Enable permissions
	const enablePermissions = () => {
		Permissions.getAsync(Permissions.NOTIFICATIONS)
		.then(statusObj => {
			if (statusObj.status !== "granted") {
				return Permissions.askAsync(Permissions.NOTIFICATIONS);
			}
			return statusObj;
		})
		.then(statusObj => {
			if (statusObj.status !== "granted") {
				// nothing we can do
				return;
			}
		});

		Permissions.getAsync(Permissions.NOTIFICATIONS)
		.then(statusObj => {
			setPermission(statusObj.status === "granted" ? true : false);
		});
	};


	// SET notification
	const setNotification = async () => {
		await Notifications.cancelAllScheduledNotificationsAsync();
		
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "MoodYear Reminder",
				body: "Enter your daily mood ✏️"
			},
			trigger: {
				hour: hour,
				minute: 0,
				repeats: true,
			}
		});

		updateCurrentNotification();
	};

	// UPDATE information about current notification
	const updateCurrentNotification = () => {
		Notifications.getAllScheduledNotificationsAsync()
		.then(nArr => {
			if (nArr.length !== 0) {
				const nHour = nArr[0].trigger.dateComponents.hour;

				// console.log(nHour);

				let time;
				if (nHour === 0) {
					// Time is midnight
					time = "12:00 AM";
				} else if (nHour > 0 && nHour <= 11) {
					// Time is AM
					time = `${nHour}:00 AM`;
				} else if (nHour === 12) {
					// Time is noon
					time = "12:00 PM";
				} else if (nHour > 12) {
					// Time is PM
					time = `${nHour - 12}:00 PM`;
				}

				setCurrentNotification(time)
			} else {
				setCurrentNotification(null)
			}
		})
	};

	// CANCEL notification
	const cancelNotification = async () => {
		await Notifications.cancelAllScheduledNotificationsAsync();
		setCurrentNotification(null)
	};

	// Change notification permission if needed
	const appSettings = () => {
		Alert.alert(
			"Enable Notifications",
			"Please enable MoodYear notifications from your settings.",
			[
			  	{ text: "Cancel", style: "cancel", onPress: () => console.log("cancel") },
			 	{ text: "Settings", onPress: () => {
					Linking.openURL("app-settings:");
					setPermission(true);
					} 
				},
			],
			{ cancelable: false }
		  );
		  return;
	}

	// On mount, check permissions and update current notification
	useEffect(() => {
		enablePermissions();
		updateCurrentNotification();
	}, []);

	return (
		<View style={styles.screen}>
			<OtherPagesHeader navigation={props.navigation} title={"Daily Notification"} />

			{/* Inner screen */}
			<View style={styles.innerScreen}>

				{!permission ? 
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={{ ...styles.accountButton, backgroundColor: Tools.color3, width: "100%", marginBottom: Tools.paddingLarge }}
						onPress={() => {
							appSettings();
						}}>
						<Text style={styles.buttonText}>Enable Notifications</Text>
					</TouchableOpacity>
				: 					
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={{ ...styles.accountButton, backgroundColor: Tools.color3, width: "100%", marginBottom: Tools.paddingLarge }}
						onPress={() => {
							props.navigation.navigate({
								routeName: "Home",
							})
						}}>
						<Text style={styles.buttonText}>Go to Calendar</Text>
					</TouchableOpacity>
				}

				{/* Notification notice */}
				<View style={{with: "100%", marginBottom: Tools.paddingLarge}}>
					{!permission ? 
						<Text style={{...styles.notificationDisplayText, color: Tools.colorLight}}>Enable notifications above.</Text>
						:
						currentNotification ?
							<View style={{flexDirection: "row"}}>
								<Text style={styles.notificationDisplayText}>Daily notification set for</Text>
								<Text style={{...styles.notificationDisplayText, color: Tools.accentColor, fontWeight: "400"}}> {currentNotification}</Text>
							</View>
							:
							<Text style={styles.notificationDisplayText}>Set a daily notification.</Text>
					}
				</View>

				{/* Turn off notification button */}
				{currentNotification ? 
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={{ ...styles.accountButton, width: "100%", marginBottom: Tools.paddingLarge }}
						onPress={() => {
							cancelNotification();
						}}>
						<Text style={styles.buttonText}>Turn off Notification</Text>
					</TouchableOpacity>
				: null}

				{/* Time dropdown */}
				<View style={styles.timeContainer}>
					<View style={{flex: 1}}>
						<DropDownPicker
							items={[
								{label: '12:00 AM', value: 0},
								{label: '1:00 AM', value: 1},
								{label: '2:00 AM', value: 2},
								{label: '3:00 AM', value: 3},
								{label: '4:00 AM', value: 4},
								{label: '5:00 AM', value: 5},
								{label: '6:00 AM', value: 6},
								{label: '7:00 AM', value: 7},
								{label: '8:00 AM', value: 8},
								{label: '9:00 AM', value: 9},
								{label: '10:00 AM', value: 10},
								{label: '11:00 AM', value: 11},
								{label: '12:00 PM', value: 12},
								{label: '1:00 PM', value: 13},
								{label: '2:00 PM', value: 14},
								{label: '3:00 PM', value: 15},
								{label: '4:00 PM', value: 16},
								{label: '5:00 PM', value: 17},
								{label: '6:00 PM', value: 18},
								{label: '7:00 PM', value: 19},
								{label: '8:00 PM', value: 20},
								{label: '9:00 PM', value: 21},
								{label: '10:00 PM', value: 22},
								{label: '11:00 PM', value: 23},
							]}
							defaultValue={hour}
							containerStyle={{height: 60}}
							dropDownMaxHeight={175}
							style={{backgroundColor: '#fafafa', width: "100%"}}
							itemStyle={{
								justifyContent: 'flex-start',
							}}
							selectedLabelStyle={{
								fontWeight: "600",
								color: "black",
								fontSize: 22
							}}
							zIndex={100000}
							dropDownStyle={{backgroundColor: '#fafafa'}}
							onChangeItem={item => {
								setHour(item.value) 
							}}
						/>
					</View>

					{/* Set notification button */}
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={{ ...styles.accountButton, backgroundColor: Tools.color3, marginLeft: Tools.paddingLarge }}
						onPress={() => {
							setNotification();
						}}>
						<Text style={styles.buttonText}>Set</Text>
					</TouchableOpacity>
					
				</View>
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
		alignItems: "center",
		paddingTop: Tools.paddingLarge,
		paddingHorizontal: Tools.paddingNormal,
	},
	timeContainer: {
		width: "100%",
		flexDirection: "row",
		marginBottom: Tools.paddingLarge
	},
	accountButton: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Tools.colorTextboxGrey,
		paddingHorizontal: Tools.paddingLarge,
		paddingVertical: Tools.paddingNormal,
		borderRadius: 3,
	},
	buttonText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
	},
	notificationDisplayText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
	},
});

export default NotificationScreen;