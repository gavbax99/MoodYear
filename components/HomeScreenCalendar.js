// React
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

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
		<View style={styles.calendar}>

			{/* List of months */}
			<View style={styles.calendarInner}>
				{/* Render our months */}
				{renderMonths.map((monthArr, i) => {
					return (
						<HomeScreenMonth 
							data={monthArr} 
							key={i} />
					);
				})}
			</View>

			{/* Blackout */}
			<View style={styles.calendarBlackout}></View>

		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	calendar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderWidth: 1,
		borderColor: "red",

		// flex: 1,
		// position: "relative",
		// borderWidth: 1,
		// borderColor: "red",
		// height: 700
	},
	calendarInner: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: "2%",
	},
	calendarBlackout: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,0.5)",
	}
});

export default HomeScreenCalendar;