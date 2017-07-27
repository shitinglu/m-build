/*jshint esversion: 2015 */

// 脚本输出
const shell = require("shelljs");

// 系统模块
const fs = require('fs');
const os = require('os');

// 小工具
const util = require('./lab/util');


const h5Cb=require('./init-cb/init-h5.js');
const mCb=require('./init-cb/init-m.js');


/** 命令行字体颜色打印 **/
const shellColor = require('colors-cli/safe');
const error = shellColor.x199;
const warn = shellColor.x228;
const notice = shellColor.x78;

/**
 * creat命令的参数处理函数
 * @param  {Array|String}  [option=[]] [默认是数组，如果是单个参数可能是字符串内部会转换成数组]
 * @return {Null}
 */
function init(option = []) {

    var conf = [];

    if (util.type(option) == 'string') conf.push(option);
    else if (util.type(option) == 'array') conf = option;

    switch (conf[0]) {
        case undefined:
            h5Cb();
            break;
        case 'h5':
            h5Cb();
            break;
        case 'm':
            mCb();
            break;
        default:
            shell.echo(error('err -->  arguments err'));
    }
    // shell.exec('mkdir js');
    // shell.cp('-R', '../temp/*', '/');
}






module.exports = init;
