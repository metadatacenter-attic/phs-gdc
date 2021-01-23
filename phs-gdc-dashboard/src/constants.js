export const DC_API_BASE_URL = "https://api.datacommons.org/";

export const NOT_AVAILABLE_VALUE = "NA";

export const INDEX_VARIABLE_STATE_NAME = 'state';
export const INDEX_VARIABLE_COUNTY_NAME = 'county';
export const INDEX_VARIABLE_CITY_NAME = 'city';
export const INDEX_VARIABLE_ZIPCODE_NAME = 'zipCode';

export const INDEX_VARIABLES = {
  [INDEX_VARIABLE_STATE_NAME]: {
    "uiLabel": "state",
    "dcid": "State",
    "dcidValuePrefix": null,
    "enabled": false
  },
  [INDEX_VARIABLE_COUNTY_NAME]: {
    "uiLabel": "county",
    "dcid": "County",
    "dcidValuePrefix": null,
    "enabled": false
  },
  [INDEX_VARIABLE_CITY_NAME]: {
    "uiLabel": "city",
    "dcid": "City",
    "dcidValuePrefix": null,
    "enabled": false
  },
  [INDEX_VARIABLE_ZIPCODE_NAME]: {
    "uiLabel": "zip code",
    "dcid": "CensusZipCodeTabulationArea",
    "dcidValuePrefix": "zip/",
    "enabled": true
  }
}

// Variable selected by default
export const DEFAULT_INDEX_VARIABLE_NAME =  INDEX_VARIABLE_ZIPCODE_NAME;

export const SNIPPET_1_URL = "https://github.com/metadatacenter/phs-gdc/blob/develop/r/snippet-merge-csv/MergeSnippet.R";