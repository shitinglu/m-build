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
  shell.exec(`mkdir bin`);
  shell.exec(`mkdir data`);
  shell.exec(`mkdir data${slash}config`);
  shell.exec(`mkdir routes`);

  shell.exec(`mkdir project`);
  shell.exec(`mkdir project${slash}order`);

  shell.exec(`mkdir project${slash}order${slash}source`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}css`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}images`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}js`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}js-lab`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}sass`);
  shell.exec(`mkdir project${slash}order${slash}source${slash}WEB-INF`);

  shell.exec(`mkdir project${slash}order${slash}build`);
  shell.exec(`mkdir project${slash}order${slash}build${slash}css`);
  shell.exec(`mkdir project${slash}order${slash}build${slash}images`);
  shell.exec(`mkdir project${slash}order${slash}build${slash}js`);
  shell.exec(`mkdir project${slash}order${slash}build${slash}WEB-INF`);


  shell.exec(`mkdir project${slash}order${slash}app`);
  shell.exec(`mkdir project${slash}order${slash}app${slash}css`);
  shell.exec(`mkdir project${slash}order${slash}app${slash}images`);
  shell.exec(`mkdir project${slash}order${slash}app${slash}js`);
  shell.exec(`mkdir project${slash}order${slash}app${slash}WEB-INF`);

  shell.exec(`mkdir .m-build`);

}


module.exports = creatCatalog;
