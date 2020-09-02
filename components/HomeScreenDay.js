// React
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// ==================== Component
const HomeScreenDay = props => {
	return (
		<View style={{ ...styles.day, backgroundColor: props.color}}>
			
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	day: {
		width: 12, 
		height: 12,
		margin: 2,
		borderRadius: 2,
		shadowColor: '#101010',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
	}
});

export default HomeScreenDay;