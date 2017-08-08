/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const path = require('path');

const gulp = require('gulp');

const gulpclean = require('gulp-clean');

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
var jsLabWatch = (dir, config, done) => {

  var src = dir.src;
  var dist = dir.dist;

  var watcher = gulp.watch(src.jsLab + "**/*.*");

  watcher.on('change', function(link, stats) {

    var baseName = path.basename(link);
    var subcatalog=path.dirname(link).slice(src.jsLab.length);

    return gulp.src(link)
      .pipe(gulp.dest(dist.js+subcatalog))
      .pipe(print(function() {
        gutil.log(notice(`${link}已经添加 并被移动到${dist.js}${subcatalog.length>0?subcatalog+'/':subcatalog}${baseName}`));
        done();
      }));

  });

  watcher.on('add', function(link, stats) {

    var baseName = path.basename(link);
    var subcatalog=path.dirname(link).slice(src.jsLab.length);

    return gulp.src(link)
      .pipe(gulp.dest(dist.js+subcatalog))
      .pipe(print(function() {
        gutil.log(notice(`${link}已经创建 并被移动到${dist.js}${subcatalog.length>0?subcatalog+'/':subcatalog}${baseName}`));
        done();
      }));

  });

  // watcher.on('unlink', function(link, stats) {
  //
  //   var baseName = path.basename(link);
  //   var subcatalog=path.dirname(link).slice(src.i.length);
  //
  //   return gulp.src(`${dist.i}${subcatalog}${baseName}`, {
  //       read: false
  //     })
  //     .pipe(gulpclean({
  //       force: true
  //     }))
  //     .pipe(print(function(filepath) {
  //       gutil.log(notice(`${link} 和 ${dist.i}${subcatalog}${baseName} 已经被删除`));
  //       done();
  //     }));
  // });

};

module.exports = jsLabWatch;
