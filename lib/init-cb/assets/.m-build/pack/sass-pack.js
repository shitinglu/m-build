/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');

const sass = require('gulp-sass');

const minifyCSS = require('gulp-clean-css');

const gulppostcss = require('gulp-postcss');

/**
 * 监听html 相关处理
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var sassPack = (dir, config) => {

  var src = dir.src;
  var dist = dir.dist;

  return gulp.src(src.scss + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulppostcss(config.sassProcessors))
    .pipe(minifyCSS())
    .pipe(gulp.dest(dist.css));
};

module.exports = sassPack;
