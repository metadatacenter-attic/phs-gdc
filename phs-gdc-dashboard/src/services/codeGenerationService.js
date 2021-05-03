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

export function generateRCodeForRetrieval(option, indexVariableName, indexVariableValues, dcVariableNames, includeDates, includeProvenance) {

  if (option === 0) {
    return getCodeForFileBasedDataRetrieval(indexVariableName);
  } else {
    return getCodeForApiBasedDataRetrieval(indexVariableName, indexVariableValues, dcVariableNames, includeDates, includeProvenance);
  }
}

function getCodeForFileBasedDataRetrieval(indexVariableName) {
  let snippet = snippetsR.snippetFileBasedDataRetrievalCode;
  snippet = snippet.replace("$INDEX_VARIABLE_NAME", indexVariableName);
  return snippet;
}

function getCodeForApiBasedDataRetrieval(indexVariableName, indexVariableValues, dcVariableNames, includeDates, includeProvenance) {
  let snippet = snippetsR.snippetApiBasedDataRetrievalCode;
  snippet = snippet.replace("$INDEX_VARIABLE_VALUES", arrayToWrappedCommaSeparated(indexVariableValues, 100));
  snippet = snippet.replace("$INDEX_VARIABLE_NAME", indexVariableName);
  snippet = snippet.replace("$DC_VARIABLE_NAMES", arrayToWrappedCommaSeparated(dcVariableNames, 100));
  snippet = snippet.replace("$LOCATION_TYPE", toCommonDataLocationType(indexVariableName));
  snippet = snippet.replace("$INCLUDE_DATES", toBoolean(includeDates));
  snippet = snippet.replace("$INCLUDE_PROVENANCE", toBoolean(includeProvenance));
  return snippet;
}

function toCommonDataLocationType(locType) {
  if (locType === "zipCode") {
    return "zip";
  } else {
    return locType;
  }
}

function toBoolean(bool) {
  return (bool) ? "TRUE" : "FALSE";
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

function arrayToWrappedCommaSeparated(array, length) {
  let output = "";
  let clone = copyArray(array);
  while(clone.length > length) {
    let split = clone.splice(0, length);
    output += arrayToCommaSeparated(split) + ",\n";
  }
  output += arrayToCommaSeparated(clone);
  return output;
}

function copyArray(array) {
  let identity = (x) => x;
  return array.map(identity);
}