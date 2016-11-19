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

console.log(lines);
