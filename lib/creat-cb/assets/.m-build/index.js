/*jshint node: true   */ //定义node
/*jshint esversion: 6 */ //定义ES6
const gulp = require('gulp');

const color = require('colors-cli/safe');
const error = color.x199;
const notice = color.x220;

const getWatchList = require('./watch')();
const getPackList = require('./pack')();

module.exports = (dir,config,watchConfig,packConfig) => {

  console.log(notice("----------------------------------------------"));
  console.log(notice("|            * 欢迎使用 m-build  *           |"));
  console.log(notice("----------------------------------------------"));

  // 生成需要用的插件数组
  var defaultArr=[];
  var packArr=[];

  // 匹配watch对应的任务名
  watchConfig.forEach(function(name,key){
    if(getWatchList[name])
      defaultArr.push(getWatchList[name].bind(null,dir,config));
  });

  /**
   * 注册default 默认任务
   */
  gulp.task('default', gulp.parallel.apply(null,defaultArr));


  // 匹配pack对应的任务名
  packConfig.forEach(function(name,key){
    if(getPackList[name])
      packArr.push(getPackList[name].bind(null,dir,config));
  });

  /**
   * 注册pack任务
   */
  gulp.task('pack', gulp.series.apply(null,packArr));
};
