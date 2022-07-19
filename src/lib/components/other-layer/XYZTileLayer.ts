/*
 * @Description: XYZ图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:54:48
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Tile as TileLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'

class XYZTileLayer extends BaseLayer {
  layer: any;
  constructor (options: BaseLayerOptions) {
    const { data } = options
    super(options)
    this.init(data as string)
  }
  // 初始化图层
  init (data:string) {
    this.layer = new TileLayer({
      source: new XYZ({
        url: data
      })
    })
  }

  getLayer () {
    return this.layer
  }

}
export default XYZTileLayer