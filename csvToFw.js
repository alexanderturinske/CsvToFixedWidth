/*
 * CsvToFixedWidth
 * Author: Alexander James Turinske
 */

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let output;

rl.question('Path to .csv from the current directory? ', (inputFilePath) => {
  output = processLines(parseColumns(parseInput(inputFilePath)));
  rl.question('Target path of output file from the current directory? ', outputFilePath => {
    rl.close();
    writeFile(outputFilePath, output);
  });
});

function parseInput(inputFilePath) {
  return fs.readFileSync(inputFilePath, 'utf8')
    .split('\n')
    .map(line =>
      line.split(',')
    );
}

function parseColumns(file) {
  const unprocessedLines = [];
  let line = [];
  let i = 0

  // TODO make below function cleaner and more efficient
  while (file.length >= i + 5) {
    line = [];
    file[i].forEach((value, index) => {
      line.push([file[i][index], file[i + 1][index], file[i + 2][index], file[i + 3][index], file[i + 4][index]]);
    });
    unprocessedLines.push(line);
    i += 5;
  }
  return unprocessedLines;
}

function processLines(unprocessedLines) {
  return unprocessedLines.map(lineData =>
    lineData.reduce((currentLine, columnData) => {
      currentLine = currentLine === void 0 ? '' : currentLine;
      const width = Math.abs(columnData[1]);
      const padding = ['pl', 'pr'].indexOf(columnData[2].toLowerCase()) > 0 ? columnData[2].toLowerCase() : 'pl';
      const filler = columnData[3] !== '' ? stringConversion(columnData[3]) : ' ';
      const data = stringConversion(columnData[4]);
      if (data.length <= width) {
        if (padding === 'pl') {
          return currentLine + createFiller(filler, data, width) + data;
        } else {
          return currentLine + data + createFiller(filler, data, width);
        }
      } else if (data.length > width) {
        return currentLine + data.substring(0, width);
      }
    }, '')
  );
}

function writeFile(outputFilePath, processedLines) {
  fs.writeFile(outputFilePath, createFileText(processedLines), 'utf8', err => {
    if (err) throw err;
    console.log('Your file has been saved!');
  });
}

function createFileText(data) {
  return data.join('\r\n');
}

function createFiller(filler, data, width) {
  var resultString = '';
  for (let i = 0; i < width - data.length; i++) {
    resultString += filler;
  }
  return resultString;
}

function stringConversion(value) {
  return typeof value === 'string' ? value : value.toString();
}
