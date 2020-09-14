// React
import React, { useState, useEffect } from "react";
import { 
	StyleSheet, 
	View, 
	Text,
	Image,
	TextInput, 
	KeyboardAvoidingView, 
} from "react-native";
import Slider from '@react-native-community/slider';

// Constants
import Tools from '../constants/Tools';

// Components


// ==================== Component
const HomeScreenBottomCard = props => {

	const [textInputValue, onChangeText] = React.useState("");
	const [textboxHeight, setTextboxHeight] = useState(40);

	// useEffect(() => {

	// });

	const sliderCheck = (val) => {
		console.log(val);
	}
	
	// Date
	console.log("date start");
	const date = new Date();
	const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
	const day = daysOfWeek[date.getDay()];
	const dayDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
	console.log("date end");

	const charactersLeft = textInputValue.length;

	// Functions
	const changeTextboxHeight = (heightInt) => {
		setTextboxHeight(heightInt);
	}

	const handleTextChange = (textString) => {
		onChangeText(textString);
	}
	
	return (
		<KeyboardAvoidingView 
			behavior="padding" 
			style={{ borderColor: "blue", borderWidth: 1 }}
			keyboardVerticalOffset={83}>
			<View style={{...styles.screen, paddingBottom: 30}}>

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
						onChangeText={text => handleTextChange(text)}
						multiline={true}
						onFocus={() => setTextboxHeight(120)}
						onBlur={() => setTextboxHeight(40)}
						value={textInputValue}
						/>
				</View>

			</View>
		</KeyboardAvoidingView>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		minWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: Tools.paddingNormal,
		borderColor: "green",
		borderWidth: 1,
		backgroundColor: Tools.colorBackground,
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
		backgroundColor: Tools.colorLight,
		paddingHorizontal: Tools.paddingHalf,
		paddingTop: Tools.paddingHalf,
		borderRadius: 2,
		fontSize: 16
	}
});

export default HomeScreenBottomCard;