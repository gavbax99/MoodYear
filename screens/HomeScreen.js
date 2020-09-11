// React
import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import HomeScreenCalendar from '../components/HomeScreenCalendar';
import HomeScreenBottomCard from '../components/HomeScreenBottomCard';


// ==================== Functional component 
const HomeScreen = props => {

	// console.log((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
	// console.log(date.getDay());
	
	const date = new Date(); // Or your date here
	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];
	const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());

	const handleTouchableWithoutFeedback = () => {
		console.log("try")
		Keyboard.dismiss();
	}

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>

				{/* Header */}
				<AppHeader />

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					<HomeScreenCalendar style={styles.homeScreenCalendar} />

					{/* <View style={styles.reviewContainer}>
						<Text style={styles.review}>{day}</Text>
						<Text style={styles.reviewDate}>{dayDate}</Text>
					</View> */}

					{/* <View>
						<Text>hi</Text>
					</View> */}

					{/* Bottom card */}
					<HomeScreenBottomCard />
				</View>

			</View>
		</TouchableWithoutFeedback>
	);
};


// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},
	innerScreen: {
		position: "relative",
		width: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple",
	},
	// reviewContainer: {
	// 	flex: 1,
	// 	width: "100%",
	// 	flexDirection: "column",
	// 	borderWidth: 1,
	// 	borderColor: "blue",
	// },
	// review: {
	// 	flex: 1,
	// }
});

export default HomeScreen;