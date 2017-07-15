/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');

const gulpWatch = require('gulp-watch');


/**
 * 监听图片目录  只所移动处理  压缩图片会失帧  后期会有更多操作
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var vmPack=(dir, config) => {

  var src = dir.src;
  var dist = dir.dist;

  return gulp.src(src.i + "*.vm")
    .pipe(gulp.dest(dist.i));

};

module.exports = vmPack;
