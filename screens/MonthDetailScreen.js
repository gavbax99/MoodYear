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

// Data
import Year2020 from "../data/Year2020";

// Redux
import { useSelector } from "react-redux";


// ==================== Component
const MonthDetailScreen = props => {

	const yearInt = props.navigation.getParam("yearInt");
	const monthNo = props.navigation.getParam("monthNo");

	const data = useSelector(state => state.dataReducer.data);

	// const date = new Date();
	// const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	// const day = daysOfWeek[date.getDay()];

	// const [yearInt, xx] = useState(props.navigation.getParam("yearInt"));
	// const [monthNo, xxx] = useState(props.navigation.getParam("monthNo"));
	
	const [dayToFind, setDayToFind] = useState(1);
	const [dayOfTheWeek, setDayOfTheWeek] = useState(data.months[props.navigation.getParam("monthNo")].firstDayOfWeek);
	const [monthToFind, setMonthToFind] = useState(props.navigation.getParam("monthNo"));
	const [yearToFind, setYearToFind] = useState(props.navigation.getParam("yearInt"));

	// const [dayToFind, setDayToFind] = useState(0);
	// const [monthToFind, setMonthToFind] = useState(0);
	// const [yearToFind, setYearToFind] = useState(2020);


	// const dayOfWeekOffset = daysOfWeek.indexOf(data.months[monthToFind].firstDayOfWeek);
	// const dayModulo = (0 - dayOfWeekOffset) + (dayToFind % 7);
	// const trueDayOfWeek = dayModulo >= 0 ? daysOfWeek[dayModulo] : data.months[monthToFind].firstDayOfWeek;


	// const date = new Date();
	// const yearNumber = date.getFullYear();
	// const monthNumber = date.getMonth();
	// const dayNumber = date.getDate();
	// const day = daysOfWeek[date.getDay()];
	// const dayDate = ((monthNumber + 1) + '/' + dayNumber + '/' + yearNumber);


	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	// const monthData = Year2020.months[monthNo-1];

	const monthDetailScreenHandleDay = (dayNo, dayOfTheWeek, currentMonth, currentYear) => {
		setDayToFind(dayNo);
		setDayOfTheWeek(dayOfTheWeek);
		setMonthToFind(currentMonth);
		setYearToFind(currentYear);
	}

	useEffect(() => {
		console.log("monthdetailscreen MAIN INFO: ", dayToFind, dayOfTheWeek, monthToFind, yearToFind)
		//               for correct number format:    good         good          +1         good
		//               for correct array format:     -1           NA            good       good
	});

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