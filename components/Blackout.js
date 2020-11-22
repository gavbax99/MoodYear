// React
import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	Dimensions,
	Animated,
	View,
	Keyboard
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useSelector } from "react-redux";

// Tools
import Tools from '../constants/Tools';

// Vars
const windowHeight = Dimensions.get('window').height;

// ==================== Component ====================
const Blackout = props => {

	// Redux
	const keyboardOpen = useSelector(state => state.keyboardReducer.keyboardReducerState);

	// State
	const [dynamicDisplay, setDynamicDisplay] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	// Set height of blackout
	const handleSetKeyboardHeight = (e) => {
		setKeyboardHeight(e.endCoordinates.height);
		Keyboard.removeListener('keyboardDidShow', handleSetKeyboardHeight);
	};

	// Animation
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

	// Fade the blackout depending on keyboard state
	keyboardOpen ? fadeIn() : fadeOut();

	// Use effect
	useEffect(() => {
		let timer;
		if (keyboardOpen) {
			setDynamicDisplay(true)
		} else {
			timer = setTimeout(() => {setDynamicDisplay(false)}, 300);
		}

		// Cleanup
		return () => clearTimeout(timer);
	}, [keyboardOpen]);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', handleSetKeyboardHeight);
	}, [useEffect]);
	
	// Return blackout or nothing
	if (dynamicDisplay) {
		return (
			<Animated.View style={{
					...styles.blackout,
					opacity: fadeAnim,
					height: windowHeight - keyboardHeight - 65, // is 65 gonna fuck me? who knows!
				}}>
					<Svg style={{ 
							transform: [{ rotateZ: "90deg" }], 
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 3,
							},
							shadowOpacity: 1,
							shadowRadius: 3.5, 
						}}
						width={14} 
						height={16} 
						viewBox="0 0 14 16">
						<Path fill="white" d={Tools.arrowPath} />
					</Svg>
			</Animated.View>
		);
	} else {
		return (
			<View style={{ height: 0, width: 0 }}></View>
		);
	}
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	blackout: {
		width: "100%",
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: "rgba(16, 16, 16, 0.7)",
		paddingTop: Tools.paddingDouble,
	}
});

export default Blackout;