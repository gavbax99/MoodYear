// React
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Components
import AppHeader from '../components/AppHeader';

// Constants
import Tools from '../constants/Tools';


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
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},
});

export default MonthDetailScreen;