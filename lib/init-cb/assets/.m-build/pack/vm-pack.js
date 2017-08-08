/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

const gulp = require('gulp');


/**
 * 监听图片目录  只所移动处理  压缩图片会失帧  后期会有更多操作
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 */
var vmPack=(dir, config) => {

  var src = dir.src;
  var dist = dir.dist;
  var build = dir.build;

  return gulp.src(dist.vm + "/**/*.*")
    .pipe(gulp.dest(build.vm));

};

module.exports = vmPack;
