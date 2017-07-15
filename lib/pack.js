
/*jshint esversion: 2015 */
/*jslint evil: true */
/*jshint expr:true */
/*jshint proto: true */
/*jshint loopfunc: true */


// 脚本输出
const shell = require("shelljs");

/**
 * pack命令的参数处理函数
 */
function pack() {

    shell.exec(`gulp pack`);
}


module.exports = pack;
