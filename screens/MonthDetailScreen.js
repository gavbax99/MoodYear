// React
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';

// Redux
import { useSelector } from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import MonthDetailBottomCard from '../components/MonthDetailBottomCard';
import MonthDetailCalendar from '../components/MonthDetailCalendar';

// Static functions
const handleTouchableWithoutFeedback = () => {
	Keyboard.dismiss();
};

const returnFaceColorHex = (colorInt) => {
	// color are 0-4 changed to hex string; -1 will return no data and hide face
	let startingFaceColor = "";
	switch (colorInt) {
		case 0:
			startingFaceColor = Tools.color1;
			break;
		case 1:
			startingFaceColor = Tools.color2;
			break;
		case 2:
			startingFaceColor = Tools.color3;
			break;
		case 3:
			startingFaceColor = Tools.color4;
			break;
		case 4:
			startingFaceColor = Tools.color5;
			break;
		default: break;
	};
	return startingFaceColor;
};

// ==================== Component ====================
const MonthDetailScreen = props => {

	// Nav params
	const yearInt = props.navigation.getParam("yearInt");
	const monthNo = props.navigation.getParam("monthNo");

	// Redux
	const data = useSelector(state => state.dataReducer.data);

	// Data variables
	const startingMessage = data.months[monthNo].days[0].message;
	const startingFaceColor = data.months[monthNo].days[0].color - 1;
	const startingFirstDayOfWeek = data.months[monthNo].firstDayOfWeek;

	// State
	const [dayToFind, setDayToFind] = useState(1);
	const [dayOfTheWeek, setDayOfTheWeek] = useState(startingFirstDayOfWeek);
	const [monthToFind, setMonthToFind] = useState(monthNo);
	const [yearToFind, setYearToFind] = useState(yearInt);
	const [faceColor, setFaceColor] = useState(returnFaceColorHex(startingFaceColor));
	const [colorNumber, setColorNumber] = useState(startingFaceColor);
	const [message, setMessage] = useState(startingMessage);

	// Change month data
	const monthDetailScreenHandleDay = (dayNo, dayOfTheWeek, currentMonth, currentYear, newFaceColor, colorNumber, message) => {
		setDayToFind(dayNo);
		setDayOfTheWeek(dayOfTheWeek);
		setMonthToFind(currentMonth);
		setYearToFind(currentYear);
		setFaceColor(newFaceColor);
		setColorNumber(colorNumber - 1);
		setMessage(message);
	};

	// Handle change month
	const handleMonthSwitch = (newMonthNo) => {
		const newMonthData = data.months[newMonthNo];
		setDayToFind(1);
		setMonthToFind(newMonthNo);
		setDayOfTheWeek(newMonthData.firstDayOfWeek);
		setFaceColor(returnFaceColorHex(newMonthData.days[0].color - 1));
		setColorNumber(newMonthData.days[0].color - 1);
		setMessage(newMonthData.days[0].message);
	};

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>

				{/* Header */}
				<AppHeader
					navigation={props.navigation}
					backButton={true}
					isSettings={false}
				/>

				{/* Inner screen */}
				<View style={styles.innerScreen}>

					{/* Calendar */}
					<MonthDetailCalendar
						yearInt={yearToFind}
						monthNo={monthToFind}
						switchMonths={handleMonthSwitch}
						detailScreenFindDay={monthDetailScreenHandleDay}
					/>

					{/* Bottom card */}
					<MonthDetailBottomCard
						yearInt={yearToFind}
						monthNo={monthToFind}
						dayNo={dayToFind}
						dayOfWeek={dayOfTheWeek}
						faceColor={faceColor}
						colorNumber={colorNumber}
						message={message}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

// ==================== Styles ====================
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