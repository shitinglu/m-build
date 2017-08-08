/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');

const sass = require('gulp-sass');

const compass = require('gulp-compass');

const minifyCSS = require('gulp-clean-css');

const gulppostcss = require('gulp-postcss');

/**
 * 监听html 相关处理
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var sassCompile = (dir, config) => {

  var src = dir.src;
  var dist = dir.dist;
  if(!config.sass.compass){

    return gulp.src(src.scss + '/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulppostcss(config.sassProcessors))
      // .pipe(minifyCSS())
      .pipe(gulp.dest(dist.css));

  }else{

    return gulp.src(src.scss + '/**/*.scss')
      .pipe(compass({
        css: dist.css,
        sass:src.scss
      })).on('error', function(e) {console.log(e);})
      .pipe(gulppostcss(config.sassProcessors))
      // .pipe(minifyCSS())
      .pipe(gulp.dest(dist.css));
  }

};

module.exports = sassCompile;
