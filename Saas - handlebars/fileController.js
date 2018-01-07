const fs = require('fs');

const writeFileSync = (fileName, data) => {
    fs.writeFileSync(fileName, data, 'utf-8');
}

const readFileSync = (fileName) => {
    let readData = fs.readFileSync(fileName, 'utf-8');
    console.log(readData);
}

module.exports = {
    writeFile : writeFileSync,
    readFile : readFileSync
}