// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	TouchableWithoutFeedback, 
	Keyboard,
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import AppHeader from '../components/AppHeader';
import HomeScreenCalendar from '../components/HomeScreenCalendar';
import HomeScreenBottomCard from '../components/HomeScreenBottomCard';
import Blackout from '../components/Blackout';


// ==================== Functional component 
const HomeScreen = props => {

	// console.log("HomeScreen render");

	const handleTouchableWithoutFeedback = () => {
		Keyboard.dismiss();
	}

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>
				{/* Header */}
				<AppHeader navigation={props.navigation} backButton={false} />


				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<HomeScreenCalendar navigation={props.navigation} />
					<Blackout />

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

export default HomeScreen;