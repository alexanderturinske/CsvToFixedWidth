/*
 * CsvToFixedWidth
 * Author: Alexander James Turinske
 */

const fs = require('fs');

const file = fs.readFileSync('temp.csv', 'utf8')
  .split('\n')
  .map(function (line) {
    return line.split(',');
  });

const unprocessedLines = [];
let line = [];
let i = 0

while (file.length >= i + 5) {
  line = [];
  file[i].forEach(function (value, index) {
    line.push([file[i][index], file[i + 1][index], file[i + 2][index], file[i + 3][index], file[i + 4][index]]);
  });
  unprocessedLines.push(line);
  i += 5;
}
/*
 *
 * File format: column name, width, pl or pr, filler, data
lines =
[
  [ [ 'one', '1', 'pl', '0', 'B' ],[ 'two', '2', 'pl', '', '1' ], [ 'three', '5', 'pr', '0', '1234' ]],
  [ [ 'one', '2', 'pl', 'BA' ], [ 'two', '5', 'pl', 'Test' ], [ 'three', '4', 'pr', 'a' ] ]
]
 * TODO Condense column into a single string
 * Bulk of logic
 */
const processedLines = unprocessedLines.map(function (lineData) {
  return lineData.reduce(function (currentLine, columnData) {
    const width = Math.abs(columnData[1]);
    const padding = ['pl', 'pr'].indexOf(columnData[2].toLowerCase()) > 0 ? columnData[2].toLowerCase() : 'pl';
    const filler = columnData[3] !== void 0 ? stringConversion(columnData[3]) : ' ';
    const data = stringConversion(columnData[4]);
    if (data.length < width) {
      if (padding === 'pl') {
        return createFiller(filler, data, width) + data + currentLine;
      } else {
        return data + createFiller(filler, data, width) + currentLine;
      }
    } else if (data.length > width) {
      return data.substring(0, width) + currentLine;
    }
  }, '');
});
/*
 * TODO Join array of strings into a single string
 * file.map(function (arrayOfStrings) {
 *   return arrayOfStrings.join('');
 * });
 *
 * TODO Write array of lines to a new file
 * fs.writeFileSync('output.GACT', 'utf8');
 *
 * TODO Allow for user specification of input file location and output file location
 *
 */
function stringConversion(value) {
  return typeof value === 'string' ? value : value.toString();
}
function createFiller(filler, data, width) {
  var resultString = '';
  for (let i = 0; i < width - data.length; i++) {
    resultString += filler;
  }
  return resultString;
}

console.log('pre', unprocessedLines);
console.log('post', processedLines);
