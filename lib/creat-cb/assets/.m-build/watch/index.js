/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node
/** gulp模块 **/
const gulp = require('gulp');

/**  各个模块  **/
const sassWatch = require('./sass-watch');
const jsWatch = require('./js-watch');
const htmlWatch = require('./html-watch');
const imgWatch = require('./img-watch');
const cssWatch = require('./css-watch');
const vmWatch = require('./vm-watch');
const tempWacth = require('./temp-watch');
const server = require('../server');


var watchList = (dir, config) => {

  return {
    sassWatch,
    jsWatch,
    htmlWatch,
    imgWatch,
    cssWatch,
    vmWatch,
    tempWacth,
    server
  };

};


module.exports = watchList;
