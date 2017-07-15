#! /usr/bin/env node

/*jshint esversion: 2015 */

const program = require('commander');
const packageJson = require('../package.json');
const creat = require('../lib/creat');
const run = require('../lib/run');
const pack = require('../lib/pack');

// 此处不用简写是为了参数的统一化
// []代表可填项   <>代表必填项
program
  .allowUnknownOption()
  .version(packageJson.version, '-v,--version')
  .option('creat [value]', '初始化目录[ h5 | m ]')
  .option('run [value]', '开启服务')
  .option('pack [value]', '打包')
  .parse(process.argv);


if (program.creat) {
  creat(program.creat);
} else if (program.run) {
  run(program.run);
} else if (program.pack) {
  pack(program.pack);
} else {
  console.log('无此命令');
}
