
// React
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenDay from '../components/HomeScreenDay';


// ==================== Component
const ComponentName = props => {
	// Flatlist builder
	const renderFlatlistItems = itemData => {
		switch (itemData.item.color) {
			case 0:
				itemData.item.color = Tools.color0;
				break;
			case 1:
				itemData.item.color = Tools.color1;
				break;
			case 2:
				itemData.item.color = Tools.color2;
				break;
			case 3:
				itemData.item.color = Tools.color3;
				break;
			case 4:
				itemData.item.color = Tools.color4;
				break;
			case 5:
				itemData.item.color = Tools.color5;
				break;
			case 6:
				itemData.item.color = Tools.color6;
				break;
			case 7:
				itemData.item.color = Tools.color7;
				break;
		}

		return (
			<HomeScreenDay color={itemData.item.color} />
		);
	};

	return (
		<View style={styles.month}>
			<FlatList
				data={props.data}
				scrollEnabled={false}
				renderItem={renderFlatlistItems}
				contentContainerStyle={styles.innerMonth}
				keyExtractor={(item, index) => item.id}
				/>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	month: {
		width: "28.05%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		
		// borderWidth: 1,
		// borderColor: "blue"
	},
	innerMonth: {
		width: "100%",
		paddingTop: 20,
		justifyContent: "flex-start",
		alignItems: "stretch",
		flexWrap: "wrap",
		display: "flex",
		flexDirection: "row",
		textAlign: "center",
		
		// borderWidth: 1,
		// borderColor: "red"
	}
});

export default ComponentName;