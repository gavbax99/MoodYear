// React
import React from 'react';
import { 
	StyleSheet, 
	View,  
} from 'react-native';

// Constants
import Tools from '../constants/Tools';


// ==================== Component
const HomeScreenDay = props => {
	
	// If today, highlight the day in accent color
	// (props.dayNo === props.currentDay && props.isCurrentMonth) ? console.log("it is: " + props.dayNo) : null;

	return (
		<View style={{ 
			...styles.day, 
			backgroundColor: props.color,
			}}>
			{(props.dayNo === props.currentDay && props.isCurrentMonth) && (
				<View style={{
					...styles.today,
					borderColor: Tools.accentColor,
					}} />
			)}
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	day: {
		position: "relative",
		width: "10.75%",
		paddingTop: "10%",
		margin: "1.75%",

		borderRadius: 2,
		shadowColor: '#101010',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.6,
	},
	today: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		borderWidth: 1.25,
		borderRadius: 2,
	}
});

export default HomeScreenDay;