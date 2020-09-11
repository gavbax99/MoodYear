
// React
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenDay from '../components/HomeScreenDay';


// ==================== Component
const ComponentName = props => {
	return (
		<View style={styles.month}>

			{/* Render our days */}
			{props.data.map((monthObj, i) => {

				switch (monthObj.color) {
					case 0:
						monthObj.color = Tools.color0;
						break;
					case 1:
						monthObj.color = Tools.color1;
						break;
					case 2:
						monthObj.color = Tools.color2;
						break;
					case 3:
						monthObj.color = Tools.color3;
						break;
					case 4:
						monthObj.color = Tools.color4;
						break;
					case 5:
						monthObj.color = Tools.color5;
						break;
					case 6:
						monthObj.color = Tools.color6;
						break;
					case 7:
						monthObj.color = Tools.color7;
						break;
					default: break;
				}

				return (
					<HomeScreenDay 
						color={monthObj.color}
						id={monthObj.id} />
				);
			})}

		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	month: {
		padding: "2%",
		width: "33.33%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		flexWrap: "wrap",
	},
});

export default ComponentName;