/**
 * 深拷贝
 * @param obj 需要深拷贝对象
 */
export default function (obj) {
    return JSON.parse(JSON.stringify(obj));
}