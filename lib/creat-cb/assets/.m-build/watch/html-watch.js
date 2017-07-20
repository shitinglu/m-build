/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');

const gulphtmlmin = require('gulp-htmlmin');

const path = require('path');

const gulpclean = require('gulp-clean');

const gutil = require('gulp-util');

const print = require('gulp-print');

const color = require('colors-cli/safe');
const error = color.x199;
const notice = color.x220;

/**
 * 监听html 相关处理
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var htmlminWatch = (dir, config,done) => {

  var src = dir.src;
  var dist = dir.dist;


  var watcher = gulp.watch(src.src + "*.html");

  watcher.on('change', function(link, stats) {

    var baseName = path.basename(link);

    return gulp.src(link)
      .pipe(gulphtmlmin(config.htmlminConfig))
      .pipe(gulp.dest(dist.app))
      .pipe(print(function() {
        gutil.log(notice(`${link}已经编译 并被移动到${dist.app}${baseName}`));
        done();
      }));

  });

  watcher.on('add', function(link, stats) {

    var baseName = path.basename(link);

    return gulp.src(link)
      .pipe(gulphtmlmin(config.htmlminConfig))
      .pipe(gulp.dest(dist.app))
      .pipe(print(function() {
        gutil.log(notice(`${link}已经创建 并被移动到${dist.app}${baseName}`));
        done();
      }));

  });

  // watcher.on('unlink', function(link, stats) {
  //   var baseName = path.basename(link);
  //   return gulp.src(`${dist.app}${baseName}`, {
  //       read: false
  //     })
  //     .pipe(gulpclean({
  //       force: true
  //     }))
  //     .pipe(print(function(filepath) {
  //       gutil.log(notice(`${link} 和 ${dist.app}${baseName} 已经被删除`));
  //       done();
  //     }));
  // });
};

module.exports = htmlminWatch;
