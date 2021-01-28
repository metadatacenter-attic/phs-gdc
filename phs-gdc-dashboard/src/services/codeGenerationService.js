import snippetsR from './../resources/r/snippets/snippetsR.json';

function generateRCodeFileDependent() {
  return snippetsR.snippetFileDependent;
}

function generateRCodeFileIndependent(phsVariableValues, dcVariableNames, includeDates) {
  return "sampleCode\n" + phsVariableValues + "\n" + dcVariableNames + "\n" + includeDates;
}

export function generateRCode(option, phsVariableValues, dcVariableNames, includeDates) {
  if (option === 0) {
    return generateRCodeFileDependent();
  }
  else {
    return generateRCodeFileIndependent(phsVariableValues, dcVariableNames, includeDates);
  }
}