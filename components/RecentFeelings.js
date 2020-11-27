// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	Image
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components


// ==================== Component
const RecentFeelings = props => {

	const Face = () => {
		switch (props.faceColor) {
			case 0:
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-0.png`)}
					resizeMode={"contain"}
				/>
			case 1: 
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-1.png`)}
					resizeMode={"contain"}
				/>
			case 2: 
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-2.png`)}
					resizeMode={"contain"}
				/>
			case 3: 
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-3.png`)}
					resizeMode={"contain"}
				/>
			case 4: 
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-4.png`)}
					resizeMode={"contain"}
				/>
			case 5: 
				return <Image 
					style={{width: 64, height: 64}}
					source={require(`../assets/images/faces/face-5.png`)}
					resizeMode={"contain"}
				/>
		}
	}

	return (
		<View style={[styles.container, props.style]}>
			<View>
				<Text style={styles.headlineText}>Last {props.totalEntries} Days</Text>
				<Text style={styles.subText}>{props.entries}/{props.totalEntries} Entries</Text>
			</View>

			<View style={{ width: 64, height: 64 }}>
				<Face />
			</View>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headlineText: {
		color: Tools.colorLight,
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 2,
	},
	subText: {
		fontSize: 20,
		fontWeight: "100",
		color: Tools.colorLight,
	}
});

export default RecentFeelings;