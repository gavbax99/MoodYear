// React
import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Constants
import Tools from '../constants/Tools';

// Redux
import { useSelector } from "react-redux";

// Components
import MonthDetailDay from "../components/MonthDetailDay";

// ==================== Component
const MonthDetailCalendar = props => {

	const [currentMonth, setCurrentMonth] = useState(props.monthNo);
	const [currentYear, setCurrentYear] = useState(props.yearInt);

	// Data
	const data = useSelector(state => state.dataReducer.data);
	const monthData = data.months[currentMonth];

	// Time
	const date = new Date();
	const getMonth = date.getMonth() + 1;
	const getDay = date.getDate();
	const isCurrentMonth = getMonth === monthData.monthNo ? true : false;
	const monthList = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const prevMonth = () => {
		if (currentMonth === 0) return;
		setCurrentMonth(currentMonth - 1);
	};

	const nextMonth = () => {
		if (currentMonth === 11) return;
		setCurrentMonth(currentMonth + 1);
	};

	useEffect(() => {
		props.switchMonths(currentMonth);
	}, [currentMonth])

	const monthDetailFindDay = (dayNo, dayOfTheWeek, faceColor, colorNumber, message) => {
		props.detailScreenFindDay(dayNo, dayOfTheWeek, currentMonth, currentYear, faceColor, colorNumber, message);
	};

	return (
		<View style={styles.calendar}>

			{/* Title row */}
			<View style={styles.titleRow}>
				{/* PREV MONTH BUTTON */}
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity}
					onPress={prevMonth}
					style={{ padding: 12 }}>
						<Svg style={{ 
							opacity: (currentMonth === 0) ? 0 : 1,
							transform: [{ rotateZ: "180deg" }], 
							shadowColor: '#000',
							shadowOffset: { width: 0, height: -3 },
							shadowRadius: 2,
							shadowOpacity: 1, }} 
							width={14} 
							height={16} 
							viewBox="0 0 14 16">
							<Path fill="white" d={Tools.arrowPath} />
						</Svg>
				</TouchableOpacity>

				<View style={styles.titleRow_textGroup}>
					<Text style={styles.titleRow_textLarge}>{monthList[currentMonth]}</Text>
					<Text style={styles.titleRow_textSmall}>{currentYear}</Text>
				</View>

				{/* NEXT MONTH BUTTON */}
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity}
					onPress={nextMonth}
					style={{ marginLeft: "auto", padding: 12 }}>
						<Svg style={{ 
							opacity: (currentMonth === 11) ? 0 : 1,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 3 },
							shadowRadius: 2,
							shadowOpacity: 1, }}
							width={14} 
							height={16} 
							viewBox="0 0 14 16">
							<Path fill="white" d={Tools.arrowPath} />
						</Svg>
				</TouchableOpacity>
			</View>

			{/* Week title header */}
			<View style={{ ...styles.calendarDays, marginTop: Tools.paddingNormal }}>
				<Text style={styles.dayLetter}>S</Text>
				<Text style={styles.dayLetter}>M</Text>
				<Text style={styles.dayLetter}>T</Text>
				<Text style={styles.dayLetter}>W</Text>
				<Text style={styles.dayLetter}>T</Text>
				<Text style={styles.dayLetter}>F</Text>
				<Text style={styles.dayLetter}>S</Text>
			</View>
			
			{/* List of days */}
			<View style={{ ...styles.calendarDays, marginTop: Tools.paddingHalf }}>
				{/* Render our days */}
				{monthData.days.map((dayObj, i) => {

					let color = "";
					switch (dayObj.color) {
						case 0:
							color = Tools.color0;
							break;
						case 1:
							color = Tools.color1;
							break;
						case 2:
							color = Tools.color2;
							break;
						case 3:
							color = Tools.color3;
							break;
						case 4:
							color = Tools.color4;
							break;
						case 5:
							color = Tools.color5;
							break;
						default: break;
					}

					return (
						<MonthDetailDay 
							isFirstDay={i===0}
							firstDayNo={monthData.firstDayOfWeekNo}
							color={color} 
							colorNumber={dayObj.color}
							message={dayObj.message}
							currentDay={getDay}
							dayOfTheMonth={dayObj.dayNo}
							dayOfTheWeek={dayObj.dayOfWeek}
							isCurrentMonth={isCurrentMonth}
							key={dayObj.id}
							pressEvent={monthDetailFindDay} />
					);
				})}
			</View>
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
		paddingHorizontal: Tools.paddingHalf,
		paddingVertical: Tools.paddingNormal,
	},
	titleRow: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: Tools.paddingHalf,
	},
	titleButtonText: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		fontSize: 28,
		color: "#fff",
	},
	titleRow_textGroup: {
		marginLeft: Tools.paddingNormal,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	titleRow_textLarge: {
		color: "#fff",
		fontSize: 28,
		fontWeight: "500"
	},
	titleRow_textSmall: {
		color: "#fff",
		fontSize: 28,
		fontWeight: "100"
	},
	calendarDays: {
		width: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	dayLetter: {
		textAlign: "center",
		width: "14.25%",
		color: Tools.colorTextboxGrey,
	},
});

export default MonthDetailCalendar;