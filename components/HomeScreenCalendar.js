// React
import React, { useEffect } from 'react';
import { 
	StyleSheet, 
	View 
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';

// Redux
import { useSelector } from "react-redux";

// ==================== Component
const HomeScreenCalendar = props => {

	console.log("HomeScreenCalendar render");

	const date = new Date();
	const getYear = date.getFullYear();
	const getMonth = date.getMonth();
	const getDay = date.getDate();

	const data = useSelector(state => state.dataReducer.data);
	useEffect(() => {
		// console.log(data);
		if (data[getYear] !== undefined) {
			console.log(data[getYear].months[getMonth].name);
			console.log(data[getYear].months[getMonth].days[getDay-1]);
			console.log(getDay, data[getYear].months[getMonth].days[getDay-1].message);
		}
	}, [data]);

	return (
		<View style={styles.calendar}>

			{/* List of months */}
			<View style={styles.calendarInner}>
				{/* Render our months */}
				{Year2020[2020].months.map((monthObj, i) => {
					return (
						<HomeScreenMonth 
							year={Year2020[2020].yearInt}
							monthObj={monthObj}
							navigation={props.navigation}
							key={monthObj.name} 
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