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

// Static functions
const handleTouchableWithoutFeedback = () => {
	Keyboard.dismiss();
};

// ==================== Component ====================
const HomeScreen = props => {
	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<View style={styles.screen}>

				{/* Header */}
				<AppHeader
					navigation={props.navigation}
					backButton={false}
					isSettings={false}
				/>

				{/* Inner screen */}
				<View style={styles.innerScreen}>
					{/* Calendar */}
					<HomeScreenCalendar navigation={props.navigation} />

					{/* Darkens background when textbox opens */}
					<Blackout />

					{/* Bottom card */}
					<HomeScreenBottomCard navigation={props.navigation} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},
	innerScreen: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		position: "relative",
	}
});

export default HomeScreen;