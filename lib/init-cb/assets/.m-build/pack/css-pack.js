/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');

const minifyCSS = require('gulp-clean-css');


/**
 * 监听html 相关处理
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var cssPack=(dir, config) => {

  var src = dir.src;
  var dist = dir.dist;
  var build = dir.build;

  return gulp.src(dist.css + '/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(build.css));
};

module.exports = cssPack;
