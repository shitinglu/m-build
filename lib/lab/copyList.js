// 脚本输出
const shell = require("shelljs");

const fs = require('fs');

function copyList(listArr,cb){
  var length=listArr.length;
  var numb=0;

  // 遍历数组
  listArr.forEach(function(josn){

    var rs=fs.createReadStream(josn.read);
    var ws=fs.createWriteStream(josn.write);

    // 读取流监控
    rs.on('error',function(e){
        shell.echo('read err -->'+JSON.stringify(e));
    });

    // 写入流监控
    ws.on('error',function(e){
      shell.echo('write err -->'+JSON.stringify(e));
    });

    ws.on('finish',function(e){
      numb++;
      if(numb==length){

          cb&&cb();

        return;
      }
    });

    // 复制文件
    rs.pipe(ws);

  });

}

module.exports = copyList;
