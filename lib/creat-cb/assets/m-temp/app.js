var fs = require('fs');
var utilx = require('./node_modules/utilx');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/index');
// var users = require('./routes/users');
var app = express();
var paths = [];
var VelocityEngine = require('velocity').Engine;
// view engine setup
app.engine('vm', function(filePath, options, callback) {
    var targetVM = "";
    console.log("---filePath1---" + filePath);
    if (filePath.indexOf('.vm') != -1) {
        var content = utilx.readFile(filePath, 'gbk');
        if (content.indexOf('$layout') != -1) {

            var reg = /\$layout(\s*)=(\s*)\"(.*\.vm)\"/;
            var matchs = content.match(reg);

            if (matchs.length > 0) {
                var files = filePath.split('build');
                targetVM = filePath.split('project')[1];
                filePath = files[0] + 'build/WEB-INF/layout/' + matchs[3];
                console.log("---files[0]---" + files[0]);
                console.log("---filePath2---" + filePath);
                console.log("---targetVM---" + targetVM);

            }
        }
    }
    var engine = new VelocityEngine({ encoding: 'gbk', root: './project', template: filePath, targetVM: "./" + targetVM });
    options["Double"] = {
        "parseDouble": function(str) {
            return parseFloat(str);
        },
        "parseInt": function(str) {
            return parseInt(str);
        },
        "parseString": function(str) {
            return str + "";
        }
    };
    options['utils'] = {
        "tostring": function(obj) {
            return JSON.stringify(obj);
        },
        "checkTimes": function(dateTime) {
            var patten = /[0-9]{1,2}:00-[0-9]{1,2}:00/g;
            return patten.test(dateTime);
        }
    };
    options["murl"] = {
        /**
         * 清除字符串
         *
         * @param str1   源字符串
         * @param str2   清除掉字符串
         * @return
         */
        "splitStr": function(str1, str2) {
            if (str1 && str2) {
                if (str1.indexOf(str2) != -1) {
                    return str1.replace(str2, "");
                }
            }
        },
        /**
         * 合并请求地址，将sid附加到地址里面ʽ
         * @param base
         * @param sid
         * @return
         */
        "composite": function(base, sid) {
            var url;
            var paramStr = base.indexOf("?") != -1 ? "&" : "?";
            if (base && sid) {
                url = base + paramStr + "sid=" + escape(sid.replace(new RegExp("[\'\"\\s]", "gm"), ""));
            }
            return url.toString();
        }
    };
    options.NumberTool = {
        format: function(fort, str) {
            return str + '.00';
        }
    };

    var rendered = engine.render(options);
    return callback(null, rendered);
});

// view engine setup
/*
 * 配置模板路径
 * */
paths.push(path.join(__dirname, './project'));
//paths.push( path.join(__dirname, 'baseView'))
app.set('views', paths);
app.set('view engine', 'vm');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'project')));
app.use('/page', express.static(path.join(__dirname, 'project')));

app.use('/', routes);
// app.use('/users', users);
app.use('/data', express.static('data'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
