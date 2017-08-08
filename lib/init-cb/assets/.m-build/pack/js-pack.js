/*jshint esversion: 6 */ //定义ES6
/*jshint node: true  */ //定义node

/** node系统处理路径模块 **/
const path = require('path');

/** gulp 模块 **/
const gulp = require('gulp');

/** gulp 压缩混淆模块 **/
const uglify = require('gulp-uglify');


/**
 * 监听JS执行相关打包操作
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 * @param  {Function} done   [函数执行成功后的回调函数]
 */
var jsPack = (dir, config, done) => {

  var src = dir.src;
  var dist = dir.dist;
  var build = dir.build;

  return gulp.src(dist.js + "/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest(build.js));

};

module.exports = jsPack;
