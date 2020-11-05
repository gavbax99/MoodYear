// React
import React from 'react';
import { 
	StyleSheet, 
	View, 
	Image,
	TouchableOpacity
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Redux
import { useDispatch } from "react-redux";
import { setHeaderHeight, loadData } from "../store/actions/actions";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Constants
import Tools from '../constants/Tools';

// Data
import Year2020 from "../data/Year2020";

// Redux
import { useSelector } from "react-redux";


// ==================== Component
const AppHeader = props => {

	const dispatch = useDispatch();

	const findHeaderHeight = (event) => {
		const { height } = event.nativeEvent.layout;
		dispatch(setHeaderHeight(height));
	};

	// 
	const changeData = () => {
		const year = new Date().getFullYear();
		dispatch(loadData({ [year]: Year2020[year] }));
	}
	// 

	// 
	const data = useSelector(state => state.dataReducer.data);
	const auth = useSelector(state => state.authReducer.userId);
	const test = () => {
		console.log("uid from appheader", auth);
	}
	// 

	const HeaderImage = () => {
		if (props.backButton) {
			return (
				<View style={styles.svgContainer}>
					<Svg style={{ 
						transform: [{ rotateZ: "180deg" }],
						shadowColor: '#000',
						shadowOffset: { width: 0, height: -3 },
						shadowRadius: 2,
						shadowOpacity: 1, }} 
						width={14} 
						height={16} 
						viewBox="0 0 14 16">
						<Path fill={Tools.color3} d={Tools.arrowPath} />
					</Svg>
				</View>
			);
		} else {
			return (
				<Image 
					style={styles.logoImage}
					source={require("../assets/images/sober-logo.png")}
					/>
			);
		}
	};

	return (
		<View style={styles.header} onLayout={findHeaderHeight}>
			{/* Logo */}
			<TouchableOpacity 
				activeOpacity={Tools.activeOpacity} 
				style={{padding: Tools.paddingNormal}} 
				// onPress={() => {props.navigation.goBack()}}>
				onPress={test}>
				<HeaderImage />
			</TouchableOpacity>

			{/* Text */}
			<TouchableOpacity 
				activeOpacity={Tools.activeOpacity} 
				style={styles.textContainer} 
				onPress={changeData}>
				<Ionicons style={{paddingHorizontal: 6}}name="ios-more" size={24} color="#ffffff" />
			</TouchableOpacity>
		</View>
	);
}

// ==================== Styles
const styles = StyleSheet.create({
	header: {
		width: "100%",
		backgroundColor: Tools.colorHeaderGrey,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: 'center',
		zIndex: 999,
	},
	logoImage: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
	headerText: {
		color: Tools.colorLight,
		fontSize: 18,
		fontWeight: "600",
	},
	textContainer: {
		padding: Tools.paddingNormal,
		flexDirection: "row",
	},

	svgContainer: {
		paddingHorizontal: 12, 
		height: 20, 
		justifyContent: "center",
		alignItems: "center",
	}
});

export default AppHeader;