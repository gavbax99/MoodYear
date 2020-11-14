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
	TouchableOpacity,
	Keyboard,
	Alert
} from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setKeyboardOpen, updateData, updateSingleDay, loadSingleDay, loadData } from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import FaceSlider from "./FaceSlider";

// Vars
const characaterLimit = 150;
const date = new Date();
const yearNumber = date.getFullYear();
const monthNumber = date.getMonth();
const dayNumber = date.getDate();
const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const day = daysOfWeek[date.getDay()];

const dayDate = ((monthNumber + 1) + '/' + dayNumber + '/' + yearNumber);

const textboxHeightOpen = 96;
const textboxHeightClosed = 38;

const underTextboxHeightOpen = 100;
const underTextboxHeightClosed = 0;

const submitButtonTopOpen = -16;
const submitButtonTopClosed = 50;


// ==================== Component
const HomeScreenBottomCard = props => {

	const [textInputValue, setTextInputValue] = useState("");
	const [textInputHoldValue, setTextInputHoldValue] = useState("");
	const [sliderVal, setSliderVal] = useState(4);

	// const [dayHasInformation, setDayHasInformation] = useState(false);
	// const [dataColor, setDataColor] = useState(0);
	
	const dispatch = useDispatch();

	// Redux variables
	const keyboardIsOpen = useSelector(state => state.keyboardReducer.keyboardReducerState);
	const data = useSelector(state => state.dataReducer.data);
	const uid = useSelector(state => state.authReducer.userId);
		
	// Variables
	const charactersLeft = textInputValue.length;

	// Textbox functions
	const onTextboxFocus = () => {
		setTextInputValue(textInputHoldValue);
		setTextInputHoldValue("");
		_textInput.setNativeProps({ selection: { start: textInputValue.length , end: textInputValue.length } })

		dispatch(setKeyboardOpen(true));
	};

	const onTextboxBlur = () => {
		setTextInputHoldValue(textInputValue);
		textInputValue.length > 0 ? setTextInputValue("Entry in progress...") : setTextInputValue("");

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

		// const colorArr = [Tools.color1, Tools.color2, Tools.color3, Tools.color4, Tools.color5]
		// const checkDataDifference = data.months[monthNumber].days[dayNumber-1].message === textInputValue; 
		// const checkColorDifference = data.months[monthNumber].days[dayNumber-1].color === colorArr[sliderVal]; 
		// const sameDayData = checkDataDifference === checkColorDifference;

		// WORKS FOR WHOLE SINGLE DAY
		const newDayObj = new NewObj(data.months[monthNumber].days[dayNumber-1]);
		// console.log(newDayObj.obj);
		newDayObj.obj.message = textInputValue;
		newDayObj.obj.color = sliderVal + 1;
		dispatch(updateSingleDay(uid, yearNumber, monthNumber, (dayNumber-1), newDayObj.obj));

		// CHANGE SO ONLY ONE DAY IS LOADED
		dispatch(loadData(uid, yearNumber));

		dispatch(setKeyboardOpen(false));
		setTextInputValue("");
		Keyboard.dismiss();
	};

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await fetch(`https://rn-health.firebaseio.com/userData/${uid}/${yearNumber}/months/${monthNumber}/days/${(dayNumber-1)}.json`);
	// 		const resData = await response.json(); 
	// 		console.log("useeffect in bottom card: ", resData);

	// 		if (resData.color !== 0 && resData.color !== Tools.color0) {
	// 			setDayHasInformation(true);
	// 		}
	// 	}
	// 	fetchData();
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
					showSlider={true}
					faceColor={Tools.color5}
					/>

				{/* Input row */}
				<View style={{
					...styles.inputRow,
					height: keyboardIsOpen ? textboxHeightOpen : textboxHeightClosed,
					}}>
					<TextInput
						style={styles.textInput}
						onChangeText={text => setTextInputValue(text)}
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