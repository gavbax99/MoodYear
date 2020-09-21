// React
import React, { useCallback } from 'react';
import { 
	StyleSheet, 
	View 
} from 'react-native';

// Redux
import { 
	useSelector, 
	useDispatch 
} from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';


// ==================== Component
const HomeScreenCalendar = props => {

	console.log("HomeScreenCalendar render");

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
	let newDaysArr = [...Year2020.days];
	Year2020.months.reduce((t, monthArr, i) => {
		// if today
		// console.log(`currentDay: ${currentDay} | t: ${t} | monthArr[i]: ${monthArr[i]}`)
		// if (currentDay >= t && currentDay <= t + monthArr[i] ) {
		// 	console.log(Year2020.days[currentDay]);
		// 	Year2020.days[currentDay].today = true;
		// 	console.log(Year2020.days[currentDay]);
		// }

		const nextArr = newDaysArr.splice(t, Year2020.months[i].length);
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
							name={monthArr}
							monthName={Year2020.months[i].name} 
							navigation={props.navigation}
							key={monthArr[0].id} 
							/>
					);
				})}
			</View>

		</View>
	);
};

// ==================== Styles
const styles = StyleSheet.create({
	calendar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	calendarInner: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: Tools.paddingHalf,
	},
});

export default HomeScreenCalendar;