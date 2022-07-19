/*
 * @Description: 地图主类
 * @Autor: ljw
 * @Date: 2022-07-19 10:51:25
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 18:33:10
 */
import LayerCollection from "../LayerCollection";
import { Map as OlMap, View } from "ol";
interface MapOptions {
  center: number[];
  minZoom?: number;
  maxZoom?: number;
  zoom: number;
  target: string;
  layers?: any[];
}
class Map {
  layers?: LayerCollection;
  center: number[];
  minZoom?: number;
  maxZoom?: number;
  zoom: number;
  map: OlMap | null;
  constructor (options:MapOptions) {
    const { center, minZoom, maxZoom, zoom, target, layers } = options
    this.center = center
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this.zoom = zoom
    this.map = new OlMap({
      target,
      view: new View({
        // projection: 'EPSG:4326',
        center,
        zoom,
      }),
    })
    const layerCollection = new LayerCollection(this.map)
    layers?.forEach((e => {
      layerCollection.add(e)
    }))
    this.layers = layerCollection
  }

  destory () {
    this.map = null
  }
}
export default Map