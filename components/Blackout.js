// React
import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	Dimensions,
	Animated,
	View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useSelector } from "react-redux";

// Tools
import Tools from '../constants/Tools';

// Vars
const windowHeight = Dimensions.get('window').height;

// Arrow
// const arrowPath = "M 0 14.4 V 1.6 c 0 -1.2 1.3 -1.9 2.3 -1.4 l 10.9 6.3 c 1.1 0.6 1.1 2.3 0 2.9 L 2.3 15.8 C 1.3 16.4 0 15.6 0 14.4 Z";



// ==================== Component
const Blackout = props => {

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
					<Svg style={{ 
						transform: [{ rotateZ: "90deg" }], 
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 3,
						},
						shadowOpacity: 1,
						shadowRadius: 3.5, }}
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
		paddingTop: "4%",
	}
});

export default Blackout;