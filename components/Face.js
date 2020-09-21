// React
import React, { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	Image 
} from 'react-native';

// import { interpolate } from 'flubber';
// import { tween, easing } from 'popmotion';
import * as Svg from "react-native-svg";

const { Path, G } = Svg;

// const types = ["sad", "happy"];

// const PATHS = {
// 	"sad": "M172.5,45.4c3.5-4.7,5.6-10.3,5.6-16.3c0-16-14.3-29-32-29s-32,13-32,29c0,6.1,2.1,11.7,5.6,16.3  H80.4C83.9,40.7,86,35.1,86,29c0-16-14.3-29-32-29s-32,13-32,29c0,6.1,2.1,11.7,5.6,16.3H0C0,75.5,44.8,100,100,100  s100-24.5,100-54.6H172.5z",
// 	"happy": "M158.6,55.7c11.5-4.4,19.5-14.7,19.5-26.7c0-16-14.3-29-32-29s-32,13-32,29  c0,6.6,2.4,12.6,6.5,17.5c-6.6-0.8-13.5-1.2-20.5-1.2s-13.9,0.4-20.5,1.2C83.6,41.7,86,35.6,86,29c0-16-14.3-29-32-29s-32,13-32,29  c0,12,8,22.3,19.5,26.7C16.3,65.7,0,81.8,0,100h200C200,81.8,183.7,65.7,158.6,55.7z",
// }


// ==================== Component
const Face = props => {

	// const [svgPath, setSvgPath] = useState(PATHS["sad"]);

	return (
		<View style={styles.screen}>
          {/* <Svg width={58} height={58} viewBox="0 0 58 58" style={styles.svgContainer}>
            <G>
              <Path d={"M172.5,45.4c3.5-4.7,5.6-10.3,5.6-16.3c0-16-14.3-29-32-29s-32,13-32,29c0,6.1,2.1,11.7,5.6,16.3  H80.4C83.9,40.7,86,35.1,86,29c0-16-14.3-29-32-29s-32,13-32,29c0,6.1,2.1,11.7,5.6,16.3H0C0,75.5,44.8,100,100,100  s100-24.5,100-54.6H172.5z"} />
            </G>
          </Svg> */}
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	faceIcon: {
		width: 58,
		height: 58,
	}
});

export default Face;