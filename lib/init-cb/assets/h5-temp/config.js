/**配置文件**/

/**
 * [format 可选参数]
 * amd – 使用像requirejs一样的银木块定义
 * cjs – CommonJS，适用于node和browserify / Webpack
 * es (default) – 保持ES6的格式
 * iife – 使用于<script> 标签引用的方式
 * umd – 适用于CommonJs和AMD风格通用模式
 */



module.exports = {
  collapseWhitespace: false, //html是否压缩输出
  webpack: {
    need: true,
    devtool: false,
    rem: {
      need: true, //是否需要REM转换
      psdWidth: 750
    }
  },
  proxy: {
    need: false,
    list: [{
      'source': '/api',
      'target': ''
    },{
      'source': '/aip',
      'target': ''
    },
    ]
  },
  css: {
    rem: {
      need: false, //是否需要REM转换
      psdWidth: 750
    }
  },
  sass: {
    compass: false,
    rem: {
      need: true, //是否需要REM转换
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
