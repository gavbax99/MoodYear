// React
import React, { 
	useState, 
	useEffect, 
	useCallback
} from "react";
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

	const [textInputValue, onChangeText] = useState("");
	const [textInputHoldValue, setTextInputHoldValue] = useState("");
	const [textboxHeight, setTextboxHeight] = useState(40);
	
	const dispatch = useDispatch();

	const sliderCheck = (val) => {
		console.log(val);
	}

	// State of keyboard
	const keyboardIsOpen = useSelector(state => state.keyboardOpenReducer.keyboardOpenState);

	// Date
	const date = new Date();
	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];
	const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
		
	// Variables
	const charactersLeft = textInputValue.length;
	const characaterLimit = 150;

	// Default values for when textbox is closed
	let textBoxDisplay = 0;
	let topOfSubmitButton = 50;
	let underInputRowOverflow = "hidden";
	
	// If textbox is open:
	if (keyboardIsOpen) {
		textBoxDisplay = 100;
		topOfSubmitButton = -16;
		underInputRowOverflow = "visible";
	};

	// Textbox functions
	const onTextboxFocus = () => {
		onChangeText(textInputHoldValue);
		setTextInputHoldValue("");

		dispatch(setKeyboardOpen(true));
	};

	const onTextboxBlur = () => {
		setTextInputHoldValue(textInputValue);
		textInputValue.length > 0 ? onChangeText("Entry in progres...") : onChangeText("");

		dispatch(setKeyboardOpen(false));
	};
	
	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			keyboardVerticalOffset={83}>
			<View style={[styles.screen, keyboardIsOpen ? styles.screenKeyboardOpen : null ]}>

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
						style={{
							...styles.textInput, 
							fontStyle: keyboardIsOpen ? null : "italic",
							height: keyboardIsOpen ? 104 : 40
						}}
						onChangeText={text => onChangeText(text)}
						multiline={true}
						onFocus={() => onTextboxFocus()}
						onBlur={() => onTextboxBlur()}
						maxLength={characaterLimit}
						placeholder={"How are you?"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						spellCheck={false}
						value={textInputValue}
						/>
				</View>

				{/* Under nput row */}
				<View style={{ 
					...styles.underInputRow, 
					maxHeight: keyboardIsOpen ? 100 : 0, 
					overflow: underInputRowOverflow 
					}}>
					<Text style={styles.underInputText}>
						{charactersLeft}/{characaterLimit}
					</Text>

					<View style={{ ...styles.underInputSubmitButton, top: topOfSubmitButton }}>
						<Text style={styles.underInputSubmitButtonText}>
							+
						</Text>
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

		zIndex: 999,
	},
	screenKeyboardOpen: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 6,
		borderBottomColor: Tools.colorHeaderGrey,
		borderBottomWidth: 1,
		paddingBottom: Tools.paddingMonths,
	},

	// Date row
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
		width: 58,
		height: 58,
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
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 22,
		borderRadius: 3,
		fontSize: 18
	},

	// underinput
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
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 4,
		width: 48,
		height: 48,
		backgroundColor: Tools.accentColor,
		borderRadius: 100,
		shadowOffset: {  width: 0,  height: 3,  },
		shadowColor: Tools.colorHeaderGrey,
		shadowOpacity: 0.25,
	},
	underInputSubmitButtonText: {
		color: Tools.colorLight,
		fontSize: 32,
		fontWeight: "700",
		paddingBottom: 2,
		paddingLeft: 1,
	}

});

export default HomeScreenBottomCard;