// React
import React, {
	useState,
	useReducer,
	useCallback,
	useEffect,
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	Image,
	Linking
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { login, signup } from "../store/actions/actions";

// Constants 
import Tools from '../constants/Tools';

// Components
import Input from "../components/Input";

// Static functions
const handleTouchableWithoutFeedback = () => {
	Keyboard.dismiss();
};

// Form state and reducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const initialState = {
	inputValues: {
		email: "",
		password: "",
	},
	inputValidities: {
		email: false,
		password: false,
	},
	formIsValid: false,
};

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}

		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		};
	}
	return state;
};

// ==================== Component ====================
const AuthScreen = props => {

	// Redux
	const dispatch = useDispatch();
	const headerHeight = useSelector(state => state.navReducer.headerHeightState);
	
	const uid = useSelector(state => state.authReducer.userId);
	const token = useSelector(state => state.authReducer.token);

	// State
	const [formState, dispatchFormState] = useReducer(formReducer, initialState);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [toggleCheckBox, setToggleCheckBox] = useState(false)

	// Login -> reg
	const switchLogin = () => {
		setToggleCheckBox(false);
		setIsLogin(!isLogin);
	};

	// Toggle checkbox
	const handleCheckboxToggle = () => {
		setToggleCheckBox(!toggleCheckBox);
	};

	// Handle login/reg
	const loginHandler = async () => {
		setError(null);
		setIsLoading(true);

		// If not valid, stop
		if (!formState.inputValidities.email) {
			setIsLoading(false);
			setError("Please enter a valid email.");
			return;
		} else if (!formState.inputValidities.password) {
			setIsLoading(false);
			setError("Please enter a valid password.");
			return;
		}

		// Try to login or register with email/pass
		try {
			if (isLogin) {
				await dispatch(login(formState.inputValues.email.trim(), formState.inputValues.password.trim()));
				setIsLoading(false);
				props.navigation.replace("Home");
			} else {
				if (toggleCheckBox === true) {
					await dispatch(signup(formState.inputValues.email.trim(), formState.inputValues.password.trim()));
					setIsLogin(true);
					setToggleCheckBox(false);
					setIsLoading(false);
					props.navigation.replace({
						routeName: "Ftue",
						params: { newUser: true },
					});
				} else {
					setIsLoading(false);
					Alert.alert("Privacy Policy", "Please read our Privacy Policy and check the associated box.", [{ text: "Okay" }]);
				}
			}
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	// Error logging
	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
		}
	}, [error]);

	// Input change handler
	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	);

	return (
		<TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={headerHeight}
				style={{ flex: 1 }}>
				<View style={styles.screen}>

					{/* Title text */}
					<View style={{ width: "100%", marginBottom: Tools.paddingNormal }}>
						<Text style={styles.titleText}>MoodYear</Text>
						<View style={{
							...styles.underTitleBar,
							backgroundColor: isLogin === true ? Tools.color3 : Tools.color4
							}}></View>
					</View>

					{/* Email */}
					<Input
						id="email"
						label="Email"
						onInputChange={inputChangeHandler}

						email
						required
						minLength={5}
						autoCapitalize={"none"}
						errorText={"Please enter a valid email address."}

						style={styles.textInput}
						placeholder={"Email"}
						placeholderTextColor={"#fff"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						keyboardType={"email-address"}
					/>

					{/* Password */}
					<Input
						id="password"
						label="Password"
						onInputChange={inputChangeHandler}

						required
						minLength={8}
						autoCapitalize={"none"}
						errorText={"Please enter a valid password (8 or more characters)."}

						style={styles.textInput}
						placeholder={"Password"}
						placeholderTextColor={"#fff"}
						selectionColor={Tools.colorLight}
						keyboardAppearance={"dark"}
						keyboardType={"default"}
					/>

					{/* Switch login/reg state text */}
					<View style={styles.switchTextContainer}>
						<Text style={styles.switchText}>
							{isLogin ? "Don't have an account? " : "Already have an account? "}
						</Text>
						<TouchableOpacity onPress={switchLogin}>
							<Text style={{ ...styles.switchText, ...styles.switchTextButton }}>
								{isLogin ? "Register now." : "Login now."}
							</Text>
						</TouchableOpacity>
					</View>

					{/* If reg, check box for PP */}
					{!isLogin?
						<View style={styles.ppContainer}>
							<TouchableOpacity 
								style={{
									...styles.checkbox,
									backgroundColor: toggleCheckBox === false ? Tools.colorBackground : Tools.color4
								}}
								activeOpacity={1}
								onPress={handleCheckboxToggle}>
								<Image
									style={{ width: 30, height: 30 }}
									source={require("../assets/images/check_pp.png")}
									resizeMode={"contain"} 
								/>
							</TouchableOpacity>

							<Text style={styles.ppText}>I have read the </Text>
							<TouchableOpacity onPress={() => { Linking.openURL("https://gavinbaxter.com/moodyear-privacy-policy.html"); }}>
								<Text style={{ ...styles.switchTextButton, fontSize: 16 }}>Privacy Policy.</Text>
							</TouchableOpacity>
						</View>
						:
						null
					}

					{/* If loading, show loading icon. Otherwise show login button */}
					{isLoading ?
						<ActivityIndicator 
							style={{marginTop: Tools.paddingDouble}}
							size="large" 
							color={Tools.color5} 
						/>
						:
						<TouchableOpacity style={{ 
								...styles.button, 
								backgroundColor: isLogin ? Tools.color3 : Tools.color4 
							}} 
							onPress={loginHandler}
							activeOpacity={Tools.activeOpacity}>
							<Text style={{ 
									color: isLogin ? Tools.colorLight : Tools.colorLight, 
									fontSize: 18 
								}}>
								{isLogin ? "Login" : "Register"}
							</Text>
							<Svg style={{ marginLeft: 10 }}
								width={8}
								height={10}
								viewBox="0 0 14 16">
								<Path fill={Tools.colorLight} d={Tools.arrowPath} />
							</Svg>
						</TouchableOpacity>
					}

				</View>

				{/* DEV TOOL */}
				{/* <TouchableOpacity 
					style={{width: 100, height: 100, backgroundColor: "red"}}
					onPress={() => {
						console.log("test: ", uid, token);
					}} 
				/> */}
				{/* DEV TOOL */}

				{/* onPress={() => {props.navigation.navigate({
						routeName: "Ftue", 
						params: { newUser: true },
						// params: { display: "About" },
					})
				}} */}

			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

// ==================== Styles ====================
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundColor: Tools.colorBackground,
		padding: Tools.paddingDouble,
	},
	titleText: {
		width: "100%",
		fontSize: 40,
		fontWeight: "700",
		color: Tools.color5,
	},
	textInput: {
		marginTop: Tools.paddingNormal,
		minWidth: "100%",
		maxWidth: "100%",
		height: 46,
		backgroundColor: Tools.colorTextboxGrey,
		color: Tools.colorLight,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 8,
		borderRadius: 3,
		fontSize: 18
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: Tools.paddingDouble,
		paddingVertical: Tools.paddingNormal,
		paddingHorizontal: Tools.paddingDouble,
		borderRadius: 3,
	},
	switchTextContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	switchText: {
		color: Tools.colorLight,
		fontSize: 16,
		paddingTop: Tools.paddingNormal,
	},
	switchTextButton: {
		color: Tools.accentColor,
	},
	underTitleBar: {
		width: 184,
		height: 5,
		borderRadius: 4,
	},
	ppContainer: {
		width: "100%",
		flexDirection: "row",
		paddingTop: Tools.paddingLarge,
		alignItems: "center"
	},
	ppText: {
		color: Tools.colorLight,
		fontSize: 16,
		paddingLeft: Tools.paddingNormal,
	},
	checkbox: {
		alignItems: "center",
		justifyContent: "center",
		width: 30,
		height: 30,
		borderWidth: 2,
		borderColor: Tools.color4,
		borderRadius: 3,
	},
});

export default AuthScreen;

