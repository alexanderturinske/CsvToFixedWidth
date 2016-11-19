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

// function textFileCreater() {
// }
//
// textFileCreater();
