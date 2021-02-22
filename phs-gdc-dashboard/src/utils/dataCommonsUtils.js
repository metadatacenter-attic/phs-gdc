/**
 * Data Commons Utility functions
 */

//import moment from "moment";
import STATE_TO_FIPS from './../resources/locationData/stateToFips';
import FIPS_TO_STATE from './../resources/locationData/fipsToState';

import CITY_TO_FIPS from './../resources/locationData/cityToFips';
import FIPS_TO_CITY from './../resources/locationData/fipsToCity';

import {
  INDEX_VARIABLE_CITY_NAME,
  INDEX_VARIABLE_COUNTY_NAME,
  INDEX_VARIABLE_STATE_NAME, INDEX_VARIABLE_ZIPCODE_NAME,
  INDEX_VARIABLES, NOT_AVAILABLE_VALUE
} from "../constants";
import stateZipCodes from "../resources/locationData/zipCodesByState";

/**
 * Transforms data returned from the Data Commons /stat/all API to Json in tabular format
 * See https://docs.datacommons.org/api/rest/stat_all.html for some examples of input json data.
 *
 * @param jsonData
 * @param phsVariableName
 * @param phsVariableValues
 * @param dcVariableNames
 * @param includeDates
 * @param includeDatesOption
 */
export function toTabularJsonData(jsonData, phsVariableName, phsVariableValues, dcVariableNames, includeDates, includeDatesOption) {
  let tabularJsonData = [];

  let rows = {}
  // Generate rows and index them by phsVariableValue (placeId)
  let colNamesIncludeDatesOptionHeader = new Set();
  for (let placeId in jsonData['placeData']) {
    console.log('placeId', placeId);
    let placeValue = indexVariableDcidToVariableValue(phsVariableName, placeId);
    console.log('placeValue', placeValue);
    let row = {[phsVariableName]: placeValue};
    for (let i = 0; i < dcVariableNames.length; i++) {
      let dcVarName = dcVariableNames[i];
      let colName = dcVarName;
      // Check if there is any data for the given placeId and variable...
      if (jsonData['placeData'][placeId]['statVarData'][dcVarName]['sourceSeries']) {
        let date = getMostRecentDate(jsonData['placeData'][placeId]['statVarData'][dcVarName]["sourceSeries"][0]["val"]);
        // If requested, include temporal information in the column header
        if (includeDates && includeDatesOption === 'header') {
          colName = colName + '_' + date;
          colNamesIncludeDatesOptionHeader.add(colName);
        }
        row[colName] = jsonData['placeData'][placeId]['statVarData'][dcVarName]["sourceSeries"][0]["val"][date];
        // If requested, include temporal information as an additional column
        if (includeDates && includeDatesOption === 'column') {
          row[colName + '_Date'] = date;
        }
        console.log('row', row)
      } else { // no data
        if (includeDates) {
          if (includeDatesOption === 'header') {
            // Can't do anything because I don't know the name(s) of the columns whose headers contain dates
          } else if (includeDatesOption === 'column') {
            row[colName] = NOT_AVAILABLE_VALUE;
            row[colName + '_Date'] = NOT_AVAILABLE_VALUE;
          } else {
            console.error('Invalid option: ' + includeDatesOption);
          }
        } else {
          row[colName] = NOT_AVAILABLE_VALUE;
        }
      }
    }
    rows[placeValue] = row;
  }

  if (includeDates && includeDatesOption === 'header') {
    // Fill out any missing cell with NAs if needed
    colNamesIncludeDatesOptionHeader.forEach(cName => {
      Object.keys(rows).forEach(function (key) {
        if (!(cName in rows[key])) {
          rows[key][cName] = NOT_AVAILABLE_VALUE;
        }
      });
    });
  }
  ;

  console.log('rows', rows);
  console.log('phsVariableValues', phsVariableValues);

  phsVariableValues.forEach(indexVariableValue => {
    indexVariableValue = indexVariableValueToStandardValue(phsVariableName, indexVariableValue);
    if (indexVariableValue && indexVariableValue in rows) { // Discard undefined values
      tabularJsonData.push(rows[indexVariableValue]);
    }
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
// function getDateFormat(date) {
//   const DEFAULT_FORMAT_NAME = 'Date';
//   const YYYY_FORMAT_NAME = 'Year';
//   if (moment(date, "YYYY", true).isValid()) {
//     return YYYY_FORMAT_NAME;
//   }
//   // else if (...) // Add other formats when needed
//   else {
//     return DEFAULT_FORMAT_NAME;
//   }
// }

/**
 * Translates the value of an index variable to a DC node identifier (e.g., 94306 -> zip/94306)
 * @param variableKey Key of the variable in the variables map (e.g., zipCode)
 * @param variableValue Variable value (e.g., 94306)
 */
export function indexVariableValueToDcid(indexVariable, indexVariableValue) {
  if (indexVariable in INDEX_VARIABLES) {
    let prefix = INDEX_VARIABLES[indexVariable].dcidValuePrefix;
    return prefix.concat(indexVariableValueToFips(indexVariable, indexVariableValue));
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
};

export function indexVariableValueToFips(indexVariable, indexVariableValue) {
  if (indexVariable in INDEX_VARIABLES) {
    if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
      let fips = stateToFips(indexVariableValue);
      if (fips) {
        return fips;
      }
    } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {

    } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
      let fips = cityToFips(indexVariableValue);
      if (fips) {
        return fips;
      }
    } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
      return indexVariableValue;
    }
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
};


export function indexVariableDcidToVariableValue(indexVariable, indexVariableValueDcid) {
  if (indexVariable in INDEX_VARIABLES) {
    let prefix = INDEX_VARIABLES[indexVariable].dcidValuePrefix;
    if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
      return fipsToState(indexVariableValueDcid.replace(prefix, ''));
    } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {

    } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
      return fipsToCity(indexVariableValueDcid.replace(prefix, ''));
    } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
      return indexVariableValueDcid.replace(prefix, '');
    }
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
};

