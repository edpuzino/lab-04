![CF](http://i.imgur.com/7v5ASc8.png) LAB: Buffers - Bitmap Transformer
=======================================================================

# SO FAR THIS IS WHAT I HAVE
* I have two functions working, greyscale and negative. By putting in the lines listed below into the command line the individual functions are called and ran. The problem I think I am having so far is getting the picture put back together before sending it to the new file. So I am getting two seperate and distinct scrambled pictures to render. The greyscale is supposed to give back a black and white version of the original picture. The negative is supposed to give back a negative of the original picture.

* Enter either of the following lines on the command line to generate the new file with a converted picture in it.
For greyscale enter: node index.js assets/baldy.bmp greyscale
For Inverse enter: node index.js assets/baldy.bmp negative


## Resources  
* [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format)
* [Buffer Docs](https://nodejs.org/api/buffer.html)


**Assignment 2: Modularize the code**
  * What should be unique, testable modules?
  * What structure should you use to most easily export?
  * How best can we make this scale?

**Stretch Goal - Refactor to use promises**

#### Minimum Requirements
* The CLI should be architected using best modularization practices
* The CLI should require two arguments `input-file-path transfrom-name`
* The CLI should support a minimum of four transforms
* The CLI should log useful Error messages if used incorrectly
* The CLI should log a success message on completion

## Testing 
* Use BDD `describe` and `test` methods to define discriptive tests and increase readablity
* Each `test` callback should aim to test a small well defined feature of a function
* Write tests to ensure each function behaves correctly with valid and invalid inputs
* The CLI should be tested without using `child_process` or any equivilant third party librarys

##  Documentation
In your README.md describe the exported values of each module you have defined. Every function description should include it's airty (expected number of paramiters), the expected data for each paramiter (data-type and limitations), and it's behavior (for both valid and invalued use). Feel free to write any additional information in your README.md.

Note that there are few places in the starter code (TODO's) that call upon you to reflect on what the code is doing. Please add these notes to your doucmentation as well.

###### Strategy
You will want to define a strategy for solving the problem before you begin to code. Once you have a strategy defined, you can break it into steps that can be split into helper modules. Each helper module should solve a small specific problem. The main module should utilize the helper modules to execute your original stratagy.

1. Gather user input (infile and transform)
1. Read the input bitmap file using the fs module
1. Parse the bitmap's buffer into object represeting a bitmap (using a constructor)
1. Using metadata from the parsed bitmap object run a transform on the buffer directly (mutate the color or raster data)
1. Write the mutated buffer to the output file path

## Starter Code
You've been provided with starter code that implements the basic wiring of the above strategy.
* The index.js file reads the file and creates a bitmap instance that can `parse()` and `transform()`
* The parsing has been left to you
* A sample (yet non-functional) transformation has been provided.
* No tests have been written, you'll need to implement those

###### Transfrom Ideas
* Color Pallet Transforms 
  * Invert 
  * Randomize
  * Black and White
  * Darken or Lighten
  * Add or Mutiply a Hue
  * Add or Subtract Contrast
  
* Raster Data Transforms
  * Pixilate
  * Add a border
  * Add a watermark
  * Vertically or Horizontaly Filp
  * Verticaly or Horizontaly Mirror
  * Verticaly or Horizontaly Stretch
