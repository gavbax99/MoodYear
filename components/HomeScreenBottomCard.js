// React
import React, { useState, useEffect, useCallback } from "react";
import { 
	StyleSheet, 
	View, 
	Text,
	Image,
	TextInput, 
	KeyboardAvoidingView, 
	Button,
} from "react-native";
import Slider from '@react-native-community/slider';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setKeyboardOpen } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components


// ==================== Component
const HomeScreenBottomCard = props => {

	console.log("HomeScreenBottomCard");

	const [textInputValue, onChangeText] = React.useState("");
	const [textInputHoldValue, setTextInputHoldValue] = useState("");
	const [textboxHeight, setTextboxHeight] = useState(36);
	
	const dispatch = useDispatch();

	const sliderCheck = (val) => {
		console.log(val);
	}

	// const keyboardIsOpen = useSelector(state => state.keyboardOpenReducer.keyboardOpenState);
	// console.log(keyboardIsOpen);

	// Date
	const date = new Date();
	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];
	const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
		
	// Variables
	const charactersLeft = textInputValue.length;
	const characaterLimit = 200;

	// Default values for when textbox is closed
	let textBoxDisplay = 0;
	let topOfSubmitButton = 50;
	let underInputRowOverflow = "hidden";
	
	// If textbox is open:
	if (textboxHeight !== 36) {
		textBoxDisplay = 100;
		topOfSubmitButton = -35;
		underInputRowOverflow = "visible";
	};

	// Textbox functions
	const onTextboxFocus = () => {
		const height = 128;
		dispatch(setKeyboardOpen(true));
		setTextboxHeight(height);
	};

	const onTextboxBlur = () => {
		const height = 36;
		setTextboxHeight(height);
		dispatch(setKeyboardOpen(false));
	};
	
	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			keyboardVerticalOffset={83}>
			<View style={styles.screen}>

				{/* Date row */}
				<View style={styles.dateRow}>
					{/* Date */}
					<View style={styles.dateCol}>
						<Text style={styles.dateDay}>{day}</Text>
						<Text style={styles.dateDate}>{dayDate}</Text>
					</View>

					{/* Icon */}
					<View style={styles.dateFaceContainer}>
						<Image style={styles.dateFace} source={require("../assets/images/face-6.png")} />
					</View>
				</View>

				{/* Slider row */}
				<View style={styles.sliderRow}>
					<Slider 
						style={styles.slider}    
						minimumValue={1}
						maximumValue={7}
						step={1}
						onValueChange={sliderCheck}
						minimumTrackTintColor={Tools.color1}
						maximumTrackTintColor={Tools.color7}
						thumbTintColor={Tools.colorLight}
						/>
				</View>

				{/* Input row */}
				<View style={styles.inputRow}>
					<TextInput
						style={{ ...styles.textInput, height: textboxHeight }}
						onChangeText={text => onChangeText(text)}
						multiline={true}
						numberOfLines={1}
						onFocus={() => onTextboxFocus()}
						onBlur={() => onTextboxBlur()}
						maxLength={characaterLimit}
						placeholder={"How are you?"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						value={textInputValue}
						/>
				</View>

				{/* Under nput row */}
				<View style={{ ...styles.underInputRow, maxHeight: textBoxDisplay, overflow: underInputRowOverflow }}>
					<Text style={styles.underInputText}>
						{charactersLeft}/{characaterLimit}
					</Text>

					<View style={{ ...styles.underInputSubmitButton, top: topOfSubmitButton }}>
					</View>
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
	},
	dateRow: {
		minWidth: "100%",
		maxWidth: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dateCol: {
		alignItems: "flex-start",
		justifyContent: "center",
	},
	dateDay: {
		color: Tools.colorLight,
		fontSize: 28,
		fontWeight: "bold",
		textShadowColor: "rgba(37,37,37,1)",
		textShadowOffset: {width: 1, height: 2},
		textShadowRadius: 3
	},
	dateDate: {
		color: Tools.colorLight,
		fontSize: 18,
		textShadowColor: "rgba(37,37,37,1)",
		textShadowOffset: {width: 1, height: 2},
		textShadowRadius: 3
	},
	dateFace: {
		width: 60,
		height: 60,
	},

	// slider
	sliderRow: {
		minWidth: "100%",
		maxWidth: "100%",
		paddingTop: 30
	},
	slider: {
		minWidth: "100%",
		maxWidth: "100%",
		height: 20,
	},

	// input
	inputRow: {
		minWidth: "100%",
		maxWidth: "100%",
		paddingTop: 30
	},
	textInput: {
		minWidth: "100%",
		maxWidth: "100%",
		backgroundColor: Tools.colorTextboxGrey,
		color: Tools.colorLight,
		textAlignVertical: "top",
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 22,
		borderRadius: 3,
		fontSize: 18
	},
	underInputRow: {
		position: "relative",
		marginTop: 6,
		minWidth: "100%",
		maxWidth: "100%",		
		flexDirection: "row",
		justifyContent: "space-between",
	},
	underInputText: {
		color: Tools.colorLight,
		fontSize: 10,
	},
	underInputSubmitButton: {
		position: "absolute",
		right: 8,
		width: 55,
		height: 55,
		backgroundColor: "blue",
		borderRadius: 100,
		shadowOffset: {  width: 0,  height: 3,  },
		shadowColor: Tools.colorHeaderGrey,
		shadowOpacity: 0.05,
	}

});

export default HomeScreenBottomCard;