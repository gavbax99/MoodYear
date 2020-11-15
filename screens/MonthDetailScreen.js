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

	const startingMessage = data.months[monthNo].days[0].message;
	const startingFaceColor = data.months[monthNo].days[0].color-1;

	// color are 0-4; -1 will return no data and hide face
	const returnColor = (colorInt) => {
		let startingSliderColor = "";
		switch (colorInt) {
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
		return startingSliderColor;
	};
	
	const [dayToFind, setDayToFind] = useState(1);
	const [dayOfTheWeek, setDayOfTheWeek] = useState(data.months[monthNo].firstDayOfWeek);
	const [monthToFind, setMonthToFind] = useState(monthNo);
	const [yearToFind, setYearToFind] = useState(yearInt);
	const [faceColor, setFaceColor] = useState(returnColor(startingFaceColor));
	const [colorNumber, setColorNumber] = useState(startingFaceColor);
	const [message, setMessage] = useState(startingMessage);

	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	const monthDetailScreenHandleDay = (dayNo, dayOfTheWeek, currentMonth, currentYear, newFaceColor, colorNumber, message) => {
		setDayToFind(dayNo);
		setDayOfTheWeek(dayOfTheWeek);
		setMonthToFind(currentMonth);
		setYearToFind(currentYear);
		setFaceColor(newFaceColor);
		setColorNumber(colorNumber-1);
		setMessage(message);
	}

	const handleMonthSwitch = (newMonthNo) => {
		const newMonthData = data.months[newMonthNo];
		setDayToFind(1);
		setMonthToFind(newMonthNo);
		setDayOfTheWeek(newMonthData.firstDayOfWeek);
		setFaceColor(returnColor(newMonthData.days[0].color-1));
		setColorNumber(newMonthData.days[0].color-1);
		setMessage(newMonthData.days[0].message);
	}

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>
				{/* Header */}
				<AppHeader navigation={props.navigation} backButton={true} isSettings={false} />

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<MonthDetailCalendar 
						yearInt={yearToFind} 
						monthNo={monthToFind} 
						switchMonths={handleMonthSwitch}
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
						message={message}
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