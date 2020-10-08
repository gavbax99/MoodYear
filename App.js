import React, { useEffect } from 'react';
import { StatusBar } from "react-native";

// Font
//import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

// Screens
import { enableScreens } from 'react-native-screens';

// Nav
import AppNavigator from "./navigation/AppNavigator";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducers/index";
import ReduxThunk from "redux-thunk";

// ====================

StatusBar.setHidden(true);
enableScreens();

// redux with reduxthunk middleware applied
const store = createStore(reducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
// 	return Font.loadAsync({
// 		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
// 		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
// 	});
// };

// ====================

// App
export default function App() {

	useEffect(() => {
		console.log("app use effect");
	});

	console.log("App render");
	
	//const [fontLoaded, setFontLoaded] = useState(false);

	// if (!fontLoaded) {
	// 	return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
	// }

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
};
