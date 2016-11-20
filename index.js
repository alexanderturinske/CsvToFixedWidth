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
/*
 * File format:
 * column name
 * width
 * pl or pr
 * data
 */

const lines = [];
let line = [];
let i = 0

while (file.length >= i + 4) {
  line = [];
  file[i].forEach(function (value, index) {
    line.push([file[i][index], file[i + 1][index], file[i + 2][index], file[i + 3][index]]);
  });
  lines.push(line);
  i += 4;
}

/* TODO Condense column into a single string
 * Bulk of logic
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
console.log(lines);
