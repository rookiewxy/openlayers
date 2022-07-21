/*
 * @Description: ODLine图层
 * @Autor: ljw
 * @Date: 2022-07-21 14:25:48
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 15:55:00
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import MoveLine from "../../../moveline"
import { commomProps } from "../../defaultProps";
import { definedProperties } from '../../../utils/PropertyDescriptor'

const defaultProps = {
  ...commomProps,
  data: { type: 'array', value: []},
  markerRadius: { type: 'number', value: 0},
  markerColor: { type: 'string', value: ''},
  lineType: { type: 'string', value: 'solid'},
  lineWidth: { type: 'number', value: 1},
  colors: { type: 'array', value: []},
  moveRadius: { type: 'number', value: 0},
  fillColor: { type: 'string', value: ''},
  shadowColor: { type: 'string', value: ''},
  shadowBlur: { type: 'number', value: 0},
}
type LineType = 
  'solid' |
  'dashed'|
  'dotted'

interface ODLineLayerOptions extends BaseLayerOptions  {
  markerRadius?: number;
  markerColor?: string;
  lineType?: LineType;
  lineWidth?: number;
  colors?: string[];
  moveRadius?: number;
  fillColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
}
class ODLineLayer extends BaseLayer {
  _layer: any;
  _source: any;
  markerRadius?: number;
  markerColor?: string;
  lineType?: LineType;
  lineWidth?: number;
  colors?: string[];
  moveRadius?: number;
  fillColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
  _map: any;
  options: ODLineLayerOptions;
  type = 'ODLine'

  constructor (options:ODLineLayerOptions) {
    const { markerRadius, markerColor, lineType, lineWidth, colors, moveRadius, fillColor, shadowColor, shadowBlur } = options

    super(options)
    
    this.markerRadius = markerRadius
    this.markerColor = markerColor
    this.lineType = lineType
    this.lineWidth = lineWidth
    this.colors = colors
    this.moveRadius = moveRadius
    this.fillColor = fillColor
    this.shadowColor = shadowColor
    this.shadowBlur = shadowBlur
    this.options = options
    // 设置各个属性值
    definedProperties(this, defaultProps, options, (name:string, value:any, classInstance:any) => {
      this._layer.options[name] = value
    })
  }

  // ODLine图层与其他图层不同，单独设置添加创建方法
  addLayer (map:any) {
    this._layer = new MoveLine(map, this.options)
  }
  removeLayer (map:any) {
    this._layer.destory()
  }

  setData(data: any) {
    this._layer.options['data'] = data
  }
  // 返回图层
  getLayer () {
    return this._layer
  }
}
export default ODLineLayer