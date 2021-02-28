/**
 * Data Commons Utility functions
 */

//import moment from "moment";
import STATE_TO_FIPS from './../resources/locationData/stateToFips';
//import FIPS_TO_STATE from './../resources/locationData/fipsToState';

import CITY_TO_FIPS from './../resources/locationData/cityToFips';
//import FIPS_TO_CITY from './../resources/locationData/fipsToCity';

import COUNTY_TO_FIPS from './../resources/locationData/countyToFips';
//import FIPS_TO_COUNTY from './../resources/locationData/fipsToCounty';

import STATE_TO_ZIPS from '../resources/locationData/stateToZips';
import STATE_TO_CITIES from '../resources/locationData/stateToCities';
import STATE_TO_COUNTIES from "../resources/locationData/stateToCounties";



import {
  INDEX_VARIABLE_CITY_NAME,
  INDEX_VARIABLE_COUNTY_NAME,
  INDEX_VARIABLE_STATE_NAME, INDEX_VARIABLE_ZIPCODE_NAME,
  INDEX_VARIABLES, NOT_AVAILABLE_VALUE, PROVENANCE_DOMAIN_CENSUS_GOV
} from "../constants";


/**
 * Transforms data returned from the Data Commons /stat/all API to Json in tabular format
 * See https://docs.datacommons.org/api/rest/stat_all.html for some examples of input json data.
 *
 * @param jsonData
 * @param phsVariableName
 * @param indexVariableValuesToDcidsMap
 * @param indexVariableDcidsToValuesMap
 * @param dcVariableNames
 * @param includeDates
 * @param includeDatesOption
 * @param includeProvenance
 * @returns {[]}
 */
export function toTabularJsonData(jsonData, phsVariableName, indexVariableValuesToDcidsMap, indexVariableDcidsToValuesMap,
                                  dcVariableNames, includeDates, includeDatesOption, includeProvenance) {
  let tabularJsonData = [];

  let rows = {}
  // Generate rows and index them by phsVariableValue (placeId)
  let colNamesIncludeDatesOptionHeader = new Set();

  // Iterate over unique place values and find the corresponding JSON data
  for (let placeValue in indexVariableValuesToDcidsMap) {
    let placeId = indexVariableValuesToDcidsMap[placeValue];
    if (placeId in jsonData['placeData']) {
      let row = {[phsVariableName]: placeValue};
      for (let i = 0; i < dcVariableNames.length; i++) {
        let dcVarName = dcVariableNames[i];
        let colName = dcVarName;
        // Check if there is any data for the given placeId and variable...
        let sourceSeries = jsonData['placeData'][placeId]['statVarData'][dcVarName]['sourceSeries'];
        if (sourceSeries) {

          // Select the most relevant data source and the most recent date from it
          let selectedDataSource = selectDataSource(sourceSeries);
          let index =  selectedDataSource['sourceIndex'];
          let date = selectedDataSource['mostRecentDateForSource'];
          console.log('index', index);
          console.log('date', date);

          // If requested, include temporal information in the column header
          if (includeDates && includeDatesOption === 'header') {
            colName = colName + '_' + date;
            colNamesIncludeDatesOptionHeader.add(colName);
          }
          row[colName] = sourceSeries[index]["val"][date];
          // If requested, include temporal information as an additional column
          if (includeDates && includeDatesOption === 'column') {
            row[colName + '_Date'] = date;
          }
          // If requested, include provenance information as an additional column
          if (includeProvenance) {
            let provenanceDomain = sourceSeries[index]["provenanceDomain"];
            row[colName + '_Provenance'] = provenanceDomain;
          }
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
          }
          if (includeProvenance) {
            row[colName] = NOT_AVAILABLE_VALUE;
            row[colName + '_Provenance'] = NOT_AVAILABLE_VALUE;
          }
          if (!includeDates && !includeProvenance) {
            row[colName] = NOT_AVAILABLE_VALUE;
          }
        }
      }
      rows[placeValue] = row;
    }
    else {
      console.error("PlaceId not found in json: ", placeId);
    }
  }

  Object.keys(indexVariableValuesToDcidsMap).forEach(placeValue => {
    tabularJsonData.push(rows[placeValue]);
  });

  return tabularJsonData;
};

/**
 * Selects the most appropriate data source, as well as the most recent year from that data source
 * @param sourceSeries
 */
function selectDataSource(sourceSeries) {
  let result = {
    "sourceIndex": null,
    "mostRecentDateForSource": null
  }

  // For the moment, we priority to census.gov.
  for (let i=0; i<sourceSeries.length; i++) {
    if (sourceSeries[i]['provenanceDomain'] === PROVENANCE_DOMAIN_CENSUS_GOV) {
      result['sourceIndex'] = i;
      result['mostRecentDateForSource'] = getMostRecentDate(sourceSeries[i]['val']);
      return result;
    }
  }

  // If there is no data from census.gov, we pick the source with the most recent data.
  let mostRecentDataIndex = 0;
  let mostRecentDate = -1;
  let index;
  for (index=0; index < sourceSeries.length; index++) {
    let currentMostRecentDate = getMostRecentDate(sourceSeries[index]['val']);
    if (currentMostRecentDate > mostRecentDate) {
      mostRecentDate = currentMostRecentDate;
      mostRecentDataIndex = index;
    }
  }
  result['sourceIndex'] = mostRecentDataIndex;
  result['mostRecentDateForSource'] = mostRecentDate;
  return result;
}

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

