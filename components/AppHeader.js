// React
import React, { useEffect, useState } from 'react';
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
import { setHeaderHeight } from "../store/actions/uiActions";

// Dev
// import { updateData } from "../store/actions/devActions";
// import Year2021 from "../github_assets/data/Year2021Blank";

// Constants
import Tools from '../constants/Tools';

// ==================== Component ====================
const AppHeader = props => {

	// Redux
	const dispatch = useDispatch();
	const data = useSelector(state => state.dataReducer.data);

	// Dev
	// const uid = useSelector(state => state.authReducer.userId);

	// State
	const [yearInt, setYearInt] = useState(null);

	// Find header height on load
	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	};

	// Cog onpress
	const handleSettingsChange = () => {
		// Dev - to update the entire year from a dataobj
		// dispatch(updateData(uid, 2021, Year2021));
		
		// props.navigation.navigate({
		// 	routeName: "Startup",
		// 	params: { update: Math.random() },
		// });
		
		props.navigation.navigate("Settings");
	};

	useEffect(() => {
		if (Object.keys(data).length === 0) return;

		setYearInt(data.yearInt);
	}, [data]);

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
					onPress={() => { 
						if (props.backButton === true) {
							props.navigation.goBack();	
						} 
					}}>
					<HeaderImage />
				</TouchableOpacity>
				{props.isSettings === false ?
					<Text style={styles.yearText}>{yearInt}</Text>
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