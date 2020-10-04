// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Image,
	TouchableOpacity
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useDispatch } from "react-redux";
import { setHeaderHeight } from "../store/actions/actions";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Constants
import Tools from '../constants/Tools';

// Arrow
const arrowPath = "M 0 14.4 V 1.6 c 0 -1.2 1.3 -1.9 2.3 -1.4 l 10.9 6.3 c 1.1 0.6 1.1 2.3 0 2.9 L 2.3 15.8 C 1.3 16.4 0 15.6 0 14.4 Z";


// ==================== Component
const AppHeader = props => {

	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	}

	const dispatch = useDispatch();

	const HeaderImage = () => {
		if (props.backButton) {
			return (
				<View style={styles.svgContainer}>
					<Svg style={{ 
						transform: [{ rotateZ: "180deg" }],
						shadowColor: '#000',
						shadowOffset: { width: 0, height: -3 },
						shadowRadius: 2,
						shadowOpacity: 1, }} 
						width={14} 
						height={16} 
						viewBox="0 0 14 16">
						<Path fill={Tools.color3} d={arrowPath} />
					</Svg>
				</View>
			);
		} else {
			return (
				<Image 
					style={styles.logoImage}
					source={require("../assets/images/sober-logo.png")}
					/>
			);
		}
	}

	return (
		<View style={styles.header} onLayout={findHeaderHeight}>
			{/* Logo */}
			<TouchableOpacity activeOpacity={Tools.activeOpacity} style={{padding: Tools.paddingNormal}} onPress={() => {props.navigation.goBack()}}>
				<HeaderImage />
			</TouchableOpacity>

			{/* Text */}
			<View style={styles.textContainer}>
				<Ionicons style={{paddingHorizontal: 6}}name="ios-more" size={24} color="#ffffff" />
			</View>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	header: {
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
	},
	logoImage: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
	headerText: {
		color: Tools.colorLight,
		fontSize: 18,
		fontWeight: "600",
	},
	textContainer: {
		padding: Tools.paddingNormal,
		flexDirection: "row",
	},

	svgContainer: {
		paddingHorizontal: 12, 
		height: 20, 
		justifyContent: "center",
		alignItems: "center",
	}
});

export default AppHeader;