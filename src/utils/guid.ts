/*
 * @Description: 生产随机guid
 * @Autor: ljw
 * @Date: 2022-07-21 16:07:57
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 16:08:00
 */
export const guid = () => {
  const template ='xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  return template.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}