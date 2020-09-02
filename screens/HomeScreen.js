// React
import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import HomeScreenCalendar from '../components/HomeScreenCalendar';


// ==================== Functional component 
const HomeScreen = props => {

	// console.log((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
	// console.log(date.getDay());
	
	const date = new Date(); // Or your date here
	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];
	const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());

	return (
		<View style={styles.screen}>
			<AppHeader />

			<HomeScreenCalendar style={styles.homeScreenCalendar} />

			<View style={styles.dayTextContainer}>
				<Text style={styles.dayText}>{day}</Text>
				<Text style={styles.dayTextDate}>{dayDate}</Text>
			</View>
		</View>
	);
};


// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},
	dayTextContainer: {
		width: "100%",
		marginTop: 20,
		flexDirection: "column",
	},
	homeScreenCalendar: {
		flexDirection: "row",
				borderWidth: 1,
		borderColor: "blue"
	}
});

export default HomeScreen;