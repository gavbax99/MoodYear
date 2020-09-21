// React
import React from 'react';
import { 
	StyleSheet, 
	View,
	Dimensions,
	Animated
} from 'react-native';

// Redux
import { useSelector } from "react-redux";

// Vars
const windowHeight = Dimensions.get('window').height;


// ==================== Component
const HomeScreenCalendarBlackout = props => {

	// fadeAnim will be used as the value for opacity. Initial Value: 0
	const fadeAnim = React.useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		console.log("fadeIn")
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start();
	};

	const fadeOut = () => {
		console.log("fadeOut")
		// Will change fadeAnim value to 0 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true
		}).start();
	};

	// Keyboard open constant
	const keyboardOpen = useSelector(state => state.keyboardReducer.keyboardReducerState);

	// Fade the blackout
	keyboardOpen ? fadeIn() : fadeOut();
	
	return (
		<View style={{
			...styles.screen, 
			height: keyboardOpen ? windowHeight : 0
			}}>
			<Animated.View style={{
				...styles.blackout,
				opacity: fadeAnim
				}} />
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		width: "100%",
	},
	blackout: {
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "rgba(16, 16, 16, 0.7)",
	}
});

export default HomeScreenCalendarBlackout;