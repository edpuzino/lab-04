'use strict';

const fs = require('fs');

function Bitmap(filePath) {
  this.file = filePath;
}

Bitmap.prototype.parse = function(buffer) {
  
  this.type = buffer.toString('utf-8', 0, 2);
  console.log('type', this.type);
  this.fileSize = buffer.readInt32LE(2); //read 32 bytes skipping the first two
  console.log('file size', this.fileSize);
  this.bytesPerPixel = buffer.readInt16LE(28);
  console.log('bits per pixel', this.bytesPerPixel);
  this.height = buffer.readInt32LE(22);
  console.log('height', this.height);
  this.width = buffer.readInt32LE(18);
  console.log('width', this.width);
  this.buffer = Buffer.from(buffer, this.width, this.height);
  this.numberColors = buffer.readInt32LE(46);
  console.log('number of colors', this.numberColors);
  this.impColors = buffer.readInt32LE(50);
  console.log('important colors', this.impColors);
  this.pixelArrayOffset = buffer.readInt32LE(10);
  this.rawPixels = buffer.slice(this.pixelArrayOffset);
  this.headers = buffer.slice(0, this.pixelArrayOffset);
};

Bitmap.prototype.transform = function(operation) {
  transforms[operation](this);
  //this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

const transformStarTrek = (bmp) => {

  bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
  console.log('Transforming the background color of the bitmap', bmp);

  let pictureData = bmp.buffer;
  console.log(pictureData.length);
  console.log(pictureData[1275]);

  for(let i = 0; i < pictureData.length; i = i+4) {
    if(pictureData[i] > 220 && pictureData[i+1] < 170 && pictureData[i+2] > 220) {
      pictureData[i] = 55;
      pictureData[i+1] = 215;
      pictureData[i+2] = 55;
    }
  }

  console.log(pictureData[1275]);
  //let newPic = bitmap.headers + pictureData;
  fs.writeFile(bitmap.newFile, bmp.buffer, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Bitmap Transformed: ${bitmap.newFile}`);
  });
};

const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

module.exports = transformStarTrek;