// React
import React, { useEffect, useState } from 'react';
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
import { loadData, loadActiveYears, updateEmptyYear, loadYearsArray } from "../store/actions/actions";

// ==================== Component
const HomeScreenCalendar = props => {

	const dispatch = useDispatch();

	console.log("homescreen calendar rere");

	const date = new Date();
	const getYear = date.getFullYear();

	const data = useSelector(state => state.dataReducer.data);
	const years = useSelector(state => state.dataReducer.years);
	const yearsLoaded = useSelector(state => state.dataReducer.yearsLoaded);
	const uid = useSelector(state => state.authReducer.userId);

	// ASYNC: load the active years of the user (not year data)
	const loadActiveYear = async () => {
		dispatch(loadActiveYears(uid));
	}

	// // ASYNC: loads the year data of the current year (first time page load; year can change in settings)
	const loadYearData = async () => {
		dispatch(loadData(uid, getYear));
	}

	// // ASYNC: adds a new active year to the user's active years based on current year if they have none
	const loadNewActiveYear = async () => {
		dispatch(loadYearsArray(uid, getYear));
	}

	// // ASYNC: if they don't have the active year, grab it from FB and put it into their data
	const loadNewEmptyYearFromCalendar = async () => {
		dispatch(updateEmptyYear(uid, getYear));
	}

	// the fucking thing works? what?
	// const token = useSelector(state => state.authReducer.token); <- USE THIS INSTEAD OF UID?
	useEffect(() => {
		loadActiveYear();
	}, [uid]);

	useEffect(() => {
		if (yearsLoaded === false) return;

		if (years !== null) {
			loadYearData();
		} else if (years === null) {
			loadNewActiveYear().then(() => {
				loadNewEmptyYearFromCalendar()
			})
		}
	}, [yearsLoaded, years]);	

	// Loading componenet
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
					data.months.map((monthObj) => {
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