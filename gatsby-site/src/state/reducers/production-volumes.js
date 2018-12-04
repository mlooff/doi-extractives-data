"use strict";

import CONSTANTS from '../../js/constants';
import utils from '../../js/utils';

const initialState = {
	[CONSTANTS.FISCAL_YEAR_KEY]: {
		[CONSTANTS.PRODUCTION_VOLUMES_OIL_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_GAS_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_COAL_KEY]: undefined
	},
	[CONSTANTS.CALENDAR_YEAR_KEY]: {
		[CONSTANTS.PRODUCTION_VOLUMES_OIL_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_GAS_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_COAL_KEY]: undefined
	},
	SourceData: {
		[CONSTANTS.PRODUCTION_VOLUMES_OIL_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_GAS_KEY]: undefined,
		[CONSTANTS.PRODUCTION_VOLUMES_COAL_KEY]: undefined
	},
	[CONSTANTS.PRODUCTION_VOLUMES_OIL_KEY]: undefined,
	[CONSTANTS.PRODUCTION_VOLUMES_GAS_KEY]: undefined,
	[CONSTANTS.PRODUCTION_VOLUMES_COAL_KEY]: undefined
};


// Define Action Types
const HYDRATE = 'HYDRATE_PRODUCTION_VOLUMES';
const BY_YEAR = 'BY_YEAR_PRODUCTION_VOLUMES';
const BY_MONTH = 'BY_MONTH_PRODUCTION_VOLUMES';

// Define Action Creators 
export const hydrate = (key, data) => ({ type: HYDRATE, payload: data,  key: key});
export const byYear = (key, filter, options) => ({ type: BY_YEAR, payload: {filter, options},  key: key});
export const byMonth = (key, filter, options) => ({ type: BY_MONTH, payload: {filter, options},  key: key});

// Define Reducers
export default (state = initialState, action) => {
  const { type, payload, key } = action;
  //console.log(state);
  switch (type) {
    case HYDRATE:
    	let {SourceData, FiscalYear, CalendarYear} = state;
    	SourceData[key] = payload;
      return ({...state, ...getFiscalCalendarYear(key, payload, FiscalYear, CalendarYear), SourceData: SourceData});
    case BY_YEAR:
      return ({...state, [key]:groupByYear(state.SourceData[key], payload.filter, payload.options) });
    case BY_MONTH:
      return ({...state, [key]:groupByMonth(state.SourceData[key], payload.filter, payload.options, state.FiscalYear[key], state.CalendarYear[key]) });
    default:
      return state;
  }

};

/**
 * Set the most recent year available in our data
 * for Fiscal and Calendar year. Data is assumed to
 * be sorted descending by production date. If that changes
 * we should add a sort function.
 *
 * Fiscal Year is Oct (Year-1) to Sept (Year)
 * It is assumed if we have Sept data we have the fiscal year data
 * for that year.
 *
 * For Calendar Year it is assumed if we have Dec data we have 
 * all data for that year
 **/
const getFiscalCalendarYear = (key, source,fiscalYear,calendarYear) => {
	if(source === undefined) return {[CONSTANTS.FISCAL_YEAR_KEY]: undefined, [CONSTANTS.CALENDAR_YEAR_KEY]: undefined};
	
	let fiscalYearItem = source.find(item => (item.data.ProductionMonth === "September"));
	let calendarYearItem = source.find(item => (item.data.ProductionMonth === "December"));
	fiscalYear[key] = (fiscalYearItem && parseInt(fiscalYearItem.data.ProductionYear));
	calendarYear[key] = (calendarYearItem && parseInt(calendarYearItem.data.ProductionYear));
	return {[CONSTANTS.FISCAL_YEAR_KEY]: fiscalYear, 
					[CONSTANTS.CALENDAR_YEAR_KEY]: calendarYear};
}

/** 
 * 
 * @returns {Object}
 **/
const groupByYear = (source, filter, options) => {
	if(source === undefined) return source;

	let xAxisLabels, legendLabels, groupNames;
	let results = Object.entries(utils.groupBy(source, "data.ProductionYear")).map(e => ({[e[0]] : e[1] }) );

	// We assume if the data matches current year that we dont have the year of data, so we remove it
	let currentYear = new Date().getFullYear();
	results = results.filter((yearData) => parseInt(Object.keys(yearData)[0]) !== currentYear);

	results.sort((a,b) => (a[Object.keys(a)[0]][0].data.ProductionYear - b[Object.keys(b)[0]][0].data.ProductionYear));

	// Get display names before we filter the data.
	if(options && options.includeDisplayNames) {
		xAxisLabels = {};
		legendLabels = {}
		results.forEach((item) => {
			xAxisLabels[Object.keys(item)[0]] = item[Object.keys(item)[0]][0].data.DisplayYear;
			legendLabels[Object.keys(item)[0]] = item[Object.keys(item)[0]][0].data.ProductionYear+" ("+item[Object.keys(item)[0]][0].data.Units+")";
		});
	}

	if(filter) {

		// Sum volume by data key and assign year key to the result
		if(filter.sumBy) {
			results = results.map((yearData) => {
				let year = Object.keys(yearData)[0];
				let sums = [yearData[year].reduce((total, item) => {
					total[item.data[filter.sumBy]] = 
						(total[item.data[filter.sumBy]] !== undefined) ?
							total[item.data[filter.sumBy]]+item.data.Volume 
							: 
							item.data.Volume;

					return total;},{})];

				return {[year]: sums}
			});
		}
		
		if(filter.limit > 0) {
			results.splice(0,(results.length-filter.limit));
		}

	}

	// Set sub group name
	if(options && options.subGroupName) {
		groupNames = {};
		results.map((item) => {
			let key = Object.keys(item)[0];
			if(groupNames[options.subGroupName]) {
				groupNames[options.subGroupName].push(key);
			}
			else{
				groupNames[options.subGroupName] = [key];
			}
		});
	}

	return {Data:results, 
					ProductName: source[0].data.ProductName,
					Units: source[0].data.Units,
					LongUnits: source[0].data.LongUnits,
					XAxisLabels: xAxisLabels,
					LegendLabels: legendLabels,
					GroupNames: groupNames};
}

