// React navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MonthDetailScreen from "../screens/MonthDetailScreen";
import AuthScreen from "../screens/AuthScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Tools
import Tools from "../constants/Tools";

// Default styles
const defaultStackNavOptions = {
	headerStyle: {
		height: 0,
	},
	cardStyle: { 
		backgroundColor: Tools.colorBackground,
	},
	gestureEnabled: false,
};

// ***** Shop stack
const HomeNavigator = createStackNavigator({
	Login: {
		screen: AuthScreen,
	},
	Home: {
		screen: HomeScreen,
	}, 
	MonthDetail: {
		screen: MonthDetailScreen
	},
	Settings: {
		screen: SettingsScreen
	}
}, {
	defaultNavigationOptions: defaultStackNavOptions,
});

export default createAppContainer(HomeNavigator);
