// React
import React, { useEffect, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableWithoutFeedback,
	Keyboard 
} from 'react-native';

// Components
import AppHeader from '../components/AppHeader';
import MonthDetailBottomCard from '../components/MonthDetailBottomCard';
import MonthDetailCalendar from '../components/MonthDetailCalendar';
import Blackout from '../components/Blackout';

// Constants
import Tools from '../constants/Tools';

// Redux
import { useSelector } from "react-redux";


// ==================== Component
const MonthDetailScreen = props => {

	const data = useSelector(state => state.dataReducer.data);
	const yearInt = props.navigation.getParam("yearInt");
	const monthNo = props.navigation.getParam("monthNo");

	// IN THE CASE OF -1, WILL BE RED/NO DATA
	const startingFaceColor = data.months[monthNo].days[0].color-1;
	let startingSliderColor = "";
	switch (startingFaceColor) {
		case 0:
			startingSliderColor = Tools.color1;
			break;
		case 1:
			startingSliderColor = Tools.color2;
			break;
		case 2:
			startingSliderColor = Tools.color3;
			break;
		case 3:
			startingSliderColor = Tools.color4;
			break;
		case 4:
			startingSliderColor = Tools.color5;
			break;
		default: break;
	};
	
	const [dayToFind, setDayToFind] = useState(1);
	const [dayOfTheWeek, setDayOfTheWeek] = useState(data.months[monthNo].firstDayOfWeek);
	const [monthToFind, setMonthToFind] = useState(monthNo);
	const [yearToFind, setYearToFind] = useState(yearInt);
	const [faceColor, setFaceColor] = useState(startingSliderColor);
	const [colorNumber, setColorNumber] = useState(startingFaceColor);

	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	const monthDetailScreenHandleDay = (dayNo, dayOfTheWeek, currentMonth, currentYear, newFaceColor, colorNumber) => {
		setDayToFind(dayNo);
		setDayOfTheWeek(dayOfTheWeek);
		setMonthToFind(currentMonth);
		setYearToFind(currentYear);
		setFaceColor(newFaceColor);
		setColorNumber(colorNumber-1);
	}

	// useEffect(() => {
	// 	console.log("monthdetailscreen MAIN INFO: ", dayToFind, dayOfTheWeek, monthToFind, yearToFind)
	// 	//               for correct number format:    good         good          +1         good
	// 	//               for correct array format:     -1           NA            good       good
	// });

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>
				{/* Header */}
				<AppHeader navigation={props.navigation} backButton={true} />

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<MonthDetailCalendar 
						yearInt={yearToFind} 
						monthNo={monthToFind} 
						detailScreenFindDay={monthDetailScreenHandleDay}
						/>
					<Blackout />

					{/* Bottom card */}
					<MonthDetailBottomCard 
						yearInt={yearToFind}
						monthNo={monthToFind}
						dayNo={dayToFind}
						dayOfWeek={dayOfTheWeek}
						faceColor={faceColor}
						colorNumber={colorNumber}
						/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start",
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

export default MonthDetailScreen;