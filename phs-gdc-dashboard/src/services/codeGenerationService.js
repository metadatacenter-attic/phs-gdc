import snippetsR from './../resources/r/snippets/snippetsR.json';

export function generateRCodeForInstallation(option) {

  if (option === 0) {
    return getLibrariesForFileBasedDataRetrieval();
  } else {
    return getLibrariesForApiBasedDataRetrieval();
  }
}

function getLibrariesForFileBasedDataRetrieval() {
  return snippetsR.snippetFileBasedDataRetrievalLibraries;
}

function getLibrariesForApiBasedDataRetrieval() {
  return snippetsR.snippetApiBasedDataRetrievalLibraries;
}

export function generateRCodeForRetrieval(option, indexVariableName, indexVariableValues, dcVariableNames, includeDates) {

  if (option === 0) {
    return getCodeForFileBasedDataRetrieval(indexVariableName);
  } else {
    return getCodeForApiBasedDataRetrieval(indexVariableName, indexVariableValues, dcVariableNames, includeDates);
  }
}

function getCodeForFileBasedDataRetrieval(indexVariableName) {
  let snippet = snippetsR.snippetFileBasedDataRetrievalCode;
  snippet = snippet.replace("$INDEX_VARIABLE_NAME", indexVariableName);
  return snippet;
}

function getCodeForApiBasedDataRetrieval(indexVariableName, indexVariableValues, dcVariableNames, includeDates) {
  let snippet = snippetsR.snippetApiBasedDataRetrievalCode;
  snippet = snippet.replace("$INDEX_VARIABLE_VALUES", arrayToCommaSeparated(indexVariableValues));
  snippet = snippet.replace("$INDEX_VARIABLE_NAME", indexVariableName);
  snippet = snippet.replace("$DC_VARIABLE_NAMES", arrayToCommaSeparated(dcVariableNames));
  snippet = snippet.replace("$LOCATION_TYPE", toCommonDataLocationType(indexVariableName));
  return snippet;
}

function toCommonDataLocationType(locType) {
  if (locType == "zipCode") {
    return "zip";
  } else {
    return locType
  }
}

/**
 * Concatenates all the elements in an array into a single string, where the values are enclosed between quotes and
 * separated by commas
 *
 * @param array
 * @returns {string}
 */
function arrayToCommaSeparated(array) {
  return "\"" + array.join("\",\"") + "\"";
}