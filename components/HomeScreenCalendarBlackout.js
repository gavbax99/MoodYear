// React
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

// Redux
import { useSelector } from "react-redux";

// ==================== Component
const HomeScreenCalendarBlackout = props => {

	const keyboardOpen = useSelector(state => state.keyboardOpenReducer.keyboardOpenState);
	const windowHeight = Dimensions.get('window').height - 20;
	
	return (
		<View style={{...styles.screen, height: windowHeight }}>
			{keyboardOpen && (
				<View style={styles.blackout} />
			)}
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		// flex: 1,
		width: "100%",
	},
	blackout: {
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "rgba(16, 16, 16, 0.7)",
	}
});

export default HomeScreenCalendarBlackout;