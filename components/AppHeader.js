// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Image 
} from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Constants
import Tools from '../constants/Tools';

// Components


// ==================== Component
const AppHeader = props => {
	return (
		<View style={styles.header}>
			{/* Logo */}
			<View style={styles.logoContainer}>
				<Image 
					style={styles.logoImage}
					source={require("../assets/images/sober-logo.png")}/>
			</View>

			<Text style={styles.headerText}>
				2020
			</Text>

			{/* Text */}
			<View style={styles.textContainer}>
				{/* <Text style={styles.headerText}>144</Text> */}
				<Ionicons name="ios-more" size={30} color="#ffffff" />
			</View>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	header: {
		width: "100%",
		padding: Tools.paddingNormal,
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
	},
	logoContainer: {
		width: 30,
		height: 30,
	},
	logoImage: {
		width: "100%",
		height: "100%"
	},
	headerText: {
		color: Tools.colorLight,
		fontSize: 18,
		fontWeight: "600",

		// fontSize: 18,
		// paddingRight: 6,
	},
	textContainer: {
		flexDirection: "row",
	}
});

export default AppHeader;