/*
 * @Description: 地图主类
 * @Autor: ljw
 * @Date: 2022-07-19 10:51:25
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 16:11:04
 */
import LayerCollection from "../LayerCollection";
import { Map as OlMap, View } from "ol";
import { definedProperties } from '../../../utils/PropertyDescriptor'
import { guid } from "../../../utils/guid";
interface MapOptions {
  center: number[];
  minZoom?: number;
  maxZoom?: number;
  zoom: number;
  layers?: any[];
}

const defaultProps = {
  center: { type: 'array', value: []},
  layers: { type: 'any', value: []},
  minZoom: { type: 'number', value: []},
  maxZoom: { type: 'number', value: []},
  zoom: { type: 'number', value: []},
}
class Map {
  layers?: LayerCollection;
  center: number[];
  minZoom?: number;
  maxZoom?: number;
  zoom?: number;
  _map: OlMap | undefined;
  _view: View | undefined;
  constructor (target:string, options:MapOptions) {
    const { center, minZoom, maxZoom, zoom } = options
    this.center = center
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this.zoom = zoom
    this.init(target, options)
  }
  
  init (target:string, options: MapOptions) {
    const { center, minZoom, maxZoom, zoom, layers } = options
    this._view = new View({
      projection: 'EPSG:4326', // GeoJSON需要3857
      center,
      zoom,
      maxZoom,
      minZoom
    })
    this._map = new OlMap({
      target,
      view: this._view,
    })
    
    const layerCollection = new LayerCollection(this._map)
    layers?.forEach((e => {
      e.id = e.id || guid()
      layerCollection.add(e)
    }))
    this.layers = layerCollection

    // 设置各个属性值
    /* definedProperties(this, defaultProps, options, (name:string, value:any, classInstance:any) => {
      switch (name) {
        case 'center':
          value && this._view?.setCenter(value)
          break;
        case 'minZoom':
          typeof value === 'number' && this._view?.setMinZoom(value)
          break;
        case 'maxZoom':
          typeof value === 'number' && this._view?.setMaxZoom(value)
          break;
        case 'zoom':
          typeof value === 'number' && this._view?.setZoom(value)
          break;
      
        default:
          break;
      }
    }) */
  }

  getMap () {
    return this._map
  }

  destory () {
    this._map = undefined
  }
}
export default Map