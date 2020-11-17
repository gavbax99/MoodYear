// React
import React, { useEffect } from 'react';
import { 
	StyleSheet, 
	View,
	ActivityIndicator
} from 'react-native';

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loadData, loadActiveYears, updateEmptyYear } from "../store/actions/actions";

// ==================== Component
const HomeScreenCalendar = props => {

	const dispatch = useDispatch();

	console.log("HomeScreenCalendar render");

	const date = new Date();
	const getYear = date.getFullYear();
	const getMonth = date.getMonth();
	const getDay = date.getDate();

	const data = useSelector(state => state.dataReducer.data);
	const years = useSelector(state => state.dataReducer.years);
	const uid = useSelector(state => state.authReducer.userId);

	// ON HOME SCREEN, FIRST LOAD THE USER'S ACTIVE YEARS (only re-loads when uid/token is refreshed)
	// const token = useSelector(state => state.authReducer.token); <- USE THIS INSTEAD OF UID?
	useEffect(() => {
		dispatch(loadActiveYears(uid));

	}, [uid]);

	// CONDITIONAL YEAR LOADING/YEAR CREATION:
	// If the user doesn't have the active year in their currentYears, load that empty data from FB and push into their account
	useEffect(() => {
		// console.log(years.includes(getYear.toString()))
		if (years.includes(getYear.toString())) {
			if (years.includes(getYear.toString())) {
				dispatch(loadData(uid, getYear));
			} else if (years.includes(getYear.toString()) === false) {
				// should only fire once per year or when they first login
				dispatch(updateEmptyYear(uid, getYear));
			}
		}
	}, [years])

	const Loading = () => {
		return (
			<View style={styles.loadingIconContainer}>
				<ActivityIndicator size="large" color={Tools.color5} />
			</View>
		);
	};

	return (
		<View style={styles.calendar}>

			{/* List of months */}
			<View style={styles.calendarInner}>

				{/* Render our months */}
				{Object.keys(data).length !== 0 ? 
					data.months.map((monthObj, i) => {
						return (
							<HomeScreenMonth 
								year={data.yearInt}
								monthObj={monthObj}
								navigation={props.navigation}
								key={monthObj.name} 
								/>
						);
					}) 
				: <Loading/>}

			</View>

		</View>
	);
};

// ==================== Styles
const styles = StyleSheet.create({
	calendar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	calendarInner: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		padding: Tools.paddingHalf,
	},
	loadingIconContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreenCalendar;