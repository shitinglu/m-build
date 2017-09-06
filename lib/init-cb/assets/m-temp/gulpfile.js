/*jshint esversion: 6 */ //定义ES6
/*jshint node: true   */ //定义node


/**
 * 需要开启服务的目录路径
 * @type {String}
 */
const fileName =  'project/order';

const MBuild = require('./.m-build');
const path = require("path");
const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');
const color = require('colors-cli/safe');
const error = color.x199;
const notice = color.x220;


var watchConfig=['sassWatch','jsWatch','jsLabWatch','htmlWatch','imgWatch','cssWatch','vmWatch'];

var compileConfig=['htmlCompile','imgCompile','cssCompile','sassCompile','vmCompile','jsLabCompile','jsCompile'];

var packConfig=['htmlPack','imgPack','cssPack','vmPack','jsPack'];



/**
 * 目录信息
 * @type {Object}
 */
const dir = {};


/**
 * 源目录
 * @type {Object}
 */
dir.src = {
  src: path.normalize(__dirname + '/' + fileName + '/source/'),
  scss: path.normalize(__dirname + '/' + fileName + '/source/sass/'),
  css: path.normalize(__dirname + '/' + fileName + '/source/css/'),
  js: path.normalize(__dirname + '/' + fileName + '/source/js/'),
  jsLab: path.normalize(__dirname + '/' + fileName + '/source/js-lab/'),
  i: path.normalize(__dirname + '/' + fileName + '/source/images/'),
  vm: path.normalize(__dirname + '/' + fileName + '/source/WEB-INF/')
};

/**
 * 输出目录
 * @type {Object}
 */
dir.dist = {
  app: path.normalize(__dirname + '/' + fileName + '/build/'),
  css: path.normalize(__dirname + '/' + fileName + '/build/css/'),
  js: path.normalize(__dirname + '/' + fileName + '/build/js/'),
  i: path.normalize(__dirname + '/' + fileName + '/build/images/'),
  vm: path.normalize(__dirname + '/' + fileName + '/build/WEB-INF/')
};

/**
 * 打包上传目录
 * @type {Object}
 */
dir.build = {
  build: path.normalize(__dirname + '/' + fileName + '/app/'),
  css: path.normalize(__dirname + '/' + fileName + '/app/css/'),
  js: path.normalize(__dirname + '/' + fileName + '/app/js/'),
  i: path.normalize(__dirname + '/' + fileName + '/app/images/'),
  vm: path.normalize(__dirname + '/' + fileName + '/app/WEB-INF/')
};

/**
 * 用户配置信息
 * @type {Object}
 */
var config = {
  collapseWhitespace: false,  //html是否压缩输出
  webpack: {
    need: true
  },
  css: {
    rem: {
      need: false,            //是否需要REM转换
      psdWidth: 750
    }
  },
  sass: {
    compass:false,
    rem: {
      need: false,             //是否需要REM转换
      psdWidth: 750
    }
  },
  rollup: {
    need: false,
    moduleName: null,
    format: "iife",
    jsUglify: true,
  }
};


/** 获取配置文件信息 **/
try {

  var userConfig = require(path.normalize(__dirname + '/' + fileName + '/config.js'));

  /** 合并配置参数 **/
  Object.assign(config, userConfig);

} catch (e) {

  console.log(error('-->config.js 找不到'));

}
/**
 * 插件配置信息
 * @type {Object}
 */
var plugConfig = {
  htmlminConfig: {
    //  removeComments: true,
    //  minifyJS: true,                                    //压缩页面JS
    //  minifyCSS: true,                                   //压缩页面CSS
    removeComments: true,                                  //清除HTML注释
    collapseWhitespace: config.collapseWhitespace,         //压缩HTML
    // collapseBooleanAttributes: true,                    //省略布尔属性的值 <input checked="true"/> ==> <input />
    // removeEmptyAttributes: true,                        //删除所有空格作属性值 <input id="" /> ==> <input />
    // removeScriptTypeAttributes: true,                   //删除<script>的type="text/javascript"
    // removeStyleLinkTypeAttributes: true,                //删除<style>和<link>的type="text/css"
  },
  webpackConfig: {
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',                           //此处不能用use，不知道为啥
        exclude: /node_modules/,                          //需要排除的目录
      },{
        test: /\.vue$/,
        loader: 'vue-loader'
      },{
          test: /\.art$/,
          loader: "art-template-loader",
          options: {
              // art-template options (if necessary)
              // @see https://github.com/aui/art-template
          }
        }]
    },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()/**new webpack.optimize.UglifyJsPlugin()**/],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    }
  },
  sassProcessors: config.sass.rem.need ? [pxtorem({
    rootValue: (16 * config.sass.rem.psdWidth) / 320,     //默认根节点字体大小 config.psdWidth 通过设计稿设置字体大小
    unitPrecision: 4,                                     //保留几位小数
    propList: ['*'],                                      //需要转换REM的属性 *为所谓
    selectorBlackList: [],
    replace: true,                                        //是否替换转换前的值
    mediaQuery: false,
    minPixelValue: 0
  })] : [],
  cssProcessors: config.css.rem.need ? [pxtorem({
    rootValue: (16 * config.css.rem.psdWidth) / 320,      //默认根节点字体大小 config.psdWidth 通过设计稿设置字体大小
    unitPrecision: 4,                                     //保留几位小数
    propList: ['*'],                                      //需要转换REM的属性 *为所谓
    selectorBlackList: [],
    replace: true,                                        //是否替换转换前的值
    mediaQuery: false,
    minPixelValue: 0
  })] : []
};

/**
 * 合并配置信息
 */
Object.assign(config, plugConfig);


/**
 * 调用 m-build 函数
 */
MBuild(dir, config , watchConfig , packConfig , compileConfig);
