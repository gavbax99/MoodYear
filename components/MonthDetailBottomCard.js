// React
import React from "react";
import { 
	StyleSheet, 
	View, 
	Text,
	KeyboardAvoidingView, 
} from "react-native";

// Redux
import { useSelector } from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Components
import FaceSlider from "./FaceSlider";

// ==================== Component
const MonthDetailBottomCard = props => {

	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			keyboardVerticalOffset={useSelector(state => state.navReducer.headerHeightState)}
			>
			<View style={styles.screen}>

				{/* Icon and slider */}
				<FaceSlider 
					day={props.dayOfWeek} 
					dayDate={`${props.monthNo+1}/${props.dayNo}/${props.yearInt}`} 
					showSlider={false}
					faceColor={props.faceColor}
					colorNumber={props.colorNumber}
					/>

				{/* Text row */}
				<View style={styles.bottomTextView}>
					<Text style={styles.bottomText}>
						{props.message.length > 0 ? props.message : "No message." }
					</Text>
				</View>

			</View>

		</KeyboardAvoidingView>
	);
};

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		minWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: Tools.paddingNormal,
		backgroundColor: Tools.colorBackground,
		paddingBottom: Tools.paddingLarge,
		zIndex: 999,
	},
	bottomTextView: {
		width: "100%",
		minHeight: 96,
		marginTop: Tools.paddingNormal,
		backgroundColor: Tools.colorTextboxGrey,
		borderRadius: 5,
	},
	bottomText: {
		color: Tools.colorLight,
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 20,
		fontSize: 16
	}
});

export default MonthDetailBottomCard;