/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const path = require('path');

const gulp = require('gulp');

const gulpclean = require('gulp-clean');

const tmodjs = require('gulp-tmod');

const gutil = require('gulp-util');

const print = require('gulp-print');

const color = require('colors-cli/safe');
const error = color.x199;
const notice = color.x220;


/**
 * 监听图片目录  只所移动处理  压缩图片会失帧  后期会有更多操作
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var tempWatch = (dir, config, done) => {

  var src = dir.src;
  var dist = dir.dist;

  var watcher = gulp.watch(src.temp + "**/*.html");

  watcher.on('change', function(link, stats) {


    return gulp.src(link)
			.pipe(tmodjs({
				templateBase: 'template'
			}))
			.pipe(gulp.dest(dist.js));

  });

  watcher.on('add', function(link, stats) {

    return gulp.src(link)
      .pipe(tmodjs())
      .pipe(gulp.dest(dist.js));


  });

  watcher.on('unlink', function(link, stats) {

  });

};

module.exports = tempWatch;