function stateToFips(state) {
  let variations = preprocessAndExpand(state);
  for (let i = 0; i < variations.length; i++) {
    if (variations[i] in STATE_TO_FIPS) {
      return STATE_TO_FIPS[variations[i]];
    }
  }
  console.error("State not found: " + state);
};

function fipsToState(fips) {
  if (fips in FIPS_TO_STATE) {
    return FIPS_TO_STATE[fips];
  } else {
    console.error("Fips not found in FIPS-to-State map: " + fips);
  }
};

function cityToFips(city) {
  let variations = preprocessAndExpand(city);
  for (let i = 0; i < variations.length; i++) {
    if (variations[i] in CITY_TO_FIPS) {
      return CITY_TO_FIPS[variations[i]];
    }
  }
  console.error("City not found: " + city);
};

function fipsToCity(fips) {
  if (fips in FIPS_TO_CITY) {
    return FIPS_TO_CITY[fips];
  } else {
    console.error("Fips not found in FIPS-to-City map: " + fips);
  }
};

function preprocessAndExpand(str) {
  // Basic preprocessing
  str = str.toLowerCase(); // We always convert to lower case since the keys in our maps are lowercase as well
  str = str.trim();
  str = str.replace(/\s+/g, ' '); // Multiple spaces to single space

  // Syntactic expansion
  let variations = [];
  variations.push(str);
  if (str.includes(", ")) {
    variations.push(str.replace(", ", ","));
  }
  if (str.includes(" ,")) {
    variations.push(str.replace(" ,", ","));
  }
  console.log('variations', variations);
  return variations;
}

export function getAllVariableValuesByState(states, indexVariable) {
  let values = [];
  if (indexVariable in INDEX_VARIABLES) {
    if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
      states.map(state => (
        values = values.concat([state.name])
      ));
    } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {

    } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {

    } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
      states.map(state => (
        values = values.concat(stateZipCodes[state.abbreviation])
      ));
    }
    console.log('values', values)
    return values;
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
}

function indexVariableValueToStandardValue(indexVariable, indexVariableValue) {
  if (indexVariable in INDEX_VARIABLES) {
    if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
      return fipsToState(stateToFips(indexVariableValue));
    } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {
        // TODO
    } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
      return fipsToCity(cityToFips(indexVariableValue));
    } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
      return indexVariableValue;
    }
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
};



















