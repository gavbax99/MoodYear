// React
import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator
} from 'react-native';

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
	loadData,
	loadActiveYears,
	updateEmptyYear,
	putNewActiveYear
} from "../store/actions/actions";

// Constants
import Tools from '../constants/Tools';

// Components
import HomeScreenMonth from '../components/HomeScreenMonth';

// ==================== Component ====================
const HomeScreenCalendar = props => {

	// Redux
	const dispatch = useDispatch();
	const yearsLoaded = useSelector(state => state.dataReducer.yearsLoaded);
	const years = useSelector(state => state.dataReducer.years);
	const data = useSelector(state => state.dataReducer.data);
	const uid = useSelector(state => state.authReducer.userId);

	// Current year var
	const currentYear = new Date().getFullYear();

	// ASYNC #1: load the active years of the user (not year data)
	const loadActiveYear = async () => {
		dispatch(loadActiveYears(uid));
	};

	// ASYNC #2 (primary load): loads the year data of the current year (first time page load; year can change in settings)
	const loadYearData = async () => {
		dispatch(loadData(uid, currentYear));
	};

	// ASYNC #3 (pairs with #4): adds a new active year to the user's active years based on current year if they have none
	const loadNewActiveYear = async () => {
		dispatch(putNewActiveYear(uid, currentYear));
	};

	// ASYNC #4: if #3 fired, grab that year from the database and put it into their data
	const loadNewEmptyYearFromCalendar = async () => {
		dispatch(updateEmptyYear(uid, currentYear));
	};

	// FIRST call to database; loads active years
	useEffect(() => {
		if (uid === null) return;

		loadActiveYear();
	}, [uid]);

	// SECOND call to database; once active years are loaded, either loads current year or creats new calendar if year not found
	useEffect(() => {
		if (yearsLoaded === false || years === null || uid === null || years.error !== undefined) return;

		if (years[currentYear] === currentYear) {
			if (Object.keys(data).length === 0) {
				loadYearData();
			}
		} else if (years[currentYear] === undefined && years.error !== undefined) {
			// CAN OVERWRITE USER DATA IF NOT CAREFUL
			// should check if year exists before even trying
			loadNewActiveYear().then(() => {
				loadNewEmptyYearFromCalendar()
			});
		}
	}, [yearsLoaded, years, uid]);

	// Loading custom component
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
					:
					<Loading />
				}

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