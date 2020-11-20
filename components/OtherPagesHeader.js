// React
import React, { useEffect, useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Image,
	Text,
	TouchableOpacity
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useDispatch } from "react-redux";
import { setHeaderHeight, updateData, loadActiveYears, findYears, loadYearsArray } from "../store/actions/actions";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Constants
import Tools from '../constants/Tools';

// Redux
import { useSelector } from "react-redux";


// ==================== Component
const OtherPagesHeader = props => {

	const dispatch = useDispatch();

	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	};

	// const data = useSelector(state => state.dataReducer.data);
	// const years = useSelector(state => state.dataReducer.years);
	// const yearsLoaded = useSelector(state => state.dataReducer.yearsLoaded);
	// const uid = useSelector(state => state.authReducer.userId);

	// const placeholder = () => {
	// 	props.navigation.navigate("Settings");
	// };

	// const HeaderImage = () => {
	// 	if (props.backButton) {
	// 		return (
	// 			<View style={styles.svgContainer}>
	// 				<Svg style={{ 
	// 					transform: [{ rotateZ: "180deg" }],
	// 					shadowColor: '#000',
	// 					shadowOffset: { width: 0, height: -3 },
	// 					shadowRadius: 2,
	// 					shadowOpacity: 1, }} 
	// 					width={14} 
	// 					height={16} 
	// 					viewBox="0 0 14 16">
	// 					<Path fill={Tools.color3} d={Tools.arrowPath} />
	// 				</Svg>
	// 			</View>
	// 		);
	// 	} else {
	// 		return (
	// 			<Image 
	// 				style={styles.logoImage}
	// 				source={require("../assets/images/sober-logo.png")}
	// 				/>
	// 		);
	// 	}
	// };

	return (
		<View style={styles.header} onLayout={findHeaderHeight}>
			{/* Logo */}
			<View style={styles.leftGroup}>
				<TouchableOpacity 
					activeOpacity={Tools.activeOpacity} 
					style={{padding: Tools.paddingNormal}} 
					onPress={() => {props.navigation.goBack()}}>

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
							<Path fill={Tools.color3} d={Tools.arrowPath} />
						</Svg>
					</View>
				</TouchableOpacity>
			</View>

			{/* Text */}
			<View style={styles.settingsTextContainer}>
				<Text style={styles.yearText}>
					{props.title}
				</Text>
			</View>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	header: {
		height: 65,
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
	settingsTextContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: Tools.paddingNormal,
		paddingHorizontal: Tools.paddingLarge,
	},

	svgContainer: {
		paddingHorizontal: 12, 
		height: 20, 
		justifyContent: "center",
		alignItems: "center",
	},

	leftGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	yearText: {
		color: Tools.color5,
		fontSize: 24,
		fontWeight: "500",
		paddingLeft: Tools.paddingHalf,
	}
});

export default OtherPagesHeader;