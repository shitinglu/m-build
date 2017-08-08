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
  shell.exec(`mkdir project`);
  shell.exec(`mkdir project${slash}page`);
  shell.exec(`mkdir project${slash}page${slash}src`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}js`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}js-lab`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}i`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}sass`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}css`);
  shell.exec(`mkdir project${slash}page${slash}src${slash}temp`);

  shell.exec(`mkdir project${slash}page${slash}dist`);
  shell.exec(`mkdir project${slash}page${slash}dist${slash}js`);
  shell.exec(`mkdir project${slash}page${slash}dist${slash}i`);
  shell.exec(`mkdir project${slash}page${slash}dist${slash}css`);

  shell.exec(`mkdir project${slash}page${slash}build`);
  shell.exec(`mkdir project${slash}page${slash}build${slash}js`);
  shell.exec(`mkdir project${slash}page${slash}build${slash}i`);
  shell.exec(`mkdir project${slash}page${slash}build${slash}css`);


  shell.exec(`mkdir .m-build`);

}



module.exports = creatCatalog;
