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
		Keyboard.dismiss();
	}

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>

				{/* Header */}
				<AppHeader />

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<HomeScreenCalendar style={styles.homeScreenCalendar} />

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
	}
});

export default HomeScreen;