// React
import React, { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity
} from 'react-native';

// Constants
import Tools from '../constants/Tools';


// ==================== Component
const MonthDetailDay = props => {

	const handleDayClick = () => {
		console.log("day click in MonthDetailDay: ", )
		props.pressEvent(props.dayOfTheMonth, props.dayOfTheWeek);
	}

	return (
		<TouchableOpacity 
			activeOpacity={Tools.activeOpacity} 
			style={{
				...styles.day, 
				backgroundColor: props.color,
				// add margin left of the first day to represent calendar format
				marginLeft: props.isFirstDay ? `${(14.25*(props.firstDayNo-1))+1.75}%` : "1.75%",
				}}
			onPress={handleDayClick}
			>

			<Text style={{
				...styles.dayText,
				color: props.color === Tools.color0 ? Tools.colorTextboxGrey : Tools.colorLight, 
				}}>
				{props.dayOfTheMonth}
			</Text>

			{(props.dayOfTheMonth === props.currentDay && props.isCurrentMonth) && (
				<View style={{
					...styles.today,
					borderColor: Tools.colorLight,
					}} />
			)}

		</TouchableOpacity>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	day: {
		position: "relative",
		// total width with margin: 14.25%
		width: "10.75%",
		paddingTop: "10%",
		margin: "1.75%",

		borderRadius: 4,
		shadowColor: '#101010',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.5,
	},
	dayText: {
		position: "absolute",
		bottom: 4,
		right: 7,
		color: "#fff",
		fontSize: 12,
		fontWeight: "700",
		textShadowColor: Tools.colorHeaderGrey,
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 0
	},
	today: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		borderWidth: 1,
		borderRadius: 4,
	}
});

export default MonthDetailDay;