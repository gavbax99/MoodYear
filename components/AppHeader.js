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

			{/* Text */}
			<View style={styles.textContainer}>
				<Text style={styles.headerText}>144</Text>
				<Ionicons name="md-calendar" size={20} color="#ffffff" />
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
		fontSize: 18,
		color: Tools.colorLight,
		paddingRight: 6,
	},
	textContainer: {
		flexDirection: "row",
	}
});

export default AppHeader;