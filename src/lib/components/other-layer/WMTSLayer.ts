/*
 * @Description: WMTS图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:55:05
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Tile as TileLayer } from 'ol/layer';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTS from 'ol/source/WMTS'

interface WMTSLayerOptions extends BaseLayerOptions  {
  layer: string;
  matrixSet: string;
  format: string;
  style: string;
  version: string;
}
class WMTSLayer extends BaseLayer {
  layer: any;
  constructor (options: WMTSLayerOptions) {
    super(options)
    this.init(options)
  }

  init (options: WMTSLayerOptions) {
    const { data, opacity, layer, matrixSet, format, style, version } = options
    this.layer = new TileLayer({
      opacity,
      source: new WMTS({
        url: data as string,
        layer,
        matrixSet,
        format,
        style,
        version,
        tileGrid: new WMTSTileGrid({
          resolutions: [],
          matrixIds: [],
        })
      })
    })
  }

  getLayer () {
    return this.layer
  }
}
export default WMTSLayer