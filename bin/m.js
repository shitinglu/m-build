#! /usr/bin/env node

/*jshint esversion: 2015 */

const program = require('commander');
const packageJson = require('../package.json');
const init = require('../lib/init');
const run = require('../lib/run');
const pack = require('../lib/pack');
const compile = require('../lib/compile');

// 此处不用简写是为了参数的统一化
// []代表可填项   <>代表必填项
program
  .allowUnknownOption()
  .version(packageJson.version, '-v,--version')
  .option('init [value]', '初始化目录[ h5 | m ]')
  .option('run [value]', '开启服务')
  .option('compile [value]', '编译所有文件')
  .option('pack [value]', '打包到线上环境')
  .parse(process.argv);


if (program.init) {

  init(program.init);

} else if (program.run) {

  run(program.run);

} else if (program.pack) {

  pack(program.pack);

} else if (program.compile) {

  compile(program.compile);

}else {
  console.log('无此命令');
}
