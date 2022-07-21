/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-20 13:57:37
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-20 15:05:50
 */
import deepCopy from "./deepCopy";
/**
 * 图层类的属性定义
 * @param classInstance 类
 * @param props 添加属性
 * @param options 默认值
 * @param setFunction setter方法
 */
export const definedProperties = (classInstance, props, options, setFunction) => {
    const propNames = Object.getOwnPropertyNames(props);
    propNames.forEach(name => {
        Object.defineProperties(classInstance, {
            [`_${name}`]: { value: options[name], writable: true },
            [name]: {
                get: function () {
                    return classInstance?.[`_${name}`]
                },
                set: function (v) {
                    classInstance[`_${name}`] = v
                    setFunction(name, v, classInstance)
                }
            }
        })
    })
}
