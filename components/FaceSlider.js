// React
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import Slider from "react-native-slider";
import Svg, { G, Path } from 'react-native-svg';

// Anim
import { tween } from 'popmotion';
import { interpolate } from 'flubber';

// Constants
import Tools from '../constants/Tools';

// Face data
const faceSvgPathsIndex = [
	"one",
	"two",
	"three",
	"four",
	"five",
];

const faceColorIndex = [
	Tools.color1,
	Tools.color2,
	Tools.color3,
	Tools.color4,
	Tools.color5,
];

const faceSvgPaths = {
	leftEye: {
		"one": "M 15.2 21.8 c -1.9 0 -3.7 -0.1 -5.4 -0.4 c 0 0.2 0 0.4 0 0.6 c 0 3 2.4 5.4 5.4 5.4 s 5.4 -2.4 5.4 -5.4 c 0 -0.2 0 -0.4 0 -0.6 C 19 21.6 17.2 21.8 15.2 21.8 Z",
		"two": "M 15.2 18.9 c -1.5 0 -2.9 -0.1 -4.2 -0.3 c -0.8 0.9 -1.2 2.1 -1.2 3.5 c 0 3 2.4 5.4 5.4 5.4 c 3 0 5.4 -2.4 5.4 -5.4 c 0 -1.3 -0.5 -2.5 -1.2 -3.5 C 18.2 18.7 16.8 18.9 15.2 18.9 Z",
		"three": "M 20.6 22 c 0 3 -2.4 5.4 -5.4 5.4 S 9.8 25 9.8 22 s 2.4 -5.3 5.4 -5.3 S 20.6 19 20.6 22 Z",
		"four": "M 15.2 25.1 c 1.5 0 2.9 0.1 4.2 0.3 c 0.8 -0.9 1.2 -2.1 1.2 -3.5 c 0 -3 -2.4 -5.4 -5.4 -5.4 c -3 0 -5.4 2.4 -5.4 5.4 c 0 1.3 0.5 2.5 1.2 3.5 C 12.3 25.2 13.7 25.1 15.2 25.1 Z",
		"five": "M 15.2 23.2 c 1.9 0 3.7 0.2 5.1 0.6 c 0.2 -0.6 0.3 -1.2 0.3 -1.8 c 0 -3 -2.4 -5.4 -5.4 -5.4 c -3 0 -5.4 2.4 -5.4 5.4 c 0 0.6 0.1 1.3 0.3 1.8 C 11.6 23.4 13.3 23.2 15.2 23.2 Z",
	},
	mouth: {
		"one": "M 29 33.1 c -7.6 0 -13.8 5.9 -13.8 13.2 h 4.5 c 0 -4.9 4.2 -8.9 9.3 -8.9 s 9.3 4 9.3 8.9 h 4.5 C 42.8 39 36.6 33.1 29 33.1 Z",
		"two": "M 20.9 41.9 c 1.6 -2.7 4.6 -4.5 8.1 -4.5 c 3.5 0 6.5 1.8 8.1 4.5 l 4.9 0 c -1.9 -5.1 -7 -8.8 -13 -8.8 c -6 0 -11.1 3.7 -13 8.8 L 20.9 41.9 Z",
		"three": "M 43.5 41.9 H 29 H 14.5 v -4.3 c 0 0 5.2 0.1 14.5 0.1 s 14.5 -0.1 14.5 -0.1 V 41.9 Z",
		"four": "M 37.1 36.5 C 35.5 39.2 32.5 41 29 41 c -3.5 0 -6.5 -1.8 -8.1 -4.5 l -4.9 0 c 1.9 5.1 7 8.8 13 8.8 c 6 0 11.1 -3.7 13 -8.8 L 37.1 36.5 Z",
		"five": "M 29 45.3 c 7.6 0 13.8 -5.9 13.8 -13.2 h -4.5 c 0 4.9 -4.2 8.9 -9.3 8.9 s -9.3 -4 -9.3 -8.9 h -4.5 C 15.2 39.4 21.4 45.3 29 45.3 Z",
	},
	rightEye: {
		"one": "M 42.8 21.8 c -1.9 0 -3.7 -0.1 -5.4 -0.4 c 0 0.2 0 0.4 0 0.6 c 0 3 2.4 5.4 5.4 5.4 s 5.4 -2.4 5.4 -5.4 c 0 -0.2 0 -0.4 0 -0.6 C 46.5 21.6 44.7 21.8 42.8 21.8 Z",
		"two": "M 42.8 18.9 c -1.5 0 -2.9 -0.1 -4.2 -0.3 c -0.8 0.9 -1.2 2.1 -1.2 3.5 c 0 3 2.4 5.4 5.4 5.4 c 3 0 5.4 -2.4 5.4 -5.4 c 0 -1.3 -0.5 -2.5 -1.2 -3.5 C 45.7 18.7 44.3 18.9 42.8 18.9 Z",
		"three": "M 48.2 22 c 0 3 -2.4 5.4 -5.4 5.4 S 37.4 25 37.4 22 s 2.4 -5.3 5.4 -5.3 S 48.2 19 48.2 22 Z",
		"four": "M 42.8 25.1 c 1.5 0 2.9 0.1 4.2 0.3 c 0.8 -0.9 1.2 -2.1 1.2 -3.5 c 0 -3 -2.4 -5.4 -5.4 -5.4 c -3 0 -5.4 2.4 -5.4 5.4 c 0 1.3 0.5 2.5 1.2 3.5 C 39.8 25.2 41.2 25.1 42.8 25.1 Z",
		"five": "M 42.8 23.2 c 1.9 0 3.7 0.2 5.1 0.6 c 0.2 -0.6 0.3 -1.2 0.3 -1.8 c 0 -3 -2.4 -5.4 -5.4 -5.4 c -3 0 -5.4 2.4 -5.4 5.4 c 0 0.6 0.1 1.3 0.3 1.8 C 39.1 23.4 40.9 23.2 42.8 23.2 Z",
	},
};