/** 
 * This data is sorted ascending by year already.
 * So an assumption is made on min and max numbers.
 * 
 * Example format:
 * {"Jan": [{"Federal onshore": 100, "Federal offshore": 100, "Native American":90}]}
 **/
const groupByMonth = (source, filter, options, fiscalYear, calendarYear) => {
	if(source === undefined) return source;

	let xAxisLabels, legendLabels, groupNames;
	let results = JSON.parse(JSON.stringify(source));

	if(filter.period === "recent" && filter.limit > 0) {
		let resultsGroupedByDate = Object.entries(utils.groupBy(source, "data.ProductionDate")).map(e => ({[e[0]] : e[1] }) );
		let resultsLimited = resultsGroupedByDate.splice(0,12);
		results = results.filter((monthData) => (Object.keys(resultsLimited[resultsLimited.length-1])[0] <= monthData.data.ProductionDate));
	}
	// Fiscal Year is Oct (Year-1) to Sept (Year)
	else if(filter.period === "fiscal") {
		let fiscalYearStart = results.find((item) => 
			(item.data.ProductionMonth === "October" && parseInt(item.data.ProductionYear) === (fiscalYear-1)));

		let fiscalYearEnd = results.find((item) => 
			(item.data.ProductionMonth === "September" && parseInt(item.data.ProductionYear) === (fiscalYear)));
		
		results = results.filter((item) => (new Date(item.data.ProductionDate) >= new Date(fiscalYearStart.data.ProductionDate) && 
					new Date(item.data.ProductionDate) <= new Date(fiscalYearEnd.data.ProductionDate) ) );
	}
	else if(filter.period === "calendar") {
		results = results.filter((item) => ( parseInt(item.data.ProductionYear) === calendarYear ) );
	}

	results = Object.entries(utils.groupBy(results, "data.ProductionMonth")).map(e => ({[e[0]] : e[1] }) );

	// Sort ascending by production date
	results.sort((a,b) => { 
			let aDate = new Date(a[Object.keys(a)[0]][0].data.ProductionDate);
			let bDate = new Date(b[Object.keys(b)[0]][0].data.ProductionDate);
			return (aDate < bDate)? -1 : (aDate == bDate)? 0 : 1;
		});


	if(options) {

		if(options.includeDisplayNames) {
			xAxisLabels = {};
			legendLabels = {}
			results.forEach((item) => {
				xAxisLabels[Object.keys(item)[0]] = item[Object.keys(item)[0]][0].data.DisplayMonth;
				legendLabels[Object.keys(item)[0]] = 
					item[Object.keys(item)[0]][0].data.DisplayMonth+'\xa0'+item[Object.keys(item)[0]][0].data.ProductionYear+' ('+item[Object.keys(item)[0]][0].data.Units+')';
			});
		}

		if(options.subGroup) {
			groupNames = {};
			results.map((item) => {
				let key = Object.keys(item)[0];
				let name = item[key][0].data[options.subGroup];
				if(groupNames[name]) {
					groupNames[name].push(key);
				}
				else{
					groupNames[name] = [key];
				}
			});
		}
	}

	if(filter) {

		// Sum volume by data key and assign month key to the result
		if(filter.sumBy) {
			results = results.map((monthData) => {
				let month = Object.keys(monthData)[0];
				let sums = [monthData[month].reduce((total, item) => {

					total[item.data[filter.sumBy]] = 
						(total[item.data[filter.sumBy]] !== undefined) ?
							total[item.data[filter.sumBy]]+item.data.Volume 
							: 
							item.data.Volume;

					return total;},{})];

				return {[month]: sums}
			});
		}

	}

	return {Data:results, 
					ProductName: source[0].data.ProductName,
					Units: source[0].data.Units,
					LongUnits: source[0].data.LongUnits,
					XAxisLabels: xAxisLabels,
					LegendLabels: legendLabels,
					GroupNames: groupNames};	
}