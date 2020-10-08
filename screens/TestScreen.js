// React
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button
} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { test } from "../store/actions/actions";


// Constants
import Tools from '../constants/Tools';




// ==================== Component
const TestScreen = props => {

	const dispatch = useDispatch();

	const testText = useSelector(state => state.dataReducer.test);

	const testFunct = () => {
		dispatch(test("whattup nerd"));
	}

	return (
		<View style={styles.screen}>

			<Text>
				{testText}
			</Text>

			<Button title="press me" onPress={testFunct} />

		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: "column"
	},
});

export default TestScreen;