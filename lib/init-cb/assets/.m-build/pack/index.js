/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

/** gulp模块 **/
const gulp = require('gulp');

/**  各个模块  **/
const jsPack = require('./js-pack');
const htmlPack = require('./html-pack');
const imgPack = require('./img-pack');
const cssPack = require('./css-pack');
const vmPack = require('./vm-pack');



var packList = (dir, config) => {


  return {
    jsPack,
    htmlPack,
    imgPack,
    cssPack,
    vmPack
  };


};


module.exports = packList;
