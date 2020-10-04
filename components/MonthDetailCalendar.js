// React
import React, { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";

// Components
import MonthDetailDay from "../components/MonthDetailDay";

// Arrow
const arrowPath = "M 0 14.4 V 1.6 c 0 -1.2 1.3 -1.9 2.3 -1.4 l 10.9 6.3 c 1.1 0.6 1.1 2.3 0 2.9 L 2.3 15.8 C 1.3 16.4 0 15.6 0 14.4 Z";


// ==================== Component
const MonthDetailCalendar = props => {

	const [currentMonth, setCurrentMonth] = useState(props.monthNo);
	const [currentYear, setCurrentYear] = useState(props.yearInt);

	// Data
	const monthData = Year2020.months[currentMonth];

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
		// Cant go before 2020
		if (currentYear === 2020 && currentMonth === 0) return;

		if (currentMonth === 0) {
			// If January change year too
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const nextMonth = () => {
		// Cant go past 2020
		if (currentYear === 2020 && currentMonth === 11) return;

		if (currentMonth === 11) {
			// If December change year too
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
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
							opacity: (currentYear === 2020 && currentMonth === 0) ? 0.3 : 1,
							transform: [{ rotateZ: "180deg" }], 
							shadowColor: '#000',
							shadowOffset: { width: 0, height: -3 },
							shadowRadius: 2,
							shadowOpacity: 1, }} 
							width={14} 
							height={16} 
							viewBox="0 0 14 16">
							<Path fill="white" d={arrowPath} />
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
							opacity: (currentYear === 2020 && currentMonth === 11) ? 0.3 : 1,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 3 },
							shadowRadius: 2,
							shadowOpacity: 1, }}
							width={14} 
							height={16} 
							viewBox="0 0 14 16">
							<Path fill="white" d={arrowPath} />
						</Svg>
				</TouchableOpacity>
			</View>

			{/* Week title header */}
			<View style={{...styles.calendarDays, marginTop: Tools.paddingNormal }}>
				<Text style={styles.dayLetter}>S</Text>
				<Text style={styles.dayLetter}>M</Text>
				<Text style={styles.dayLetter}>T</Text>
				<Text style={styles.dayLetter}>W</Text>
				<Text style={styles.dayLetter}>T</Text>
				<Text style={styles.dayLetter}>F</Text>
				<Text style={styles.dayLetter}>S</Text>
			</View>
			
			{/* List of days */}
			<View style={{...styles.calendarDays, marginTop: Tools.paddingHalf }}>
				{/* Render our days */}
				{monthData.days.map((dayObj, i) => {

					
					switch (dayObj.color) {
						case 0:
							dayObj.color = Tools.color0;
							break;
						case 1:
							dayObj.color = Tools.color1;
							break;
						case 2:
							dayObj.color = Tools.color2;
							break;
						case 3:
							dayObj.color = Tools.color3;
							break;
						case 4:
							dayObj.color = Tools.color4;
							break;
						case 5:
							dayObj.color = Tools.color5;
							break;
						case 6:
							dayObj.color = Tools.color6;
							break;
						case 7:
							dayObj.color = Tools.color7;
							break;
						default: break;
					}

					return (
						<MonthDetailDay 
							isFirstDay={i===0}
							firstDayNo={monthData.firstDayOfWeekNo}
							dayObj={dayObj}
							color={dayObj.color} 
							currentDay={getDay}
							dayOfTheMonth={dayObj.dayNo}
							isCurrentMonth={isCurrentMonth}
							key={dayObj.id} />
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