/**
 * Data Commons Utility functions
 */


/**
 * Transforms data returned from the Data Commons /stat/all API to Json in tabular format
 * See https://docs.datacommons.org/api/rest/stat_all.html for some examples of input json data.
 *
 * @param jsonData
 * @param placeVarName Name of the place variable. It will be used as the column name for the place data in the output
 */
export function toTabularJsonData(jsonData, placeVarName) {
  let tabularJsonData = [];
  let statVars = {};

  // Extract column names and most recent year for each variable name and save them as a hashtable.
  // To improve performance, we assume that a particular variable has the same years for all location identifiers
  let firstKey = (Object.keys(jsonData['placeData']))[0];
  for (let varName in jsonData['placeData'][firstKey]['statVarData']) {
    let year = getLatestYear(jsonData['placeData'][firstKey]['statVarData'][varName]["sourceSeries"][0]["val"])
    statVars[varName] = year;
  }

  // Extract values
  for (let placeId in jsonData['placeData']) {
    let placeValue = placeId;  // TODO: extract value
    let row = {[placeVarName] : placeValue};
    for (let statVarName in statVars) {
      let year = statVars[statVarName];
      row[statVarName] = jsonData['placeData'][placeId]['statVarData'][statVarName]["sourceSeries"][0]["val"][year];
    }
    tabularJsonData.push(row);
  }
  return tabularJsonData;
}

/**
 * Given an object with key-value pairs, where each key is a year, retrieve the most recent year
 * Example: { "2012": 8710, "2020": 8680, "2018": 8831 } -> 2020
 * @param data
 */
function getLatestYear(data) {
  let latestYear = Object.keys(data).sort().reverse()[0];
  return parseInt(latestYear);
}

















