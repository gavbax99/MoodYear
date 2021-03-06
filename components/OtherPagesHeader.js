// React
import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useDispatch } from "react-redux";
import { setHeaderHeight } from "../store/actions/uiActions";

// Constants
import Tools from '../constants/Tools';

// ==================== Component ====================
const OtherPagesHeader = props => {

	// Redux
	const dispatch = useDispatch();

	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	};

	return (
		<SafeAreaView style={styles.safeAreaView} onLayout={findHeaderHeight}>
			<View style={styles.header}>

				{/* Logo */}
				<View style={styles.leftGroup}>
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={{ padding: Tools.paddingNormal }}
						onPress={() => { props.navigation.goBack() }}>

						<View style={styles.svgContainer}>
							<Svg style={{
									transform: [{ rotateZ: "180deg" }],
									shadowColor: '#000',
									shadowOffset: { width: 0, height: -3 },
									shadowRadius: 2,
									shadowOpacity: 1,
								}}
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
		</SafeAreaView>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	safeAreaView: {
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		zIndex: 999,
	},
	header: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		paddingTop: Tools.paddingNormal
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
		paddingHorizontal: Tools.paddingLarge,
		paddingBottom: Tools.paddingNormal,
	},
	svgContainer: {
		paddingHorizontal: 12,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	leftGroup: {
		paddingBottom: Tools.paddingNormal,
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