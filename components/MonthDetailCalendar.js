// React
import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useSelector } from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Components
import MonthDetailDay from "../components/MonthDetailDay";

// Static vars
const date = new Date();
const getMonth = date.getMonth() + 1;
const getDay = date.getDate();
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

// Static functions
const returnFaceColorHex = (colorInt) => {
	let color = "";
	switch (colorInt) {
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
	return color;
};

// ==================== Component ====================
const MonthDetailCalendar = props => {

	// Redux
	const [currentMonth, setCurrentMonth] = useState(props.monthNo);
	const [currentYear, setCurrentYear] = useState(props.yearInt);
	const [isCurrentMonth, setIsCurrentMonth] = useState(false);
	const [monthData, setMonthData] = useState(null);

	// Data
	const data = useSelector(state => state.dataReducer.data);

	const prevMonth = () => {
		if (currentMonth === 0) return;
		setCurrentMonth(currentMonth - 1);
	};

	const nextMonth = () => {
		if (currentMonth === 11) return;
		setCurrentMonth(currentMonth + 1);
	};

	const monthDetailFindDay = (dayNo, dayOfTheWeek, faceColor, colorNumber, message) => {
		props.detailScreenFindDay(dayNo, dayOfTheWeek, currentMonth, currentYear, faceColor, colorNumber, message);
	};

	// On load and data switch
	useEffect(() => {
		if (Object.keys(data).length === 0) return;

		setMonthData(data.months[currentMonth]);
		setIsCurrentMonth(getMonth === data.months[currentMonth].monthNo ? true : false);
	}, [data]);

	// For switching month number
	useEffect(() => {
		if (Object.keys(data).length === 0) return;
		
		props.switchMonths(currentMonth);
		setMonthData(data.months[currentMonth]);
		setIsCurrentMonth(getMonth === data.months[currentMonth].monthNo ? true : false);
	}, [currentMonth]);

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
								shadowOpacity: 1, 
							}} 
							width={14} 
							height={16} 
							viewBox="0 0 14 16">
							<Path fill="white" d={Tools.arrowPath} />
						</Svg>
				</TouchableOpacity>

				{/* Title */}
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
								shadowOpacity: 1, 
							}}
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
				{monthData !== null ?
					monthData.days.map((dayObj, i) => {
						return (
							<MonthDetailDay 
								isFirstDay={i===0}
								firstDayNo={monthData.firstDayOfWeekNo}
								color={returnFaceColorHex(dayObj.color)} 
								colorNumber={dayObj.color}
								message={dayObj.message}
								currentDay={getDay}
								dayOfTheMonth={dayObj.dayNo}
								dayOfTheWeek={dayObj.dayOfWeek}
								isCurrentMonth={isCurrentMonth}
								key={dayObj.id}
								pressEvent={monthDetailFindDay} 
							/>
						);
					})
					:
					null
				}
			</View>
		</View>
	);
};

// ==================== Styles ====================
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