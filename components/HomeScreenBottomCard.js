// React
import React, { 
	useState, 
	useEffect
} from "react";
import { 
	StyleSheet, 
	View, 
	Text,
	TextInput, 
	KeyboardAvoidingView, 
	TouchableOpacity
} from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setKeyboardOpen, updateData, updateSingleDay, loadSingleDay } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import FaceSlider from "./FaceSlider";
// import { TouchableOpacity } from "react-native-gesture-handler";

// Vars
const characaterLimit = 150;
const date = new Date();
const yearNumber = date.getFullYear();
const monthNumber = date.getMonth();
const dayNumber = date.getDate();
const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const day = daysOfWeek[date.getDay()];

const dayDate = ((monthNumber + 1) + '/' + dayNumber + '/' + yearNumber);

// to get month: date.getMonth()
// to get day: date.getDate() - 1
// 

const textboxHeightOpen = 96;
const textboxHeightClosed = 38;

const underTextboxHeightOpen = 100;
const underTextboxHeightClosed = 0;

const submitButtonTopOpen = -16;
const submitButtonTopClosed = 50;


// ==================== Component
const HomeScreenBottomCard = props => {

	const [textInputValue, onChangeText] = useState("");
	const [textInputHoldValue, setTextInputHoldValue] = useState("");
	const [sliderVal, setSliderVal] = useState(4);
	
	const dispatch = useDispatch();

	// Redux variables
	const keyboardIsOpen = useSelector(state => state.keyboardReducer.keyboardReducerState);
	const data = useSelector(state => state.dataReducer.data);
	const uid = useSelector(state => state.authReducer.userId);
		
	// Variables
	const charactersLeft = textInputValue.length;

	// Textbox functions
	const onTextboxFocus = () => {
		onChangeText(textInputHoldValue);
		setTextInputHoldValue("");
		_textInput.setNativeProps({ selection: { start: textInputValue.length , end: textInputValue.length } })

		dispatch(setKeyboardOpen(true));
	};

	const onTextboxBlur = () => {
		setTextInputHoldValue(textInputValue);
		textInputValue.length > 0 ? onChangeText("Entry in progress...") : onChangeText("");

		dispatch(setKeyboardOpen(false));
	};

	// Slider value function
	const handleSliderChange = (val) => {
		setSliderVal(val);
	};

	function NewObj(obj) {
		this.obj = obj;
	}

	// Submit data for day
	const submitMessage = () => {

		// WORKS FOR WHOLE BLOB
		// const newObj = new NewObj(data);
		// newObj.obj.months[monthNumber].days[dayNumber-1].message = textInputValue;
		// newObj.obj.months[monthNumber].days[dayNumber-1].color = sliderVal + 1;
		// console.log("message: ", newObj.obj.months[monthNumber].days[dayNumber-1].message);
		// console.log("slider: ", newObj.obj.months[monthNumber].days[dayNumber-1].color);
		// dispatch(updateData(uid, yearNumber, newObj.obj));

		// WORKS FOR WHOLE SINGLE DAY
		// const newDayObj = new NewObj(data.months[monthNumber].days[dayNumber-1]);
		// console.log(newDayObj.obj);
		// newDayObj.obj.message = textInputValue;
		// newDayObj.obj.color = sliderVal + 1;
		// dispatch(updateSingleDay(uid, yearNumber, monthNumber, dayNumber, newDayObj.obj));

		dispatch(loadSingleDay(uid, yearNumber, monthNumber, dayNumber));


	};

	// useEffect(() => {
	// 	console.log("monthzz: ", data.months[monthNumber].days[dayNumber-1].dayOfYear);
	// }, [data]);
	
	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			keyboardVerticalOffset={useSelector(state => state.navReducer.headerHeightState)}
			>
			<View style={[
				styles.screen, 
				keyboardIsOpen ? styles.screenKeyboardOpen : null 
				]}>

				{/* Icon and slider */}
				<FaceSlider 
					day={day} 
					dayDate={dayDate} 
					sliderValue={sliderVal}
					sliderChange={handleSliderChange}
					/>

				{/* Input row */}
				<View style={{
					...styles.inputRow,
					height: keyboardIsOpen ? textboxHeightOpen : textboxHeightClosed,
					}}>
					<TextInput
						style={styles.textInput}
						onChangeText={text => onChangeText(text)}
						multiline={true}
						onFocus={() => onTextboxFocus()}
						onBlur={() => onTextboxBlur()}
						maxLength={characaterLimit}
						placeholder={"How are you today?"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						spellCheck={false}
						ref={component => _textInput = component}
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

					<TouchableOpacity 
						activeOpacity={Tools.activeOpacity} 
						// style={styles.textContainer} 
						onPress={submitMessage}>
						<View style={{ 
							...styles.underInputSubmitButton, 
							top: keyboardIsOpen ? submitButtonTopOpen : submitButtonTopClosed 
							}}>
							<Text style={styles.underInputSubmitButtonText}>
								+
							</Text>
						</View>
					</TouchableOpacity>
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
			height: -4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		elevation: 6,
		paddingBottom: Tools.paddingMonths,
	},

	// input
	inputRow: {
		minWidth: "100%",
		maxWidth: "100%",
		marginTop: 24
	},

	textInput: {
		minWidth: "100%",
		maxWidth: "100%",
		height: "100%",
		backgroundColor: Tools.colorTextboxGrey,
		color: Tools.colorLight,
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 20,
		borderRadius: 3,
		fontSize: 16
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