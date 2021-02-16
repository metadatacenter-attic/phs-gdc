import snippetsR from './../resources/r/snippets/snippetsR.json';

export function generateRCode(option, indexVariableName, indexVariableValues, dcVariableNames, includeDates) {

  if (option === 0) {
    return generateRCodeFileDependent();
  } else {
    return generateRCodeFileIndependent(indexVariableName, indexVariableValues, dcVariableNames, includeDates);
  }
}

function generateRCodeFileDependent() {
  return snippetsR.snippetFileDependent;
}

function generateRCodeFileIndependent(indexVariableName, indexVariableValues, dcVariableNames, includeDates) {
  let snippet = snippetsR.snippetFileIndependent;
  snippet = snippet.replace("$INDEX_VARIABLE_VALUES", arrayToCommaSeparated(indexVariableValues));
  snippet = snippet.replace("$INDEX_VARIABLE_NAME", toCommonDataLocationType(indexVariableName));
  snippet = snippet.replace("$DC_VARIABLE_NAMES", arrayToCommaSeparated(dcVariableNames));
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