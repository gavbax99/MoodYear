// React
import React from 'react';
import { 
	StyleSheet, 
	TouchableOpacity,
	Text, 
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenDay from '../components/HomeScreenDay';


// ==================== Component
const ComponentName = props => {

	const date = new Date();
	const getMonth = date.getMonth() + 1;
	const getDay = date.getDate();

	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];

	const isCurrentMonth = getMonth === props.monthObj.monthNo ? true : false;

	const goToMonth = () => {
		props.navigation.navigate({
			routeName: "MonthDetail",
			params: {
				yearInt: props.year,
				monthNo: props.monthObj.monthNo-1,
			}
		});
	};

	return (
		<TouchableOpacity activeOpacity={Tools.activeOpacity} style={styles.month} onPress={goToMonth}>

			{/* Render our days */}
			{props.monthObj.days.map((dayObj, i) => {

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
					<HomeScreenDay 
						isFirstDay={i===0}
						firstDayNo={props.monthObj.firstDayOfWeekNo}
						color={color}
						dayNo={dayObj.dayNo}
						currentDay={getDay}
						isCurrentMonth={isCurrentMonth}
						key={dayObj.id} 
						/>
				);
			})}

			<Text style={{
				...styles.monthName,
				bottom:  props.monthObj.firstDayOfWeekNo < 3 ? "1.55%" : null,
				right:  props.monthObj.firstDayOfWeekNo < 3 ? "8%" : null,

				top: props.monthObj.firstDayOfWeekNo >= 3 ? "1.55%" : null,
				left: props.monthObj.firstDayOfWeekNo >= 3 ? "8%" : null,
				}}>
				{props.monthObj.name.slice(0, 3).toUpperCase()}
			</Text>

		</TouchableOpacity >
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	month: {
		position: "relative",
		padding: Tools.paddingHalf,
		width: "33.33%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		flexWrap: "wrap",
	},
	monthName: {
		position: "absolute",
		color: Tools.colorTextboxGrey,
		fontSize: 10,

		// paddingTop: 1,
		// paddingRight: "1.75%",
		// marginLeft: "auto",
	}
});

export default ComponentName;