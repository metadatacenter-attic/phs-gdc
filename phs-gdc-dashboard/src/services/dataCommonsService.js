import {DC_API_BASE_URL} from "../constants";

/**
 * Functions to access the Data Commons REST API
 */

/**
 * Place Statistics - All
 * @param places
 * @param statVars
 * @constructor
 */
// export function GetPlaceStatistics(places, statVars) {
//   let url = DC_API_BASE_URL + "stat/all";
//   console.log(url);
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({places: places, statVars: statVars})
//   };
//   return fetch(url, requestOptions);
// };

export function getPlaceStatistics(places, statVars) {
  let url = DC_API_BASE_URL + "stat/all";
  console.log(url);
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({places: places, statVars: statVars})
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