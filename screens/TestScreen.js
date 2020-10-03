// React
import React, { useState } from 'react';
import { 
	StyleSheet, 
	View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Path } from 'react-native-svg';

const faceSvgPathsIndex = [
	"one",
	"two",
	"three",
	"four",
	"five",
]

const faceSvgPaths = {
	leftEye: {
		"five": "M 10.7 13.1 c 3.8 0 7.3 0.5 10.1 1.3 c 0.4 -1.1 0.6 -2.3 0.6 -3.6 C 21.4 4.8 16.6 0 10.7 0 C 4.8 0 0 4.8 0 10.7 c 0 1.3 0.2 2.5 0.6 3.6 C 3.5 13.5 6.9 13.1 10.7 13.1 Z",
		"four": "M 10.7 16.9 c 3 0 5.8 0.3 8.2 0.7 c 1.5 -1.9 2.5 -4.2 2.5 -6.9 C 21.4 4.8 16.6 0 10.7 0 C 4.8 0 0 4.8 0 10.7 c 0 2.6 0.9 5 2.5 6.9 C 4.9 17.2 7.7 16.9 10.7 16.9 Z",
		"three": "M 21.4 10.7 c 0 5.9 -4.8 10.7 -10.7 10.7 S 0 16.7 0 10.7 S 4.8 0.1 10.7 0.1 S 21.4 4.8 21.4 10.7 Z",
		"two": "M 10.7 4.6 c -3 0 -5.8 -0.3 -8.2 -0.7 C 0.9 5.7 0 8.1 0 10.7 c 0 5.9 4.8 10.7 10.7 10.7 c 5.9 0 10.7 -4.8 10.7 -10.7 c 0 -2.6 -0.9 -5 -2.5 -6.9 C 16.6 4.3 13.7 4.6 10.7 4.6 Z",
		"one": "M 10.7 10.3 c -3.8 0 -7.4 -0.3 -10.6 -0.8 C 0 9.9 0 10.3 0 10.7 c 0 5.9 4.8 10.7 10.7 10.7 s 10.7 -4.8 10.7 -10.7 c 0 -0.4 0 -0.8 -0.1 -1.2 C 18.1 10 14.5 10.3 10.7 10.3 Z",
	},
	mouth: {
		"five": "M 38 57 c 15.1 0 27.4 -11.7 27.4 -26.2 h -8.9 c 0 9.8 -8.3 17.7 -18.5 17.7 s -18.5 -7.9 -18.5 -17.7 h -8.9 C 10.6 45.3 22.9 57 38 57 Z",
		"four": "M 54 39.6 c -3.2 5.3 -9.2 8.9 -16 8.9 c -6.9 0 -12.8 -3.6 -16 -8.9 l -9.8 0 C 16 49.7 26.1 57 38 57 c 11.9 0 22 -7.2 25.8 -17.4 L 54 39.6 Z",
		"three": "M 66.8 50.2 H 38 H 9.2 v -8.6 c 0 0 2.8 0.1 28.8 0.1 s 28.8 -0.1 28.8 -0.1 V 50.2 Z",
		"two": "M 22 50.2 c 3.2 -5.3 9.2 -8.9 16 -8.9 c 6.9 0 12.8 3.6 16 8.9 l 9.8 0 C 60 40.1 49.9 32.9 38 32.9 c -11.9 0 -22 7.2 -25.8 17.4 L 22 50.2 Z",
		"one": "M 38 32.8 c -15.1 0 -27.4 11.7 -27.4 26.2 h 8.9 c 0 -9.8 8.3 -17.7 18.5 -17.7 S 56.5 49.2 56.5 59 h 8.9 C 65.4 44.6 53.1 32.8 38 32.8 Z",
	},
	rightEye: {
		"five": "M 65.3 13.1 c 3.8 0 7.3 0.5 10.1 1.3 c 0.4 -1.1 0.6 -2.3 0.6 -3.6 C 76 4.8 71.2 0 65.3 0 S 54.6 4.8 54.6 10.7 c 0 1.3 0.2 2.5 0.6 3.6 C 58 13.5 61.5 13.1 65.3 13.1 Z",
		"four": "M 65.3 16.9 c 3 0 5.8 0.3 8.2 0.7 c 1.5 -1.9 2.5 -4.2 2.5 -6.9 C 76 4.8 71.2 0 65.3 0 c -5.9 0 -10.7 4.8 -10.7 10.7 c 0 2.6 0.9 5 2.5 6.9 C 59.4 17.2 62.3 16.9 65.3 16.9 Z",
		"three": "M 76 10.7 c 0 5.9 -4.8 10.7 -10.7 10.7 s -10.7 -4.8 -10.7 -10.7 S 59.4 0.1 65.3 0.1 S 76 4.8 76 10.7 Z",
		"two": "M 65.3 4.6 c -3 0 -5.8 -0.3 -8.2 -0.7 c -1.5 1.9 -2.5 4.2 -2.5 6.9 c 0 5.9 4.8 10.7 10.7 10.7 c 5.9 0 10.7 -4.8 10.7 -10.7 c 0 -2.6 -0.9 -5 -2.5 -6.9 C 71.1 4.3 68.3 4.6 65.3 4.6 Z",
		"one": "M 65.3 10.3 c -3.8 0 -7.4 -0.3 -10.6 -0.8 c 0 0.4 -0.1 0.8 -0.1 1.2 c 0 5.9 4.8 10.7 10.7 10.7 S 76 16.6 76 10.7 c 0 -0.4 0 -0.8 -0.1 -1.2 C 72.7 10 69.1 10.3 65.3 10.3 Z",
	},
}


// ==================== Component
const TestScreen = props => {

	const [faceState, setFaceState] = useState(faceSvgPathsIndex.length - 1);

	const handle = () => {
		setFaceState(faceState - 1);
	}

	const handle2 = () => {
		setFaceState(4);
	}

	return (
		<View style={styles.screen}>
			<Svg width={76}	height={59}	viewBow="0 0 76 59">

				<G>
					<Path fill="blue" d={faceSvgPaths.leftEye[faceSvgPathsIndex[faceState]]} />
					<Path fill="blue" d={faceSvgPaths.mouth[faceSvgPathsIndex[faceState]]} />
					<Path fill="blue" d={faceSvgPaths.rightEye[faceSvgPathsIndex[faceState]]} />
				</G>

			</Svg>

			<TouchableOpacity style={styles.button} onPress={handle} />
			<TouchableOpacity style={styles.button} onPress={handle2} />
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: "column"
	},
	button: {
		marginTop: 50,
		width: 200,
		height: 50,
		backgroundColor: "red",
	}
});

export default TestScreen;