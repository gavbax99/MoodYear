// React navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MonthDetailScreen from "../screens/MonthDetailScreen";
import TestScreen from "../screens/TestScreen";

// Default styles
const defaultStackNavOptions = {
	headerStyle: {
		height: 0,
	},
};

// ***** Shop stack
const HomeNavigator = createStackNavigator({
	Home: {
		// screen: HomeScreen,
		screen: TestScreen,
	}, 
	MonthDetail: {
		screen: MonthDetailScreen
	}
}, {
	defaultNavigationOptions: defaultStackNavOptions,
});

export default createAppContainer(HomeNavigator);
