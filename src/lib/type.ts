/*
 * @Description: 图层样式类型
 * @Autor: ljw
 * @Date: 2022-07-20 15:36:06
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-20 15:39:21
 */
export interface FillType {
  color?: string;
}
export interface ImageType {
  src: string;
  size?: Array<any>;
  opacity?: number;
  rotation?: number;
  scale?: number;
}
export interface StrokeType {
  color?: string;
  width?: number;
}
export interface TextType {
  font?: string;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  rotation?: number;
  text?: string;
}