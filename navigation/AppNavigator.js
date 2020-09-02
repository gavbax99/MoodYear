// React navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";

// Default styles
const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: "rgb(189, 189, 189)",
		height: 20
	},
};

// ***** Shop stack
const HomeNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
	}
}, {
	defaultNavigationOptions: defaultStackNavOptions,
});

export default createAppContainer(HomeNavigator);
