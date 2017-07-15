/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const path = require('path');

const gulp = require('gulp');

const minifyCSS = require('gulp-clean-css');

const gulppostcss = require('gulp-postcss');

const gulpclean = require('gulp-clean');

const gutil = require('gulp-util');

const print = require('gulp-print');

const color = require('colors-cli/safe');
const error = color.x199;
const notice = color.x220;

/**
 * 监听css目录  进行相关操作
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var cssWatch = (dir, config,done) => {
  var src = dir.src;
  var dist = dir.dist;

  var watcher = gulp.watch(src.css + '*.css');

  watcher.on('change', function(link, stats) {
    var baseName = path.basename(link);
    return gulp.src(link)
      .pipe(gulppostcss(config.cssProcessors))
      .pipe(minifyCSS())
      .pipe(gulp.dest(dist.css))
      .pipe(print(function() {
        gutil.log(notice(`${link} 已经被编译  -->  输出在${dist.css}${baseName}`));
        done();
      }));
  });

  watcher.on('add', function(link, stats) {

    var baseName = path.basename(link);

    return gulp.src(link)
      .pipe(gulppostcss(config.cssProcessors))
      .pipe(minifyCSS())
      .pipe(gulp.dest(dist.css))
      .pipe(print(function() {
        gutil.log(notice(`${link} 已经被添加并且编译  --> 输出在${dist.css}${baseName}`));
        done();
      }));
  });

  watcher.on('unlink', function(link, stats) {

    var baseName = path.basename(link);

    return gulp.src(`${dist.css}${baseName}`, {
        read: false
      })
      .pipe(gulpclean({
        force: true
      }))
      .pipe(print(function(filepath) {
        gutil.log(notice(`${link} 和 ${dist.css}${baseName} 已经被删除`));
        done();
      }));

  });

};

module.exports = cssWatch;
