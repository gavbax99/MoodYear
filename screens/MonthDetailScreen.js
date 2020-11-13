// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableWithoutFeedback,
	Keyboard 
} from 'react-native';

// Components
import AppHeader from '../components/AppHeader';
import HomeScreenBottomCard from '../components/HomeScreenBottomCard';
import MonthDetailCalendar from '../components/MonthDetailCalendar';
import Blackout from '../components/Blackout';

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";


// ==================== Component
const MonthDetailScreen = props => {

	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	const yearInt = props.navigation.getParam("yearInt");
	const monthNo = props.navigation.getParam("monthNo");

	// const monthData = Year2020.months[monthNo-1];

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>
				{/* Header */}
				<AppHeader navigation={props.navigation} backButton={true} />

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<MonthDetailCalendar 
						yearInt={yearInt} 
						monthNo={monthNo} 
						/>
					<Blackout />

					{/* Bottom card */}
					<HomeScreenBottomCard />
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