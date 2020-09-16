// React
import React from 'react';
import { 
	StyleSheet, 
	View,
	Text,
	TouchableOpacity 
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";

// Components
import HomeScreenDay from '../components/HomeScreenDay';


// ==================== Component
const ComponentName = props => {

	const date = new Date();
	const getMonth = date.getMonth() + 1;
	const getDay = date.getDate();

	return (
		<TouchableOpacity  style={styles.month} onPress={() => {console.log("works")}}>

			{/* Render our days */}
			{props.data.map((monthObj, i) => {

				switch (monthObj.color) {
					case 0:
						monthObj.color = Tools.color0;
						break;
					case 1:
						monthObj.color = Tools.color1;
						break;
					case 2:
						monthObj.color = Tools.color2;
						break;
					case 3:
						monthObj.color = Tools.color3;
						break;
					case 4:
						monthObj.color = Tools.color4;
						break;
					case 5:
						monthObj.color = Tools.color5;
						break;
					case 6:
						monthObj.color = Tools.color6;
						break;
					case 7:
						monthObj.color = Tools.color7;
						break;
					default: break;
				}

				const isCurrentMonth = getMonth === monthObj.monthNo ? true : false;

				return (
					<HomeScreenDay 
						color={monthObj.color}
						dayNo={monthObj.dayNo}
						currentDay={getDay}
						isCurrentMonth={isCurrentMonth}
						key={monthObj.id} 
						/>
				);
			})}

			<Text style={styles.monthName}>
				{props.monthName.slice(0, 3).toUpperCase()}
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
		paddingRight: "1.75%",
		paddingTop: 1,
		color: Tools.colorTextboxGrey,
		fontSize: 10,
		marginLeft: "auto",
	}
});

export default ComponentName;