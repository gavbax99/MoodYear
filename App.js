// React
import React from 'react';
import { StatusBar } from "react-native";

// Screens
import { enableScreens } from 'react-native-screens';

// Nav
import AppNavigator from "./navigation/AppNavigator";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducers/index";
import ReduxThunk from "redux-thunk";

// Setup
StatusBar.setHidden(true);
enableScreens();

// Redux with Reduxthunk middleware applied
const store = createStore(reducer, applyMiddleware(ReduxThunk));

// App
export default function App() {
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
};
