// React
import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	SafeAreaView
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { 
	setHeaderHeight, 
	updateData, 
	loadActiveYears, 
	findYears, 
	loadYearsArray, 
	addEmptyYear 
} from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020Populated";
import Year2021 from "../data/Year2021Blank";
import Year2020Blank from "../data/Year2020Blank";

// ==================== Component ====================
const AppHeader = props => {

	// Redux
	const dispatch = useDispatch();
	const data = useSelector(state => state.dataReducer.data);
	const years = useSelector(state => state.dataReducer.years);
	const yearsLoaded = useSelector(state => state.dataReducer.yearsLoaded);

	const uid = useSelector(state => state.authReducer.userId);
	const token = useSelector(state => state.authReducer.token);
	const email = useSelector(state => state.authReducer.email);
	const registeredDate = useSelector(state => state.authReducer.registeredDate);

	// Find header height on load
	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	};

	// Temporary; will be inline after the dev use is gone
	const handleSettingsChange = () => {
		// dispatch(updateData("ip6v6kUBvShVaxOnJPmePBjuVsy1", "2021", Year2021));
		// dispatch(loadActiveYears("ip6v6kUBvShVaxOnJPmePBjuVsy1"));
		// dispatch(loadYearsArray("ip6v6kUBvShVaxOnJPmePBjuVsy1", 2020));
		// dispatch(loadYearsArray("ip6v6kUBvShVaxOnJPmePBjuVsy1", 2021));
		// dispatch(findYears("ip6v6kUBvShVaxOnJPmePBjuVsy1"));

		// dispatch(addEmptyYear(2021, Year2021));

		// console.log("years", years);
		// console.log("yearsLoaded", yearsLoaded);
		// console.log("uid", uid);

		// console.log("uid", uid);
		// console.log("token", token);
		// console.log("email", email);
		// console.log("registeredDate", registeredDate);

		props.navigation.navigate("Settings");
	};

	// Header image custom component
	const HeaderImage = () => {
		if (props.backButton) {
			return (
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
			);
		} else {
			return (
				<Image
					style={styles.logoImage}
					source={require("../assets/images/logo_sml.png")}
				/>
			);
		}
	};

	return (
		<SafeAreaView style={styles.header} onLayout={findHeaderHeight}>
			
			{/* Logo */}
			<View style={styles.leftGroup}>
				<TouchableOpacity
					activeOpacity={props.backButton ? Tools.activeOpacity : 1}
					style={{ paddingHorizontal: Tools.paddingNormal }}
					onPress={() => { props.navigation.goBack() }}>
					<HeaderImage />
				</TouchableOpacity>
				{props.isSettings === false ?
					<Text style={styles.yearText}>{data.yearInt}</Text>
					:
					null
				}
			</View>

			{/* Settings button */}
			{props.isSettings === false ?
				Object.keys(data).length !== 0 ?
					<TouchableOpacity
						activeOpacity={Tools.activeOpacity}
						style={styles.textContainer}
						onPress={handleSettingsChange}>
						<Image
							style={{ ...styles.logoImage, paddingHorizontal: 6 }}
							source={require("../assets/images/settings-kog.png")}
						/>
					</TouchableOpacity>
					:
					null
				:
				<View style={styles.settingsTextContainer}>
					<Text style={{ ...styles.yearText, color: Tools.color5, fontWeight: "500" }}>
						Settings
					</Text>
				</View>
			}

		</SafeAreaView>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	header: {
		// height: 65,
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
	},
	logoImage: {
		width: 28,
		height: 28,
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
		paddingVertical: Tools.paddingNormal,
	},
	svgContainer: {
		paddingHorizontal: 12,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	leftGroup: {
		paddingVertical: Tools.paddingNormal,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	yearText: {
		color: Tools.colorLight,
		fontSize: 24,
		fontWeight: "200",
		paddingLeft: Tools.paddingHalf,
	}
});

export default AppHeader;