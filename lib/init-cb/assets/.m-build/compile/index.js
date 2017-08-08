/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

/** gulp模块 **/
const gulp = require('gulp');

/**  各个模块  **/
const sassCompile = require('./sass-compile');
const jsCompile = require('./js-compile');
const jsLabCompile = require('./js-lab-compile');
const htmlCompile = require('./html-compile');
const imgCompile = require('./img-compile');
const cssCompile = require('./css-compile');
const vmCompile = require('./vm-compile');



var complieList = (dir, config) => {

  return {
    sassCompile,
    jsCompile,
    jsLabCompile,
    htmlCompile,
    imgCompile,
    cssCompile,
    vmCompile
  };

};


module.exports = complieList;
