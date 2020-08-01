import fs from 'fs';
import { pipeline, Transform } from 'stream';
import csv from 'csvtojson';


class ObjectTransform extends Transform {
  _transform(chunk, encoding, callback) {
    let object = JSON.parse(chunk);
    delete object['Amount'];
    let newObject = Object.keys(object).reduce((acc, key) => {
      const oldValue = object[key];
      acc[key.toLowerCase()] = isNaN(oldValue) ? oldValue : +oldValue;
      return acc;
    }, {});
    callback(null, JSON.stringify(newObject) + '\n');
  }
}

function main() {
  pipeline(
    fs.createReadStream('./csv/nodejs-hw1-ex1.csv'),
    csv(),
    new ObjectTransform(),
    fs.createWriteStream('./result/nodejs-hw1-ex1.txt' ),
    error => {
      if (!error) {
        console.log('Finished!')
      } else {
        console.error(error);
      }
    }
  );
}

main();
