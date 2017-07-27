/**
 * [驼峰转换成正常模式 lineHeight 转 line-height]
 * @param  {String} str
 * @return {String}
 */
var dasherize= function (str) {
  return str.replace(/::/g, '/') // 把::替换成 /
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') //把 BAa  替换成 B-Aa
    .replace(/([a-z\d])([A-Z])/g, '$1_$2') //把 aaaAasd  替换成 a-A
    .replace(/_/g, '-')
    .toLowerCase();
};

/**
 * line-height转换成lineHeight  转驼峰
 * @param  {String} str
 * @return {String}
 */
var camelize=function (str) {
  return str.replace(/-+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
};

module.exports = {
  dasherize:dasherize,
  camelize:camelize
};