// ==================== Component
const FaceSlider = props => {

	console.log("slider rere");

	// State
	const [faceColor, setFaceColor] = useState(props.faceColor);
	const [leftEyePath, setLeftEyePath] = useState(faceSvgPaths.leftEye[faceSvgPathsIndex[props.sliderValue]]);
	const [mouthPath, setMouthPath] = useState(faceSvgPaths.mouth[faceSvgPathsIndex[props.sliderValue]]);
	const [rightEyePath, setRightEyePath] = useState(faceSvgPaths.rightEye[faceSvgPathsIndex[props.sliderValue]]);

	// Interpolates between two svg paths and two colors
	const interpolatePaths = (val) => {
		const leftEyeInterpolator = interpolate(leftEyePath, faceSvgPaths.leftEye[faceSvgPathsIndex[val]], { maxSegmentLength: 2 });
		const mouthInterpolator = interpolate(mouthPath, faceSvgPaths.mouth[faceSvgPathsIndex[val]], { maxSegmentLength: 2 });
		const rightEyeInterpolator = interpolate(rightEyePath, faceSvgPaths.rightEye[faceSvgPathsIndex[val]], { maxSegmentLength: 2 });

		// Tween the svg path (face) and face color (color) 
		tween({
				duration: 250,
				from: { face: 0, color: faceColor },
				to: { face: 1, color: faceColorIndex[val] }
			})
			.pipe(({ face, color }) => ({
				leftEyePathInterpolator: leftEyeInterpolator(face),
				mouthPathInterpolator: mouthInterpolator(face),
				rightEyePathInterpolator: rightEyeInterpolator(face),
				color
			}))
			.start(({ leftEyePathInterpolator, mouthPathInterpolator, rightEyePathInterpolator, color }) => {
				setLeftEyePath(leftEyePathInterpolator);
				setMouthPath(mouthPathInterpolator);
				setRightEyePath(rightEyePathInterpolator);
				setFaceColor(color);
			});
	};

	return (
		<View style={styles.screen}>

			{/* Date row */}
			<View style={styles.dateRow}>
				{/* Date */}
				<View style={styles.dateCol}>
					<Text style={styles.dateDay}>{props.day}</Text>
					<Text style={styles.dateDate}>{props.dayDate}</Text>
				</View>

				{/* Icon for home screen & month detail */}
				{props.showSlider === true ?
					<View style={{ ...styles.svgContainer, backgroundColor: faceColor }}>
						<Svg width={58} height={58} viewBow="0 0 58 58">
							<G>
								<Path fill="white" d={leftEyePath} />
								<Path fill="white" d={mouthPath} />
								<Path fill="white" d={rightEyePath} />
							</G>
						</Svg>
					</View>
					:
					props.colorNumber >= 0 ?
						<View style={{ ...styles.svgContainer, backgroundColor: props.faceColor }}>
							<Svg width={58} height={58} viewBow="0 0 58 58">
								<G>
									<Path fill="white" d={faceSvgPaths.leftEye[faceSvgPathsIndex[props.colorNumber]]} />
									<Path fill="white" d={faceSvgPaths.mouth[faceSvgPathsIndex[props.colorNumber]]} />
									<Path fill="white" d={faceSvgPaths.rightEye[faceSvgPathsIndex[props.colorNumber]]} />
								</G>
							</Svg>
						</View>
						: 
						<View style={{ width: 64, height: 64, opacity: 0 }}></View>
				}
			</View>

			{/* Slider */}
			{props.showSlider === true ?
				<Slider
					style={styles.slider}

					minimumValue={0}
					maximumValue={4}
					step={1}

					// debugTouchArea={true}

					trackStyle={{ height: 10, borderRadius: 10 }}
					thumbStyle={styles.thumb}
					thumbTouchSize={{ width: 60, height: 60 }}
					thumbTintColor={"#ffffff"}

					minimumTrackTintColor={faceColor}
					maximumTrackTintColor={faceColor}

					onSlidingComplete={(val) => interpolatePaths(val)}
					onValueChange={(val) => props.sliderChange(val)}
					value={props.sliderValue}
				/>
				: 
				null
			}

		</View>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	screen: {
		minWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
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
		fontWeight: "500",
		textShadowColor: "rgba(37,37,37,1)",
		textShadowOffset: { width: 1, height: 2 },
		textShadowRadius: 3
	},
	dateDate: {
		color: Tools.colorLight,
		fontSize: 20,
		fontWeight: "100",
		textShadowColor: "rgba(37,37,37,1)",
		textShadowOffset: { width: 1, height: 2 },
		textShadowRadius: 3
	},
	dateFace: {
		width: 58,
		height: 58,
	},
	svgContainer: {
		width: 64,
		height: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 64
	},
	slider: {
		minWidth: "100%",
		maxWidth: "100%",
		height: 30,
		marginTop: 24,
	},
	thumb: {
		height: 30, 
		width: 30, 
		borderRadius: 30, 
		shadowColor: "#000", 
		shadowOffset: { 
			width: 0, 
			height: 2 
		}, 
		shadowOpacity: 0.15, 
		shadowRadius: 3.5 
	}	
});

export default FaceSlider;