/**
 * Data Commons Utility functions
 */


import {
  INDEX_VARIABLE_NAME_CITY,
  INDEX_VARIABLE_NAME_COUNTY,
  INDEX_VARIABLE_NAME_STATE,
  INDEX_VARIABLE_NAME_ZIP_CODE, NOT_AVAILABLE_VALUE
} from "../constants";

/**
 * Transforms data returned from the Data Commons /stat/all API to Json in tabular format
 * See https://docs.datacommons.org/api/rest/stat_all.html for some examples of input json data.
 *
 * @param jsonData
 * @param phsVariableName
 * @param phsVariableValues
 */
export function toTabularJsonData(jsonData, phsVariableName, phsVariableValues) {

  console.log(jsonData);

  let tabularJsonData = [];
  let statVars = {};

  // Extract column names and most recent year for each variable name and save them as a hashtable.
  // To improve performance, we assume that a particular variable has the same years for all location identifiers
  let firstKey = (Object.keys(jsonData['placeData']))[0];
  for (let varName in jsonData['placeData'][firstKey]['statVarData']) {
    if (jsonData['placeData'][firstKey]['statVarData'][varName]["sourceSeries"]) {
      let year = getLatestYear(jsonData['placeData'][firstKey]['statVarData'][varName]["sourceSeries"][0]["val"])
      statVars[varName] = year;
    }
    else { // no data
      statVars[varName] = null;
    }
  }

  console.log(statVars);

  let rows = {}
  // Generate rows and index them by phsVariableValue (placeId)
  for (let placeId in jsonData['placeData']) {
    let placeValue = dcidToIndexVariableValue(placeId, phsVariableName);
    let row = {[phsVariableName]: placeValue};
    for (let statVarName in statVars) {
      let year = statVars[statVarName];
      if (jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"]) {
        row[statVarName] = jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"][0]["val"][year];
      }
      else {
        row[statVarName] = NOT_AVAILABLE_VALUE;
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
 * Given an object with key-value pairs, where each key is a year, retrieve the most recent year
 * Example: { "2012": 8710, "2020": 8680, "2018": 8831 } -> 2020
 * @param data
 */
function getLatestYear(data) {
  let latestYear = Object.keys(data).sort().reverse()[0];
  return parseInt(latestYear);
};

/**
 * Translates a value of an index variable to a DC node identifier (e.g., 94306 -> zip/94306)
 * @param value Variable value (e.g., 94306)
 * @param variableName Name of the variable (e.g., zip code)
 */
export function indexVariableValueToDcid(variableValue, variableName) {
  if (variableValue && variableValue.length > 0) {
    if (variableName === INDEX_VARIABLE_NAME_STATE) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_COUNTY) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_CITY) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_ZIP_CODE) {
      return 'zip/' + variableValue;
    }
  }
};

export function dcidToIndexVariableValue(dcid, variableName) {
  if (dcid && dcid.length > 0) {
    if (variableName === INDEX_VARIABLE_NAME_STATE) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_COUNTY) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_CITY) {
      //TODO
    } else if (variableName === INDEX_VARIABLE_NAME_ZIP_CODE) {
      return dcid.replace('zip/', '');
    }
  }
};

















