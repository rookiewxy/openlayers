/**
 * 是否为Object类型
 */
export const isObject = (value) => {
    return Object.prototype.toString.call(value) === '[object Object]' && value.constructor.name === 'Object';
}

/**
 * 是否为Array类型
 */
export const isArray = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否为函数类型
 */
export const isFunction = (value) => {
    return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * 是否为Boolean类型
 * @param value 判断值
 */
export const isBoolean = (value) => {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}

/**
 * 是否为Number类型
 * @param value 判断值
 */
export const isNumber = (value) => {
    return Object.prototype.toString.call(value) === '[object Number]';
}

/**
 * 是否为字符串类型
 * @param value 判断值
 */
export const isString = (value) => {
    return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * 输出类型
 * @param value 输入值
 */
export const typeOf = (value) => {
    const str = Object.prototype.toString.call(value);
    if (str) {
        const strs = str.split(' ');
        if(isArray(strs) && strs[1]) {
            const type = strs[1].slice(0, strs[1].length - 1);
            return type.toLowerCase();
        }
    }
    return undefined;
}

/**
 * 判断绝对路径
 * @param url 网址
 */
export const isAbsolute = (url) => {
    return /(^[\/\\].*)|(.*:.*)/.test(url);
}
