/*jshint esversion: 2015 */
/*jslint evil: true */
/*jshint expr:true */
/* jshint proto: true */
/*jshint loopfunc: true */

// 脚本输出
const shell = require("shelljs");
const os = require('os');

function creatCatalog(){


  var slash;
  // 判断是否是windows操作系统
  if(os.platform()=='win32'){
    slash='\\';
  }else{
    slash='/';
  }

  // 创建目录结构
  shell.exec(`mkdir projectName`);
  shell.exec(`mkdir projectName${slash}pageName`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src${slash}js`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src${slash}i`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src${slash}sass`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src${slash}css`);
  shell.exec(`mkdir projectName${slash}pageName${slash}src${slash}temp`);

  shell.exec(`mkdir projectName${slash}pageName${slash}dist`);
  shell.exec(`mkdir projectName${slash}pageName${slash}dist${slash}js`);
  shell.exec(`mkdir projectName${slash}pageName${slash}dist${slash}i`);
  shell.exec(`mkdir projectName${slash}pageName${slash}dist${slash}css`);


  shell.exec(`mkdir .m-build`);

}



module.exports = creatCatalog;
