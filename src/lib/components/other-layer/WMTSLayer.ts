/*
 * @Description: WMTS图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 09:35:51
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Tile as TileLayer } from 'ol/layer';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTS from 'ol/source/WMTS'
import { definedProperties } from '../../../utils/PropertyDescriptor'
import { commomProps } from "../../defaultProps";
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';

interface WMTSLayerOptions extends BaseLayerOptions  {
  layer: string;
  matrixSet: string;
  format?: string;
  style: string;
  version?: string;
}
const defaultProps = {
  ...commomProps,
  layer: { type: 'string', value: ''},
  matrixSet: { type: 'string', value: ''},
  format: { type: 'string', value: ''},
  style: { type: 'string', value: ''},
  version: { type: 'string', value: ''},
}
class WMTSLayer extends BaseLayer {
  _layer: any;
  _source: any;
  layer: string;
  matrixSet: string;
  format?: string;
  style: string;
  version?: string;
  constructor (options: WMTSLayerOptions) {
    const { layer, matrixSet, format, style, version } = options
    super(options)
    this.layer = layer
    this.matrixSet = matrixSet
    this.format = format
    this.style = style
    this.version = version
    this.init(options)
  }

  init (options: WMTSLayerOptions) {
    const { data, opacity, show, minZoom, maxZoom, layer, matrixSet, format, style, version } = options
    
    const projection:any = getProjection('EPSG:3857');
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }
    // 保存source
    this._source = new WMTS({
      projection,
      attributions:
      'Tiles © <a href="https://mrdata.usgs.gov/geology/state/"' +
      ' target="_blank">USGS</a>',
      url: data as string,
      layer,
      matrixSet,
      format,
      style,
      version,
      tileGrid: new WMTSTileGrid({
        resolutions: [],
        matrixIds: [],
      }),
      wrapX: true
    })
    // 图层
    this._layer = new TileLayer({
      opacity,
      visible: show,
      minZoom,
      maxZoom,
      source: this._source
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
  // 设置WMTS数据
  setData (data:string) {
    this._source.setUrl(data)
  }
  // 获取图层
  getLayer () {
    return this.layer
  }
}
export default WMTSLayer