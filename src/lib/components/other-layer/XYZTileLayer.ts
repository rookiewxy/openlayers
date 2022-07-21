/*
 * @Description: XYZ图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 09:39:19
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Tile as TileLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
import { commomProps } from "../../defaultProps";
import { definedProperties } from '../../../utils/PropertyDescriptor'

const defaultProps = {
  ...commomProps
}
class XYZTileLayer extends BaseLayer {
  _layer: any;
  _source: any;
  constructor (options: BaseLayerOptions) {
    super(options)
    this.init(options)
  }
  // 初始化图层
  init (options:BaseLayerOptions) {
    const { data, show, minZoom, maxZoom, opacity } = options
    // 保存source
    this._source = new XYZ({
      url: data as string
    })
    // 图层
    this._layer = new TileLayer({
      source: this._source,
      visible: show,
      minZoom,
      maxZoom,
      opacity,
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
        case 'data':
          value && this._source.setUrl(value)
          break;
      
        default:
          break;
      }
    })

  }
  // 设置XYZ数据
  setData (data: string) {
    data && this._source.setUrl(data)
  }
  // 获取图层
  getLayer () {
    return this._layer
  }

}
export default XYZTileLayer