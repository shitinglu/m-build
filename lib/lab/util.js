/*jshint esversion: 6 */
/*jslint evil: true */
/*jshint expr:true */
/* jshint eqnull:true */

var class2type = {},
    emptyArray = [],
    elementDisplay = {},
    toString = class2type.toString,
    cssNumber = {
        'column-count': 1,
        'columns': 1,
        'font-weight': 1,
        'line-height': 1,
        'opacity': 1,
        'z-index': 1,
        'zoom': 1
    };

// 给类型判断最一个预处理
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name, i) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

/**
 * 判断是否是function
 * @param  {Mix}      value
 * @return {Boolean}
 */
 function isFunction(value) {
    return typeof value == 'function';
}


/**
 * 判断是否是document
 * @param  {Mix}  obj
 * @return {Boolean}
 */
 function isDocument(obj) {
    // elem.DOCUMENT_NODE 也等于 9 （这里直接判断是不是9也行？？？）
    return obj !== null && obj.nodeType == obj.DOCUMENT_NODE;
}

/**
 * 判断是不是数组
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
 function isArray(obj) {
    var boolean;

    Array.isArray ? boolean = Array.isArray(obj) : boolean = function(object) {
        return object instanceof Array;
    };
    return boolean;
}

/**
 * 判断详细的类型
 * @param  {Mix} obj
 * @return {Boolean|Number|String|Function|Array|Date|RegExp|Object|Erro}
 */
 function type(obj) {
    return obj == null ?
        String(obj) : // null undefined
        class2type[toString.call(obj)] || "object";
}

/**
 * 判断是不是window
 * @param  {type}  obj
 * @return {Boolean}
 */
 function isWindow(obj) {
    return obj != null && obj == obj.window;
}

/**
 * 判断是不是对象 object
 * @param  {type}  obj
 * @return {Boolean}
 */
 function isObject(obj) {
    return type(obj) == "object";
}

/**
 * 测试是否是纯粹的对象 {} new Object
 * @param  {type}  obj
 * @return {Boolean}
 */
 function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

/**
 * 判断是否是一个数组或者是一个类数组
 * @param  {type} obj
 * @return {Boolean}
 */
 function likeArray(obj) {
    return typeof obj.length == 'number';
}

/**
 * 筛选数组，踢出 null undefined 元素
 * @param  {Array} array
 * @return {Array}
 */
 function compact(array) {
    return emptyArray.filter.call(array, function(item) {
        return item != null;
    });
}
/**
 * 拷贝继承
 * @param  {Object} target
 * @param  {Object} source
 * @param  {Boolean} deep
 * @return {Object}
 */
 function extend(target, source, deep) {

    for (var key in source)

        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {


        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
            target[key] = {};
        }

        if (isArray(source[key]) && !isArray(target[key]))
            target[key] = emptyArray;


        extend(target[key], source[key], deep);
    } else if (source[key] !== undefined) target[key] = source[key];

    return target;
}

