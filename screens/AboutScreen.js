// React
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import OtherPagesHeader from '../components/OtherPagesHeader';


// ==================== Functional component 
const AboutScreen = props => {

	return (
		<View style={styles.screen}>
				{/* Header */}
				<OtherPagesHeader navigation={props.navigation} title={"About"}/>

				{/* Inner screen */}
				{/* <View style={styles.innerScreen}>
					<View style={{flex: 1, width: "100%", borderWidth: 1,
					borderColor: 'red'}}>						
					</View>
				</View> */}

				<ScrollView
					style={{flex: 1}}
					contentContainerStyle={{flexGrow: 1}}
					scrollEnabled={true}>

					<View style={styles.content}>
						<Text>
							this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text this is text 
						</Text>
					</View>
				</ScrollView>

		</View>

	);
};


// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: Tools.colorBackground,
	},

	innerScreen: {
		position: "relative",
		width: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: Tools.paddingNormal,
	},
	content: {
		flexGrow: 1,
		padding: 10,
	},
});

export default AboutScreen;