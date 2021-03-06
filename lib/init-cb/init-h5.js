/*jshint esversion: 2015 */

const shell = require("shelljs");

const path = require("path");
const os = require('os');

const copyList=require('../lab/copyList');

// 创建目录模块
const creatCatalog =require("./catalog/catalog-h5.js");
const copyDir =require("../lab/copyDir.js");


/** 命令行字体颜色打印 **/
const shellColor = require('colors-cli/safe');
const error = shellColor.x199;
const warn = shellColor.x228;
const notice = shellColor.x78;

function h5Cb(name='iife'){
  var pathConfig;

    // 需要读写的文件集
    pathConfig=[{
        read:path.normalize(__dirname + '/assets/h5-temp/package.json'),
        write:path.normalize(process.cwd()+'/package.json')
      },{
        read:path.normalize(__dirname + '/assets/h5-temp/gulpfile.js'),
        write:path.normalize(process.cwd()+'/gulpfile.js')
      },{
        read:path.normalize(__dirname + '/assets/h5-temp/.babelrc'),
        write:path.normalize(process.cwd()+'/.babelrc')
      },{
        read:path.normalize(__dirname + '/assets/h5-temp/config.js'),
        write:path.normalize(process.cwd()+'/project/page/config.js')
      }
    ];


  //统一的创建目录结构
  creatCatalog();

  // 读写文件
  copyList(pathConfig,function(){

    copyDir(path.normalize(__dirname + '/assets/.m-build'),path.normalize(process.cwd()+'/.m-build'));

    setTimeout(function(){
      shell.echo(error('目录结构和配置文件创建完成 请运行 < npm install > 下载项目需要的包依赖'));
    },1000);

    return;
  });
}


module.exports = h5Cb;
