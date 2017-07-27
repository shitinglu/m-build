/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node

/** node系统模块 **/
const path = require('path');
const fs = require("fs");

/** gulp模块 **/
const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpWatch = require('gulp-watch');
const pngquant = require('imagemin-pngquant');
const rename = require("gulp-rename");
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gulphtmlmin = require('gulp-htmlmin');
const gulppostcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');

/** browserSync模块 **/
const browserSync = require('browser-sync').create();


/** webpack模块 **/
const webpack = require('webpack');

/** rollup模块 **/
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const rollupUglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const regenerator = require('rollup-plugin-regenerator');
const postcss = require('rollup-plugin-postcss');

/** 命令行字体颜色 **/
const color = require('colors-cli/safe');
const error = color.x199;
const warn = color.x228;
const notice = color.x78;

// var getConfig = require('./dir-config');


const util = require('./util/util');

const sassWatch = require('./sass-watch');
const jsWatch = require('./js-watch');
const server = require('./server');

module.exports = (dir, config) => {

  var src = dir.src;
  var dist = dir.dist;

  // /**
  //  * [rollupCb description]
  //  * @param  {[type]}   e    [description]
  //  * @param  {Function} done [description]
  //  * @return {[type]}        [description]
  //  */
  // function rollupCb(e, done) {
  //
  //   // 找到源文件路径
  //   var baseURL = e.history[0];
  //
  //   var entryName = path.basename(baseURL);
  //   // 获取源文件的后半部分文件名
  //   var outName = entryName.slice(5);
  //
  //   console.log(warn('packing ->>  ' + src.js + entryName));
  //
  //   let pluginsArr = [
  //     postcss({
  //       plugins: [
  //         // cssnext(),
  //         // yourPostcssPlugin()
  //       ],
  //       //sourceMap: false, // default value
  //       //extract: false, // default value
  //       extensions: ['.css', '.sss'] // default value
  //       // parser: sugarss
  //     }),
  //     nodeResolve({
  //       jsnext: true
  //     }),
  //     commonjs({
  //       sourceMap: false
  //     }),
  //     babel({
  //       runtimeHelpers: true
  //     }),
  //     rollupUglify()
  //   ];
  //
  //   //  开始打包
  //   return rollup({
  //     entry: src.js + entryName,
  //     plugins: pluginsArr
  //   }).then(function(bundle) {
  //
  //     bundle.write({
  //       format: config.rollup.format,
  //       // moduleName 就是你导出模块的名字
  //       moduleName: config.rollup.moduleName || util.camelize(util.dasherize(outName.substring(0, outName.lastIndexOf('.')))),
  //       sourceMap: false,
  //       dest: dist.js + util.dasherize(outName)
  //     });
  //     console.log(warn('packed  ->>  ' + dist.js + util.dasherize(outName)), '\n');
  //     done();
  //
  //   }, function(err) {
  //     console.log(error(err));
  //   });
  //
  // }
  //
  // /**
  //  * [webpackCb description]
  //  * @param  {[type]}   e    [description]
  //  * @param  {Function} done [description]
  //  * @param  {[type]}   dir  [description]
  //  * @return {[type]}        [description]
  //  */
  // function webpackCb (e, done){
  //
  //   var baseURL = e.history[0];
  //
  //   var entryName = path.basename(baseURL);
  //
  //   // 获取源文件的后半部分文件名
  //   var outName = entryName.slice(5);
  //
  //   console.log(warn('packing ->>  ' + src.js + entryName));
  //
  //   // 添加动态的配置
  //   config.webpackConfig.entry = src.js + entryName;
  //
  //   config.webpackConfig.output = {
  //     path: dist.js,
  //     filename: util.dasherize(outName)
  //   };
  //
  //   // 开启打包
  //   webpack(config.webpackConfig, function(err, stats) {
  //     if (err)
  //       console.log(error(err));
  //     else {
  //       for (var i = 0; i < stats.compilation.fileDependencies.length; i++) {
  //         console.log(notice(stats.compilation.fileDependencies[i]));
  //       }
  //       console.log(warn('packed  ->>  ' + dist.js + util.dasherize(outName)), '\n');
  //       done();
  //     }
  //   });
  // }

  /**
   * js编译打包
   */
  function jsPack(done) {
    // 用了异步读取 这个不好 但是为了防止gulp log出现异常
    var fileArr = fs.readdirSync(src.js);

    fileArr.forEach(function(name, index) {
      var reg = /^entry./;

      if (reg.test(name)) {
        var e = {};
        e.history = [];
        e.history.push(__dirname + '/' + src.js + name);


        /** 监听 ruollup 打包 js **/
        if (config.rollup.need && !config.webpack.need)
          rollupCb(e, done);

        /** 监听 webpack 打包 js **/
        if (config.webpack.need && !config.rollup.need)
          webpackCb(e, done);
      }

    });
  }

  /**
   * sass编译
   */
  function sassPack() {
    return gulp.src(src.scss + '*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulppostcss(config.sassProcessors))
      .pipe(minifyCSS())
      .pipe(gulp.dest(src.css))
      .pipe(gulp.dest(dist.css));
  }

  /**
   * css编译
   */
  function cssPack() {
    return gulp.src(src.css + '*.css')
      .pipe(gulppostcss(config.cssProcessors))
      .pipe(minifyCSS())
      .pipe(gulp.dest(dist.css));
  }

  /**
   * html 压缩方法
   */
  function htmlminPack(dir) {
    console.log(dir)
    return gulp.src(src.src + "*.html")
      .pipe(gulphtmlmin(config.htmlminConfig))
      .pipe(gulp.dest(dist.app));
  }

  /**
   * 图片压缩  只是移动目录
   */
  function imgminPack() {
    return gulp.src(src.i + "*")
      .pipe(gulp.dest(dist.i));
  }


  /**********************************  分割线   ********************************************/



  // /**
  //  * 监听JS 并且webpack 打包
  //  */
  // function jswatch(done) {
  //
  //   return gulpWatch(src.js + "entry*.js", function(e) {
  //
  //     /** 监听 ruollup 打包 js **/
  //     if (config.rollup.need && !config.webpack.need)
  //     rollupCb(e, done);
  //
  //     /** 监听 webpack 打包 js **/
  //     if (config.webpack.need && !config.rollup.need)
  //     webpackCb(e,done);
  //
  //   });
  // }
  /**
   * 开始node服务 browserSync
   */
  // function server() {
  //   browserSync.init({
  //     server: dist.app,
  //     directory: true, //显示目录名
  //     port: 3000,
  //     //  https: true     //https支持
  //     // tunnel:true			//外网访问地址
  //   });
  //   /** 监听目录 reload  **/
  //   gulp.watch(dist.app + "**/**").on("change", browserSync.reload);
  // }



  /**
   *  监听html压缩
   */
  // function htmlminWatch() {
  //
  //   return gulpWatch(src.src + "*.html", {
  //       ignoreInitial: false
  //     })
  //     .pipe(gulphtmlmin(config.htmlminConfig))
  //     .pipe(gulp.dest(dist.app));
  // }


  /**
   *  监听图片 瞬间移动目录
   */
  // function imgminWatch() {
  //   return gulpWatch(src.i + "*", {
  //       ignoreInitial: false
  //     })
  //     .pipe(gulp.dest(dist.i));
  // }

  /**
   * 监听sass目录 并编译
   */
  // function sassWatch(){
  //   return gulpWatch(src.scss + '*.scss', {
  //       ignoreInitial: false
  //     })
  //     .pipe(sass().on('error', sass.logError))
  //     .pipe(gulppostcss(config.sassProcessors))
  //     .pipe(minifyCSS())
  //     .pipe(gulp.dest(src.css))
  //     .pipe(gulp.dest(dist.css));
  // }

  /**
   * 监听css 并编译
   */
  // function cssWatch(done) {
  //   return gulpWatch(src.css + '*.css', {
  //       ignoreInitial: false
  //     })
  //     .pipe(gulppostcss(config.cssProcessors))
  //     .pipe(minifyCSS())
  //     .pipe(gulp.dest(dist.css));
  //
  // }


  /**
   * 研发 任务
   * series 中的任务同步执行
   * parallel 中的任务异步执行
   */

  /**
   * gulp 打包任务
   */
  gulp.task('pack', gulp.series(htmlminPack.bind(null, dir), imgminPack, sassPack, cssPack, jsPack));

  /**
   * [gulp 默认任务]
   */
  gulp.task('default', gulp.parallel(
    server.bind(null, dir, config),
    jsWatch.bind(null, dir, config),
    imgminWatch,
    htmlminWatch,
    sassWatch.bind(null, dir, config),
    cssWatch));

};
