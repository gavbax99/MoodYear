// React
import React from "react";
import { 
	StyleSheet, 
	View, 
	ScrollView,
	SafeAreaView, 
	Text,
	KeyboardAvoidingView, 
} from "react-native";

// Redux
import { useSelector } from "react-redux";

// Constants
import Tools from '../constants/Tools';

// Components
import FaceSlider from "./FaceSlider";

// ==================== Component
const MonthDetailBottomCard = props => {

	return (
		<View style={styles.screen}>

			{/* Icon and slider */}
			<FaceSlider 
				day={props.dayOfWeek} 
				dayDate={`${props.monthNo+1}/${props.dayNo}/${props.yearInt}`} 
				showSlider={false}
				faceColor={props.faceColor}
				colorNumber={props.colorNumber}
				/>

			{/* Text row */}
			<View style={styles.bottomTextView}>
				<ScrollView style={styles.scrollView}>
					<Text style={props.message.length > 0 ? styles.bottomText : {...styles.bottomText, color: Tools.colorBackground}}>
						{props.message.length > 0 ? props.message : "No entry." }
					</Text>
				</ScrollView>
			</View>


			{/* <ScrollView 
				style={styles.scrollView} 
				contentContainerStyle={styles.contentContainer}
				>

				<Text style={styles.paragraph}>
					This is a ScrollView example HEADER.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example paragraph.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example paragraph.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example paragraph.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example paragraph.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example paragraph.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example FOOTER.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example FOOTER.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example FOOTER.
				</Text>
				<Text style={styles.paragraph}>
					This is a ScrollView example FOOTER.
				</Text>

			</ScrollView> */}

		</View>
	);
};

// ==================== Styles
const styles = StyleSheet.create({
	screen: {
		height: 218,
		minWidth: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: Tools.paddingNormal,
		backgroundColor: Tools.colorBackground,
		paddingBottom: Tools.paddingLarge,
		zIndex: 999,
		// borderWidth: 1,
		// borderColor: 'green'
	},

	bottomTextView: {
		flex: 1,
		width: "100%",
		// minHeight: 96,
		// maxHeight: 96,
		marginTop: Tools.paddingNormal,
		backgroundColor: Tools.colorTextboxGrey,
		borderRadius: 5,
	},
	bottomText: {
		flex: 1,
		minWidth: "100%",
		color: Tools.colorLight,
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 8,
		lineHeight: 20,
		fontSize: 16,
		// borderWidth: 1,
		// borderColor: 'blue'
	},
	scrollView: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: 'red',
	},


	// paragraph: {
	// 	margin: 24,
	// 	fontSize: 18,
	// 	fontWeight: 'bold',
	// 	textAlign: 'center',
	//   },
	//   scrollView: {
	// 	height: '100%',
	// 	width: '100%',
	// 	margin: 20,
	// 	alignSelf: 'center',
	// 	padding: 20,
	// 	borderWidth: 5,
	// 	borderRadius: 5,
	// 	borderColor: 'black',
	// 	backgroundColor: 'lightblue'
	//   },
	//   contentContainer: {
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: 'lightgrey',
	// 	paddingBottom: 50
	//   }
});

export default MonthDetailBottomCard;