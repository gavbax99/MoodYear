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
	// const getMonth = date.getMonth();
	// const getDay = date.getDate();

	const data = useSelector(state => state.dataReducer.data);
	const years = useSelector(state => state.dataReducer.years);
	const uid = useSelector(state => state.authReducer.userId);

	// ASYNC: load the active years of the user (not year data)
	const loadActiveYear = async () => {
		dispatch(loadActiveYears(uid));
	}

	// ASYNC: loads the year data of the current year (first time page load; year can change in settings)
	const loadYearData = async () => {
		dispatch(loadData(uid, getYear));
	}

	// ASYNC: adds a new active year to the user's active years based on current year if they have none
	const loadNewActiveYear = async () => {
		dispatch(loadYearsArray(uid, getYear));
	}

	// ASYNC: if they don't have the active year, grab it from FB and put it into their data
	const loadNewEmptyYearFromCalendar = async () => {
		dispatch(updateEmptyYear(uid, getYear));
	}

	// the fucking thing works? what?
	useEffect(() => {
		console.log("THIS SHOULD ONLY HAPPEN ONCE")
		loadActiveYear().then(() => {
			if (years !== null) {
				loadYearData();
			} else {
				loadNewActiveYear().then(() => {
					loadNewEmptyYearFromCalendar()
				})
			}
		})
	}, [uid]);

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


			// GRAIL
	// useEffect(() => {
	// 	dispatch(loadData(uid, getYear));
	// }, [uid]);


	// CONDITIONAL YEAR LOADING/YEAR CREATION:
	// If the user doesn't have the active year in their currentYears, load that empty data from FB and push into their account
	// useEffect(() => {
	// 	// console.log(years.includes(getYear.toString()))
	// 	if (years.includes(getYear.toString())) {
	// 		if (years.includes(getYear.toString())) {
	// 			dispatch(loadData(uid, getYear));
	// 		} else if (years.includes(getYear.toString()) === false) {
	// 			// should only fire once per year or when they first login
	// 			dispatch(updateEmptyYear(uid, getYear));
	// 		}
	// 	}
	// }, [years])



	// useEffect(() => {
	// 	dispatch(loadActiveYears(uid));
	// }, [uid]);

	// useEffect(() => {
	// 	console.log("USEEFFECT temporary to check years in homescreen calendar: ", years);
	// 	console.log("checking null value of years in homescreen: ", years === null);
	// 	if (years !== null) {
	// 		console.log("loading data")
	// 		dispatch(loadData(uid, getYear));
	// 	} else {
	// 		console.log("init data")
	// 		// should only fire once per year or when they first login
	// 		dispatch(loadYearsArray("ip6v6kUBvShVaxOnJPmePBjuVsy1", getYear));
	// 		dispatch(updateEmptyYear(uid, getYear));
	// 	}
	// }, [years])


	// ON HOME SCREEN, FIRST LOAD THE USER'S ACTIVE YEARS (only re-loads when uid/token is refreshed)
	// const token = useSelector(state => state.authReducer.token); <- USE THIS INSTEAD OF UID?
	// useEffect(() => {
	// 	dispatch(loadData(uid, getYear));
	// }, [uid]);
