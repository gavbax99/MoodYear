// React
import React from 'react';
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


// ==================== Component
const HomeScreenCalendar = props => {

	console.log("HomeScreenCalendar render");

	return (
		<View style={styles.calendar}>

			{/* List of months */}
			<View style={styles.calendarInner}>
				{/* Render our months */}
				{Year2020.months.map((monthObj, i) => {
					return (
						<HomeScreenMonth 
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