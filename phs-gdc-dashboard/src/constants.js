export const DC_API_BASE_URL = "https://api.datacommons.org/";

export const NOT_AVAILABLE_VALUE = "NA";

export const INDEX_VARIABLE_STATE_NAME = 'state';
export const INDEX_VARIABLE_COUNTY_NAME = 'county';
export const INDEX_VARIABLE_CITY_NAME = 'city';
export const INDEX_VARIABLE_ZIPCODE_NAME = 'zipCode';

export const INDEX_VARIABLES = {
  [INDEX_VARIABLE_STATE_NAME]: {
    "uiLabel": "state",
    "uiValuesExample": "California",
    "dcid": "State",
    "dcidValuePrefix": "geoId/",
    "enabled": true
  },
  [INDEX_VARIABLE_COUNTY_NAME]: {
    "uiLabel": "county",
    "uiValuesExample": "Santa Clara, CA",
    "dcid": "County",
    "dcidValuePrefix": "geoId/",
    "enabled": true
  },
  [INDEX_VARIABLE_CITY_NAME]: {
    "uiLabel": "city",
    "uiValuesExample": "Palo Alto, CA",
    "dcid": "City",
    "dcidValuePrefix": "geoId/",
    "enabled": true
  },
  [INDEX_VARIABLE_ZIPCODE_NAME]: {
    "uiLabel": "zip code",
    "uiValuesExample": "94306",
    "dcid": "CensusZipCodeTabulationArea",
    "dcidValuePrefix": "zip/",
    "enabled": true
  }
}

// Variable selected by default
export const DEFAULT_INDEX_VARIABLE_NAME =  INDEX_VARIABLE_ZIPCODE_NAME;

// Input option for variable values selected by default
export const DEFAULT_VALUE_OPTION = "optionEnter";

// Links
export const SNIPPET_1_URL = "https://github.com/metadatacenter/phs-gdc/blob/develop/r/snippet-merge-csv/MergeSnippet.R";
export const DC_GRAPH_BROWSER_BASE_URL = "https://datacommons.org/browser/";
export const GITHUB_REPO_URL = "https://github.com/metadatacenter/phs-gdc/";

// Provenance domains
export const PROVENANCE_DOMAIN_CENSUS_GOV = 'census.gov';