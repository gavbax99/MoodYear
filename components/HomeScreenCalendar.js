// React
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// Data
import Year2020 from "../data/Year2020";

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';


// ==================== Component
const HomeScreenCalendar = props => {
	// Months to be rendered
	let renderMonths = [];

	// Find today
	// const now = new Date();
	// const start = new Date(now.getFullYear(), 0, 0);
	// const diff = now - start;
	// const oneDay = 1000 * 60 * 60 * 24;
	// const currentDay = Math.floor(diff / oneDay);
	// console.log(`Current day: ${currentDay}`);

	// Separate data into months
	Year2020.monthLength.reduce((t, monthArr, i) => {
		// if today
		// console.log(`currentDay: ${currentDay} | t: ${t} | monthArr[i]: ${monthArr[i]}`)
		// if (currentDay >= t && currentDay <= t + monthArr[i] ) {
		// 	console.log(Year2020.days[currentDay]);
		// 	Year2020.days[currentDay].today = true;
		// 	console.log(Year2020.days[currentDay]);
		// }

		const nextArr = Year2020.days.splice(t, Year2020.monthLength[i]);
		renderMonths.push(nextArr);
		return t += monthArr[i];
	}, 0);

	return (
		<ScrollView scrollEnabled={false} contentContainerStyle={styles.calendar}>
			
			{/* Render our months */}
			{renderMonths.map((monthArr) => {
				return (
					<HomeScreenMonth data={monthArr} />
				);
			})}

		</ScrollView>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	calendar: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
	}
});

export default HomeScreenCalendar;