/**
 * line-height转换成lineHeight  转驼峰
 * @param  {String} str
 * @return {String}
 */
 function camelize(str) {
    return str.replace(/-+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

// 将 lineHeight 转换为 line-height 格式
 function dasherize(str) {
    return str.replace(/::/g, '/') // 把::替换成 /
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') //把 BAa  替换成 B-Aa
        .replace(/([a-z\d])([A-Z])/g, '$1_$2') //把 aaaAasd  替换成 a-A
        .replace(/_/g, '-')
        .toLowerCase();
}

 function maybeAddPx(name, value) {
    // dasherize(name) 将 lineHeight 转换为 line-height 格式
    // !cssNumber[dasherize(name)] 判断转换出来的 css name 是否再这个数组之外
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ?
        // 如果 value 是数字，并且 name 不在 cssNumber 数组之内，就需要加 'px'，否则不需要
        // 例如 'width'、'font-size' 就需要加 'px'， 'font-weight' 就不需要加
        value + "px" :
        value;

    // 前文定义----------------------
    // cssNumber = {
    //   'column-count': 1,
    //   'columns': 1,
    //   'font-weight': 1,
    //   'line-height': 1,
    //   'opacity': 1,
    //   'z-index': 1,
    //   'zoom': 1
    // },

}

/**
 * 判断是否是一个空对象
 * @param  {Object}  obj
 * @return {Boolean}
 */
 function isEmptyObject(obj) {
    var name;
    for (name in obj) return false;
    return true;
}

/**
 * 判断是否在数组里面
 * @param  {Elem} elem
 * @param  {Arr} array
 * @param  {index} i
 * @return {Boolean}
 */
 function inArray(elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
}


/**
 * 对数组或者对象重新处理 并且映射出一个新数组或者新对象
 * @param  {Arr|Object}   elements
 * @param  {Function}     callback
 * @return {Arr|Object}
 */
 function map(elements, callback) {
    var value, values = [],
        i, key;

    // 数组，或者对象数组
    if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
            // 遍历，经过 callback 验证，push到结果中
            value = callback(elements[i], i);
            if (value != null) values.push(value);
        }

    // 对象
    else
        for (key in elements) {
            // 遍历，经过 callback 验证，push到结果中
            value = callback(elements[key], key);
            if (value != null) values.push(value);
        }

    // 作用：无论 values 是否是数组，都将返回一个正确的数组。例如，传入 'abc' ，返回 ['abc']
    return values.length > 0 ? emptyArray.concat.apply([], values) : values;

}

/**
 * 数组去重
 * @param  {Array} array
 * @return {Array}
 */
 function uniq(array) {
    return [].filter.call(array, function(item, idx) {
        return array.indexOf(item) == idx;
    });
}

/**
 *  返回一个元素的子元素，数组形式
 * @param  {element} element
 * @return {Arr}
 */
 function children(element) {

    // 有些浏览器支持 elem.children 获取子元素，有些不支持
    return 'children' in element ?

        // 上文定义 slice = [].slice
        // slice.call(likeArr) 可以将对象数组转换为真正的数组
        [].slice.call(element.children) :

        // 浏览器不支持 elem.children 只能通过 elem.childNodes 获取子元素
        // 只去 node.nodeType == 1 的子元素，通过 $.map 拼接成数组
        // $.map 下文定义的， $.map = function (elements, callback) {....}
        // $.map 作用：针对 elements（对象数组或数组），对每个元素都经过 callback 函数的过滤，并将过滤通过的元素，push到一个新数组中，返回新数组
        map(element.childNodes, function(node) {
            if (node.nodeType == 1) return node;
        });
}
/**
 *  获取元素节点的 本人默认的display 属性
 * @param  {Element} nodeName
 * @return {display.name}
 */
 function defaultDisplay(nodeName) {
    var element, display;
    //看看缓存里面有没有    如果有就用缓存已经取到的 没有就重新取
    if (!elementDisplay[nodeName]) {
        // 创建一个 同样的元素检点
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        // 获取它的默认的 display 样式信息。
        display = getComputedStyle(element, '').getPropertyValue("display");

        // 接着马上移除元素！！！
        element.parentNode.removeChild(element);
        // 'none' 换成 'block'，另外还可能是 'inline' 'inline-block' 'table' 等等...
        display == "none" && (display = "block");
        // 存储下来

        elementDisplay[nodeName] = display;
    }

    // 最终返回 display 结果
    return elementDisplay[nodeName];
}

/**
 * 看看传入的是函数就获得执行函数的返回值  如果是字符串就直接返回字符串
 * @param  {context} context 执行环境
 * @param  {Fn|String} arg
 * @param  {index} idx
 * @param  {payload} payload
 * @return {string}
 */
 function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}




/**
 *  将字符串变成响应的对象或者值，例如源代码的注释：
 * @param  {type} value
 * @return {type}
 *  "true"  => true
 *  "false" => false
 *  "null"  => null
 *  "42"    => 42
 *  "42.5"  => 42.5
 *  "08"    => "08"
 *  JSON    => parse if valid
 *  String  => self
 */
  function deserializeValue(value) {
    try {
        return value ?

            // value『有值』的情况：
            value == "true" || // 如果 value == 'true'，那么这个表达式本身就返回 true ，导致整个函数返回true

            // value !== 'true' 的情况：
            (
                value == "false" ? false : // "null"  => null
                value == "null" ? null : // "null"  => null
                +value + "" == value ? +value : // 数字："42" => 42  "42.5" => 42.5  （ 但是 '08' 却不符合这个条件 ）
                /^[\[\{]/.test(value) ? $.parseJSON(value) : // '[...]' 或者 '{...}'
                value // 其他
            )

        // value『无值』的情况： undefined / '' / flase / 0 / null
        : value;
    } catch (e) {
        return value;
    }
}

/**
 * 获取元素节点的或者SVG节点的 class 或者是设置
 * @param  {Element} node
 * @param  {String} value
 * @return {String}
 */
 function className(node, value) {
    var klass = node.className || '',
        svg = klass && klass.baseVal !== undefined;

    // 获取
    if (value === undefined) return svg ? klass.baseVal : klass;
    // 设置
    svg ? (klass.baseVal = value) : (node.className = value);
}





var util = Object.create(null);

util.isFunction = isFunction;
util.isDocument = isDocument;
util.isArray = isArray;
util.isObject = isObject;
util.isPlainObject = isPlainObject;
util.isWindow = isWindow;
util.likeArray = likeArray;
util.compact = compact;
util.extend = extend;
util.camelize = camelize;
util.isEmptyObject = isEmptyObject;
util.inArray = inArray;
util.map = map;
util.uniq = uniq;
util.type = type;
util.children = children;
util.defaultDisplay = defaultDisplay;
util.funcArg = funcArg;
util.deserializeValue = deserializeValue;
util.dasherize = dasherize;
util.className = className;
util.maybeAddPx = maybeAddPx;

module.exports = util;
