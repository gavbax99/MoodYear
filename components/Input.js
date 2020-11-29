// React
import React, { useReducer, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet
} from 'react-native';

// Redux state
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

// Reducer
const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true
			};
		default:
			return state;
	}
};

// ==================== Component ====================
const Input = props => {

	// State
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initialValid ? props.initialValid : false,
		touched: false
	});

	const { onInputChange, id } = props;

	useEffect(() => {
		onInputChange(id, inputState.value, inputState.isValid);
	}, [inputState, onInputChange, id]);

	const textChangeHandler = text => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
	};

	const lostFocusHandler = () => {
		dispatch({ type: INPUT_BLUR });
	};

	return (
		<View style={styles.formControl}>
			<TextInput
				{...props}
				style={{ ...props.style, ...styles.input }}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
				secureTextEntry={props.label === "Password" ? true : false}
			/>
			{!inputState.isValid && inputState.touched && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{props.errorText}</Text>
				</View>
			)}
		</View>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	formControl: {
		width: '100%'
	},
	label: {
		marginVertical: 8
	},
	input: {
		// empty for now
	},
	errorContainer: {
		marginVertical: 5
	},
	errorText: {
		color: 'red',
		fontSize: 13
	}
});

export default Input;
