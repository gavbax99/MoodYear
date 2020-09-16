// React
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";


// ==================== Component
const MySlider = props => {

	const [sliderVal, setSliderVal] = useState(10);

	// Snapping to nearest "step"
	const sliderComplete = () => {
		const valRoundedInt = Math.round(sliderVal/10);
		console.log(valRoundedInt);
		setSliderVal(valRoundedInt*10);
	}

	return (
		<Slider 
			style={styles.slider}

			minimumValue={props.minVal}
			maximumValue={props.maxVal}
			step={1}

			onSlidingComplete={sliderComplete}

			minimumTrackTintColor={props.minTrackColor}
			maximumTrackTintColor={props.maxTrackColor}
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