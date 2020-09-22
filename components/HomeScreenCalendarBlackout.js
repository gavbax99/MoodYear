// React
import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	Dimensions,
	Animated,
	Text,
	View,
} from 'react-native';

// Redux
import { useSelector } from "react-redux";

// Vars
const windowHeight = Dimensions.get('window').height;


// ==================== Component
const HomeScreenCalendarBlackout = props => {

	const [dynamicDisplay, setDynamicDisplay] = useState(false);

	// Keyboard open constant
	const keyboardOpen = useSelector(state => state.keyboardReducer.keyboardReducerState);

	// ANIMATION
	const fadeAnim = React.useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start();
	};

	useEffect(() => {
		let timer;
		if (keyboardOpen) {
			setDynamicDisplay(true)
		} else {
			timer = setTimeout(() => {setDynamicDisplay(false)}, 300);
		}
		return () => clearTimeout(timer);
	}, [keyboardOpen]);



	// Fade the blackout
	keyboardOpen ? fadeIn() : fadeOut();
	
	if (dynamicDisplay) {
		return (
			<Animated.View style={{
				...styles.blackout,
				opacity: fadeAnim,
				}}>
					<Text style={{color: "#fff", paddingTop: 20}}>hi</Text>
			</Animated.View>
		);
	} else {
		return (
			<View style={{ height: 0, width: 0 }}></View>
		);
	}
}

// ==================== Styles
const styles = StyleSheet.create({
	blackout: {
		width: "100%",
		height: windowHeight,
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: "rgba(16, 16, 16, 0.7)",
	}
});

export default HomeScreenCalendarBlackout;