// /**
//  * Returns a string representing format in which the date is expressed. For example, if the date is '2018', it would
//  * return 'Year'.
//  * This function uses Moment.js: https://momentjs.com/
//  * @param date
//  */
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

export function generateIndexVariableValuesToDcidsMap(indexVariable, indexVariableValues) {
  let valueToDcidMap = {}
  for (let i=0; i<indexVariableValues.length; i++) {
    let dcid = indexVariableValueToDcid(indexVariable, indexVariableValues[i]);
    if (dcid) {
      valueToDcidMap[indexVariableValues[i]] = dcid;
    }
  }
  return valueToDcidMap;
};

export function generateIndexVariableDcidsToValuesMap(indexVariable, indexVariableValues) {
  let dcidToValueMap = {}
  for (let i=0; i<indexVariableValues.length; i++) {
    let dcid = indexVariableValueToDcid(indexVariable, indexVariableValues[i]);
    if (dcid) {
      dcidToValueMap[dcid] = indexVariableValues[i];
    }
  }
  return dcidToValueMap;
};


/**
 * Translates the value of an index variable to a DC node identifier (e.g., 94306 -> zip/94306)
 * @param variableKey Key of the variable in the variables map (e.g., zipCode)
 * @param variableValue Variable value (e.g., 94306)
 */
export function indexVariableValueToDcid(indexVariable, indexVariableValue) {
  if (indexVariable in INDEX_VARIABLES) {
    let prefix = INDEX_VARIABLES[indexVariable].dcidValuePrefix;
    let fips = indexVariableValueToFips(indexVariable, indexVariableValue);
    if (fips) {
      return prefix.concat(indexVariableValueToFips(indexVariable, indexVariableValue));
    }
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
      let fips = countyToFips(indexVariableValue);
      if (fips) {
        return fips;
      }
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

function stateToFips(state) {
  let variations = preprocessAndExpand(state);
  for (let i = 0; i < variations.length; i++) {
    if (variations[i] in STATE_TO_FIPS) {
      return STATE_TO_FIPS[variations[i]];
    }
  }
  console.error("State not found: " + state);
};

function countyToFips(county) {
  let variations = preprocessAndExpand(county);
  for (let i = 0; i < variations.length; i++) {
    if (variations[i] in COUNTY_TO_FIPS) {
      return COUNTY_TO_FIPS[variations[i]];
    }
  }
  console.error("County not found: " + county);
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

// export function indexVariableDcidToVariableValue(indexVariable, indexVariableValueDcid) {
//   if (indexVariable in INDEX_VARIABLES) {
//     let prefix = INDEX_VARIABLES[indexVariable].dcidValuePrefix;
//     if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
//       return fipsToState(indexVariableValueDcid.replace(prefix, ''));
//     } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {
//
//     } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
//       return fipsToCity(indexVariableValueDcid.replace(prefix, ''));
//     } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
//       return indexVariableValueDcid.replace(prefix, '');
//     }
//   } else {
//     console.error("Invalid variable: " + indexVariable);
//   }
// };

// function fipsToState(fips) {
//   if (fips in FIPS_TO_STATE) {
//     return FIPS_TO_STATE[fips];
//   } else {
//     console.error("Fips not found in FIPS-to-State map: " + fips);
//   }
// };

// function fipsToCity(fips) {
//   if (fips in FIPS_TO_CITY) {
//     return FIPS_TO_CITY[fips];
//   } else {
//     console.error("Fips not found in FIPS-to-City map: " + fips);
//   }
// };

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
      states.map(state => (
        values = values.concat(STATE_TO_COUNTIES[state.abbreviation])
      ));
    } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
      states.map(state => (
        values = values.concat(STATE_TO_CITIES[state.abbreviation])
      ));
    } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
      states.map(state => (
        values = values.concat(STATE_TO_ZIPS[state.abbreviation])
      ));
    }
    return values;
  } else {
    console.error("Invalid variable: " + indexVariable);
  }
}

// function indexVariableValueToStandardValue(indexVariable, indexVariableValue) {
//   if (indexVariable in INDEX_VARIABLES) {
//     if (indexVariable === INDEX_VARIABLE_STATE_NAME) {
//       return fipsToState(stateToFips(indexVariableValue));
//     } else if (indexVariable === INDEX_VARIABLE_COUNTY_NAME) {
//         // TODO
//     } else if (indexVariable === INDEX_VARIABLE_CITY_NAME) {
//       return fipsToCity(cityToFips(indexVariableValue));
//     } else if (indexVariable === INDEX_VARIABLE_ZIPCODE_NAME) {
//       return indexVariableValue;
//     }
//   } else {
//     console.error("Invalid variable: " + indexVariable);
//   }
// };



















