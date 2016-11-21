# CSV To Fixed Width

CsvToFixedWidth is a file converter from CSV to a fixed width file format of your choice.
It supports multiple lines.

## Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Meet the Engineers](#meet-the-engineers)
7. [Questions and Issues](#questions-and-issues)

=====================
## Overview

### Technologies

- [Node](https://nodejs.org/en/)

=====================
## Requirements

- Node > v6.00.00

=====================
## Installation

Copy the csvToFw.js file to a directory of your choice.

=====================
## Usage

In the directory where the csvToFw.js is placed:
```
$ node csvToFw.js
Path to .csv from the current directory? PATH_OF_INPUT_CSV
Target path of output file from the current directory? PATH_OF_OUTPUT_FILE
Your file has been saved!
```

Sample CSV file input

![Sample CSV file](http://i.imgur.com/vx1bPOy.png)

```
one,two,three,four,five
1,2,5,4,1
pl,pl,pr,pl,pr
0,0,0,,0
B,1,1234,,X
one,two,three,four,five
2,5,4,1,1
pl,pl,pr,pl,pr
1,1,1,,1
BA,Test,a,,X
```

Sample fixed width file output

```
B0112340    X
BA1Testa111 X
```

### CSV Row format
Given n is an integer greater than zero
- Row 4n: header for data, not used
- Row 4n + 1: width of the column
 - required
- Row 4n + 2: padding side for the column
 - pl = padding left (default)
 - pr = padding right
- Row 4n + 2: filler
 - if your data doesn't take up the whole row, this character will be used as a filler
 - default: single space
- Row 4n + 3: data
 - default: empty string

=====================
## Contributing

See [CONTRIBUTING.md](https://github.com/alexanderturinske/CsvToFixedWidth/blob/master/CONTRIBUTING.md) for contribution guidelines.

=====================
## Meet The Engineers

- [Alexander Turinske](https://github.com/alexanderturinske)

=====================
## Questions and Issues

For any issues, please refer to [the issues page](https://github.com/alexanderturinske/CsvToFixedWidth/issues)
Please direct any questions regarding CsvToFixedWidth to [the wiki page](https://github.com/alexanderturinske/CsvToFixedWidth/wiki)

Thank you!
