var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

function extend(target, source) {
    for (var name in source) {
        if (source[name] != undefined) {
            target[name] = source[name];
        }
    }
    return target;
}

/* GET home page. */
router.get('/vms/:pageName.vm', function(req, res, next) {
    var pageName = req.params.pageName;
    res.render(pageName, { name: 'velocity', aaa: 'xxxxx' });
});

/* GET home page. 
路由规则：
ip:<端口>/page／具体文件保存的目录（WEB-INF以下的目录，不包含WEB-INF）
根据地址信息，获取初始化配置数据和初始化显示数据
JSON数据保存位置在data文件夹下面
data／config下面保存配置数据，跟请求的pageName相同
初始化显示数据与请求的action相同
*/
router.get('/(([a-zA-Z0-9-]+/)+)?:pageName/:action', function(req, res, next) {
    var pageName = req.params.pageName,
        dataPath, data, filePath = "",
        configPath, configData;
    var path = req.path;
    var paths = path.split('/'),
        len = paths.length;
    for (var i = 0; i < len; i++) {
        if (i < len - 1 && i > 0) {
            filePath += '/' + paths[i];
        }
    }
    console.log("---pathsLength---" + paths[len - 2]);
    console.log("---filePath0---" + filePath);
    var objData = {};
    var initModel = {};
    try {
        dataPath = 'data/' + req.params.action + '.json';
        configPath = 'data/config/' + req.params.pageName + '.json';
        data = fs.readFileSync(dataPath);
        configBit = fs.readFileSync(configPath);
        configData = JSON.parse(configBit.toString());
        objData = JSON.parse(data.toString());
        initModel = extend(objData, configData);
        console.log("----------------------------------------------------");
        console.log("---initModel---" + "...");
        console.log("----------------------------------------------------");
    } catch (e) {}
    console.log(filePath.replace(/\/page\//, '') + '.vm');
    console.log("---filePath4---" + filePath.replace(/\/page\//, '') + '.vm');
    res.render(filePath.replace(/\/page\//, '') + '.vm', initModel);
});

module.exports = router;