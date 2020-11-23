// React
import React from "react";
import {
	StyleSheet,
	View,
	Text,
	// ScrollView,
} from "react-native";

// Constants
import Tools from '../constants/Tools';

// Components
import FaceSlider from "./FaceSlider";

// ==================== Component ====================
const MonthDetailBottomCard = props => {

	return (
		<View style={styles.screen}>

			{/* Icon and slider */}
			<FaceSlider
				day={props.dayOfWeek}
				dayDate={`${props.monthNo + 1}/${props.dayNo}/${props.yearInt}`}
				showSlider={false}
				faceColor={props.faceColor}
				colorNumber={props.colorNumber}
			/>

			{/* Text row */}
			<View style={styles.bottomTextView}>
				{/* <ScrollView style={styles.scrollView}>    maybe someday  */}
					<Text style={props.message.length > 0 ? styles.bottomText : { ...styles.bottomText, color: Tools.colorBackground }}>
						{props.message.length > 0 ? props.message : "No entry."}
					</Text>
				{/* </ScrollView> */}
			</View>
		</View>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	screen: {
		height: 218,
		minWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: Tools.paddingNormal,
		backgroundColor: Tools.colorBackground,
		paddingBottom: Tools.paddingDouble,
	},
	bottomTextView: {
		flex: 1,
		width: "100%",
		marginTop: Tools.paddingNormal,
		backgroundColor: Tools.colorTextboxGrey,
		borderRadius: 5,
	},
	bottomText: {
		flex: 1,
		minWidth: "100%",
		color: Tools.colorLight,
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 20,
		fontSize: 16,
	},
	// scrollView: {
	// 	flex: 1,
	// },
});

export default MonthDetailBottomCard;