// React
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Components
import AppHeader from '../components/AppHeader';


// ==================== Component
const MonthDetailScreen = props => {
	return (
		<View style={styles.screen}>
			{/* Header */}
			<AppHeader navigation={props.navigation} />

			<Text>The MonthDetailScreen</Text>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	}
});

export default MonthDetailScreen;