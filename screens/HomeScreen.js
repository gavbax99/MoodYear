// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	TouchableWithoutFeedback, 
	Keyboard,
	StatusBar 
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import HomeScreenCalendar from '../components/HomeScreenCalendar';
import HomeScreenBottomCard from '../components/HomeScreenBottomCard';
import HomeScreenCalendarBlackout from '../components/HomeScreenCalendarBlackout';


// ==================== Functional component 
const HomeScreen = props => {

	console.log("HomeScreen render");

	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>
				{/* <View style={{ height: 20, backgroundColor: "#161616"}}>
					<StatusBar 
						translucent 
						backgroundColor={"#161616"} 
						barStyle={"dark-content"}
						/>
				</View> */}

				{/* Header */}
				<AppHeader />


				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<HomeScreenCalendar />
					<HomeScreenCalendarBlackout />

					{/* Bottom card */}
					<HomeScreenBottomCard />
				</View>

			</View>
		</TouchableWithoutFeedback>
	);
};


// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "space-between",
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

export default HomeScreen;