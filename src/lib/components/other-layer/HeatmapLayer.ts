/*
 * @Description: Heatmap热力图图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 10:39:45
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Heatmap } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { commomProps } from "../../defaultProps";
import { definedProperties } from '../../../utils/PropertyDescriptor'

interface HeatmapLayerOptions extends BaseLayerOptions {
  gradient: string[];
  radius: number;
  blur: number;
}
const defaultProps = {
  ...commomProps,
  data: { type: 'array', value: []},
  gradient: { type: 'arrray', value: []},
  radius: { type: 'number', value: 10},
  blur: { type: 'number', value: 0},
}
class HeatmapLayer extends BaseLayer {
  _layer:any;
  _source:any;
  gradient:string[];
  radius:number;
  blur:number;
  constructor (options: HeatmapLayerOptions) {
    const { gradient, radius, blur } = options
    super(options)
    this.gradient = gradient
    this.radius = radius
    this.blur = blur
    this.init(options)
  }

  init(options: HeatmapLayerOptions) {
    const { gradient, radius, blur, data } = options
    this._source = new VectorSource({
      url: data as string
    })
    this._layer = new Heatmap({
      source: this._source,
      blur,
      radius,
      gradient
    })
    // 设置各个属性值
    definedProperties(this, defaultProps, options, (name:string, value:any, classInstance:any) => {
      switch (name) {
        case 'show':
          typeof value === 'boolean' && this._layer.setVisible(value)
          break;
        case 'opacity':
          typeof value === 'number' && this._layer.setOpacity(value)
          break;
        case 'minZoom':
          typeof value === 'number' && this._layer.setMinZoom(value)
          break;
        case 'maxZoom':
          typeof value === 'number' && this._layer.setMaxZoom(value)
          break;
        case 'gradient':
          value && this._layer.setGradient(value)
          break;
        case 'radius':
          typeof value === 'number' && this._layer.setRadius(value)
          break;
        case 'blur':
          typeof value === 'number' && this._layer.setBlur(value)
          break;
        case 'data':
          this._source.setUrl(value)
          break;
      
        default:
          break;
      }
    })
  }

  // 设置Heatmap数据
  setData (data: string) {
    data && this._source.setUrl(data)
  }
  // 获取图层
  getLayer () {
    return this._layer
  }
}
export default HeatmapLayer