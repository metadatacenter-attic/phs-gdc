/**
 * Data Commons Utility functions
 */

import moment from "moment";

import {
  INDEX_VARIABLES, NOT_AVAILABLE_VALUE
} from "../constants";

/**
 * Transforms data returned from the Data Commons /stat/all API to Json in tabular format
 * See https://docs.datacommons.org/api/rest/stat_all.html for some examples of input json data.
 *
 * @param jsonData
 * @param phsVariableName
 * @param phsVariableValues
 * @param includeDates
 */
export function toTabularJsonData(jsonData, phsVariableName, phsVariableValues, includeDates) {
  let tabularJsonData = [];
  let statVars = {};

  // Extract column names and most recent date for each variable name and save them as a hashtable.
  // We assume that each variable (e.g., Count_Person) has the same most recent date (e.g., year)for all location
  // identifiers (e.g., all zip codes).
  let firstKey = (Object.keys(jsonData['placeData']))[0];
  for (let varName in jsonData['placeData'][firstKey]['statVarData']) {
    if (jsonData['placeData'][firstKey]['statVarData'][varName]["sourceSeries"]) {
      let date = getMostRecentDate(jsonData['placeData'][firstKey]['statVarData'][varName]["sourceSeries"][0]["val"])
      statVars[varName] = date;
    }
    else { // no data
      statVars[varName] = null;
    }
  }

  let rows = {}
  // Generate rows and index them by phsVariableValue (placeId)
  for (let placeId in jsonData['placeData']) {
    let placeValue = indexVariableDcidToVariableValue(phsVariableName, placeId);
    let row = {[phsVariableName]: placeValue};
    for (let statVarName in statVars) {
      let date = statVars[statVarName];
      //console.log('date', date);
      let dateFormatName = getDateFormat(date);
      if (date && jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"]) {
        row[statVarName] = jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"][0]["val"][date];
        // console.log(date);
        // console.log(jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"]);
        // If requested, include temporal information
        if (includeDates) {
          row[statVarName + '_' + dateFormatName] = date;
        }
      }
      else {
        row[statVarName] = NOT_AVAILABLE_VALUE;
        if (includeDates) {
          row[statVarName + '_' + dateFormatName] = NOT_AVAILABLE_VALUE;
        }
      }
    }
    rows[placeValue] = row;
  }

  // Generate the final tabular data (it may contain duplicated rows)
  phsVariableValues.forEach(placeValue => {
    tabularJsonData.push(rows[placeValue]);
  });

  return tabularJsonData;
};

/**
 * Given an object with key-value pairs, where each key is a date, retrieve the most recent date
 * Example (with years): { "2012": 8710, "2020": 8680, "2018": 8831 } -> 2020
 * @param data
 * TODO: make it work for other date formats if needed (e.g., months, weeks, etc.)
 */
function getMostRecentDate(data) {
  let mostRecentDate = Object.keys(data).sort().reverse()[0];
  return parseInt(mostRecentDate);
};

/**
 * Returns a string representing format in which the date is expressed. For example, if the date is '2018', it would
 * return 'Year'.
 * This function uses Moment.js: https://momentjs.com/
 * @param date
 */
function getDateFormat(date) {
  const DEFAULT_FORMAT_NAME = 'Date';
  const YYYY_FORMAT_NAME = 'Year';
  if (moment(date, "YYYY", true).isValid()) {
    return YYYY_FORMAT_NAME;
  }
  // else if (...) // Add other formats when needed
  else {
    return DEFAULT_FORMAT_NAME;
  }
}

/**
 * Translates the value of an index variable to a DC node identifier (e.g., 94306 -> zip/94306)
 * @param variableKey Key of the variable in the variables map (e.g., zipCode)
 * @param variableValue Variable value (e.g., 94306)
 */
export function indexVariableValueToDcid(variableKey, variableValue) {
  if (variableKey in INDEX_VARIABLES) {
    let prefix = INDEX_VARIABLES[variableKey].dcidValuePrefix;
    if (prefix) {
      return prefix.concat(variableValue);
    }
    else {
      return variableValue;
    }
  }
};

export function indexVariableDcidToVariableValue(variableKey, variableValueDcid) {
  if (variableKey in INDEX_VARIABLES) {
    return variableValueDcid.replace(INDEX_VARIABLES[variableKey].dcidValuePrefix, '');
  }
};

















