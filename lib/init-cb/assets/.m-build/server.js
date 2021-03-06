/*jshint esversion: 6 */ //定义ES6
/*jshint node: true  */ //定义node

/** browserSync模块 **/
const browserSync = require('browser-sync').create();
const proxyMiddleware = require('http-proxy-middleware');

/** gulp 模块 **/
const gulp = require('gulp');

/**
 * 开启browserSync服务
 * @param  {Object}   dir    [目录信息]
 * @param  {Object}   config [配置信息]
 * @param  {Function} done   [函数执行成功后的回调函数]
 */
var server = (dir, config, done) => {

  var dist=dir.dist;

  if(config.proxy.need){

    var middleware=[];

    config.proxy.list.forEach(function(val){
      middleware.push(proxyMiddleware([val.source],{target: val.target, changeOrigin: true}));
    });

     browserSync.init({
       server: {
         baseDir: dist.app,
         middleware: middleware
       },
       directory: true,    //显示目录名
       port: 3000,
       https: false,       //https支持
       tunnel:false			  //外网访问地址
     });

     /** 监听目录 reload  **/
     gulp.watch(dist.app + "**/**")
       .on("change", browserSync.reload);
       
  }else{

    browserSync.init({
      server: dist.app,
      directory: true,    //显示目录名
      port: 3000,
      https: false,       //https支持
      tunnel:false			  //外网访问地址
    });

    /** 监听目录 reload  **/
    gulp.watch(dist.app + "**/**")
      .on("change", browserSync.reload);

  }

};

module.exports = server;
