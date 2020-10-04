// React
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Components


// ==================== Component
const FaceSlider = props => {
	return (
		<View style={styles.screen}>
			<Text>The FaceSlider</Text>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default FaceSlider;