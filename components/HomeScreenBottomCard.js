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
	Animated
} from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setKeyboardOpen } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import MySlider from "./MySlider";
import Face from "./Face";

// Vars
const characaterLimit = 150;
const date = new Date();
const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const day = daysOfWeek[date.getDay()];
const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());

const textboxHeightOpen = 104;
const textboxHeightClosed = 40;

const underTextboxHeightOpen = 100;
const underTextboxHeightClosed = 0;

const submitButtonTopOpen = -16;
const submitButtonTopClosed = 50;


// ==================== Component
const HomeScreenBottomCard = props => {

	console.log("bottom card rerender")

	const [textInputValue, onChangeText] = useState("");
	const [textInputHoldValue, setTextInputHoldValue] = useState("");
	
	const dispatch = useDispatch();

	const sliderCheck = (val) => {
		console.log(val);
	}

	// State of keyboard
	const keyboardIsOpen = useSelector(state => state.keyboardOpenReducer.keyboardOpenState);
		
	// Variables
	const charactersLeft = textInputValue.length;

	// Textbox functions
	const onTextboxFocus = () => {
		onChangeText(textInputHoldValue);
		setTextInputHoldValue("");

		dispatch(setKeyboardOpen(true));
	};

	const onTextboxBlur = () => {
		setTextInputHoldValue(textInputValue);
		textInputValue.length > 0 ? onChangeText("Entry in progress...") : onChangeText("");

		dispatch(setKeyboardOpen(false));
	};
	
	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			keyboardVerticalOffset={83}
			>
			<View style={[
				styles.screen, 
				keyboardIsOpen ? styles.screenKeyboardOpen : null 
				]}>

				{/* Date row */}
				<View style={styles.dateRow}>
					{/* Date */}
					<View style={styles.dateCol}>
						<Text style={styles.dateDay}>{day}</Text>
						<Text style={styles.dateDate}>{dayDate}</Text>
					</View>


					<Face />

					{/* Icon */}
					{/* <View style={styles.dateFaceContainer}>
						<Image style={styles.dateFace} source={require("../assets/images/face-6.png")} />
					</View> */}
				</View>

				{/* Slider row */}
				<View style={styles.sliderRow}>
					<MySlider 
						minVal={10}
						maxVal={50}
						minTrackColor={Tools.color1}
						maxTrackColor={Tools.color5}
						thumbColor={Tools.colorLight}
						/>
				</View>

				{/* Input row */}
				<View style={{
					...styles.inputRow,
					height: keyboardIsOpen ? textboxHeightOpen : textboxHeightClosed,
					}}>
					<TextInput
						style={{
							...styles.textInput, 
							fontStyle: keyboardIsOpen ? null : "italic",
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
					maxHeight: keyboardIsOpen ? underTextboxHeightOpen : underTextboxHeightClosed, 
					overflow: keyboardIsOpen ? "visible" : "hidden" 
					}}>
					<Text style={{
						...styles.underInputText,
						color: charactersLeft === 150 ? Tools.accentColor : Tools.colorLight, 
						}}>
						{charactersLeft}/{characaterLimit}
					</Text>

					<View style={{ 
						...styles.underInputSubmitButton, 
						top: keyboardIsOpen ? submitButtonTopOpen : submitButtonTopClosed 
						}}>
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
		marginTop: 30
	},

	textInput: {
		minWidth: "100%",
		maxWidth: "100%",
		height: "100%",
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