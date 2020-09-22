// React
import React from 'react';
import { 
	StyleSheet, 
	TouchableOpacity 
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

	const goToMonth = () => {
		props.navigation.navigate({
			routeName: "MonthDetail",
			// params: {
			// 	mealId: itemData.item.id,
			// 	mealTitle: itemData.item.title,
			// 	isFav: isFavorite
			// }
		});
	};

	return (
		<TouchableOpacity  style={styles.month} onPress={goToMonth}>

			{/* Render our days */}
			{props.monthObj.days.map((dayObj, i) => {

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

				const isCurrentMonth = getMonth === dayObj.monthNo ? true : false;

				return (
					<HomeScreenDay 
						color={dayObj.color}
						dayNo={dayObj.dayNo}
						currentDay={getDay}
						isCurrentMonth={isCurrentMonth}
						key={dayObj.id} 
						/>
				);
			})}

			{/* <Text style={styles.monthName}>
				{props.monthName.slice(0, 3).toUpperCase()}
			</Text> */}

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
		paddingRight: "1.75%",
		paddingTop: 1,
		color: Tools.colorTextboxGrey,
		fontSize: 10,
		marginLeft: "auto",
	}
});

export default ComponentName;