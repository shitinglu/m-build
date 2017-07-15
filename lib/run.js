
/*jshint esversion: 2015 */
/*jslint evil: true */
/*jshint expr:true */
/*jshint proto: true */
/*jshint loopfunc: true */


// 脚本输出
const shell = require("shelljs");



/**
 * run命令的参数处理函数
 */
function run() {

    shell.exec(`gulp`);

    // shell.exec('node ./bin/www');
}


module.exports = run;
