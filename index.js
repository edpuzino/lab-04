'use strict';

const fs = require('fs');
const greyScale = require('./lib/greyscale.js');


/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;

}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = Buffer.from(buffer);
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
  this.numberColors = buffer.readInt32LE(46);
  console.log('number of colors', this.numberColors);
  this.impColors = buffer.readInt32LE(50);
  console.log('important colors', this.impColors);
  this.pixelArrayOffset = buffer.readInt32LE(10);
  this.rawPixels = buffer.slice(this.pixelArrayOffset);
  this.headers = buffer.slice(0, this.pixelArrayOffset);
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
*/

Bitmap.prototype.transform = function(operation) {
  transforms[operation](this);
  //this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);





};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {
  //console.log(bmp);
  //Bitmap.transform('greyscale');
  bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
  console.log('Transforming bitmap into greyscale', bmp);

  let pictureData = bitmap.rawPixels;
  console.log(pictureData.length);
  console.log(pictureData[1275]);

  //greyscale picture
  for(let i = 0; i < pictureData.length ; i += 3)  {      
    let avg = (pictureData[i] + pictureData[i+1] + pictureData[i+2])/3;
    pictureData[i] = avg;
    pictureData[i+1] = avg;
    pictureData[i+2] = avg;
  }

  console.log(pictureData[1275]);
  let newPic = bitmap.headers + pictureData;
  fs.writeFile(bitmap.newFile, newPic, (err, out) => {
    if (err) {
      throw err;
    }
    console.log(`Bitmap Transformed: ${bitmap.newFile}`);
  });
};
  //TODONE: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  //TODO: alter bmp to make the image greyscale ...



const transformNegative = (bmp) => {

  bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
  console.log('Transforming bitmap into an inverse color image', bmp);

  let pictureData = bitmap.rawPixels;
  console.log(pictureData.length);
  console.log(pictureData[1275]);

  for(let i = 0; i < 125; i++) {
    for(let j = 0; j < 112; j++){
      if(j<110) {
        pictureData[(i*112)+j] = 255 - pictureData[(i*112)+j];
      }
    }
  }

    //invert picture
   // for(let i=0; i<pictureData.length; i++) {
        //pictureData[i] = 255 - pictureData[i];
    //}
    
   

    console.log(pictureData[1275]);
    let newPic = bitmap.headers + pictureData;
    fs.writeFile(bitmap.newFile, newPic, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
  });
};



//console.log(process.argv);
/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  negative: transformNegative

};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);
    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

