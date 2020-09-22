// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Image,
	TouchableOpacity
} from 'react-native';

// Redux
import { useDispatch } from "react-redux";
import { setHeaderHeight } from "../store/actions/actions";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Constants
import Tools from '../constants/Tools';


// ==================== Component
const AppHeader = props => {

	const findHeaderHeight = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;

		console.log(x, y, width, height);
		dispatch(setHeaderHeight(height));
	}

	const dispatch = useDispatch();

	return (
		<View style={styles.header} onLayout={findHeaderHeight}>
			{/* Logo */}
			<TouchableOpacity onPress={() => {props.navigation.goBack()}}>
				<Image 
					style={styles.logoImage}
					source={require("../assets/images/sober-logo.png")}
					/>
			</TouchableOpacity>

			{/* Text */}
			<View style={styles.textContainer}>
				<Ionicons style={{paddingHorizontal: 6}}name="ios-more" size={30} color="#ffffff" />
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
	logoImage: {
		width: 30,
		height: 30,
		resizeMode: "contain",
	},
	headerText: {
		color: Tools.colorLight,
		fontSize: 18,
		fontWeight: "600",
	},
	textContainer: {
		flexDirection: "row",
	}
});

export default AppHeader;