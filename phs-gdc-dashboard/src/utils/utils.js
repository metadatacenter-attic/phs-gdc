/**
 * General Utilities
 */

export function jsonToCsv(json) {
  let fields = Object.keys(json[0]);
  let replacer = function (key, value) {
    return value === null ? '' : value;
  }
  let csv = json.map(function (row) {
    return fields.map(function (fieldName) {
      return JSON.stringify(row[fieldName], replacer);
    }).join(',');
  })
  csv.unshift(fields.join(',')); // add header column
  csv = csv.join('\r\n');
  return csv;
}