// React
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

// Constants
import Tools from '../constants/Tools';


// ==================== Component
const MySlider = props => {

	const [sliderVal, setSliderVal] = useState(10);

	// Snapping to nearest "step"
	const sliderComplete = () => {
		const valRoundedInt = Math.round(sliderVal/10);
		console.log(valRoundedInt);
		setSliderVal(valRoundedInt*10);
	}

	// color gradient for slider
	const sliderGradientArr = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, Tools.color1,

		Tools.color1,
		Tools.color1,
		Tools.color1,
		Tools.color1,
		Tools.color1,

		Tools.color1,
		Tools.color1,
		Tools.color1,
		Tools.color1,
		Tools.color1,
		
		Tools.color2,
		Tools.color2,
		Tools.color2,
		Tools.color2,
		Tools.color2,

		Tools.color2,
		Tools.color2,
		Tools.color2,
		Tools.color2,
		Tools.color2,

		Tools.color3,
		Tools.color3,
		Tools.color3,
		Tools.color3,
		Tools.color3,

		Tools.color3,
		Tools.color3,
		Tools.color3,
		Tools.color3,
		Tools.color3,

		Tools.color4,
		Tools.color4,
		Tools.color4,
		Tools.color4,
		Tools.color4,

		Tools.color4,
		Tools.color4,
		Tools.color4,
		Tools.color4,
		Tools.color4,

		Tools.color5,
		Tools.color5,
		Tools.color5,
		Tools.color5,
		Tools.color5,

		Tools.color5,
		Tools.color5,
		Tools.color5,
		Tools.color5,
		Tools.color5,
		
		Tools.color5,
		Tools.color5,
		Tools.color5,
	];

	return (
		<Slider 
			style={styles.slider}

			minimumValue={props.minVal}
			maximumValue={props.maxVal}
			step={1}

			onSlidingComplete={sliderComplete}

			minimumTrackTintColor={sliderGradientArr[sliderVal]}
			maximumTrackTintColor={sliderGradientArr[sliderVal]}
			// minimumTrackTintColor={props.minTrackColor}
			// maximumTrackTintColor={props.maxTrackColor}
			thumbTintColor={props.thumbColor}

			onValueChange={(val) => { setSliderVal(val) }}
			value={sliderVal}
			/>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	slider: {
		minWidth: "100%",
		maxWidth: "100%",
		height: 20,
	},
});

export default MySlider;