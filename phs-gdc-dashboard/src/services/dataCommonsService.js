import {DC_API_BASE_URL} from "../constants";

/**
 * Functions to access the Data Commons REST API
 */

/**
 * Place Statistics - All
 * @param placeType Place type (e.g., zip code)
 * @param placeValueDcids A list of Place DCIDs to query for (Here DCID stands for Data Commons ID, the unique
 *                        identifier assigned to all entities in Data Commons.)
 * @param statVars  A list of StatisticalVariable DCIDs.
 * @constructor
 */
export function getPlaceStatistics(placeType, placeValueDcids, statVars) {
  let url = DC_API_BASE_URL + "stat/all";
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({places: placeValueDcids, statVars: statVars})
  };
  return fetch(url, requestOptions).then(response => {
    // Check if the request is 200
    if (response.ok) {
      let data = response.json();
      return data;
    }
    return Promise.reject(response);
  });
};