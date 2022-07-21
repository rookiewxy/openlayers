/*
 * @Description: 图层管理类
 * @Autor: ljw
 * @Date: 2022-07-19 10:55:51
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 16:14:44
 */
import { Map as OlMap } from 'ol'
class LayerCollection {
  _map: OlMap;
  _layers: any[] | undefined;
  constructor (options:any) {
    this._map = options
    this._layers = []
  }
  // 添加图层
  add (layer:any) {
    this._layers?.push(layer)
    if (layer.type === 'ODLine') { // ODLine图层与其他图层不同，单独设置添加创建方法
      layer.addLayer(this._map)
      return
    }
    if ('_layer' in layer) {
      this._map.addLayer(layer.getLayer() || [])
    } else {
      this._map.addLayer(layer)
    }
  }
  // 删除图层
  remove (layer:any) {
    if (layer.type === 'ODLine') { // ODLine图层与其他图层不同，单独设置删除方法
      layer.removeLayer(this._map)
      return
    }
    if ('_layer' in layer) {
      this._map.removeLayer(layer.getLayer() || [])
    } else {
      this._map.removeLayer(layer)
    }
  }
  // 根据id获取图层
  getLayerById (id:string|number) {
    // const layers = this._map.getLayers()
    // console.log(layers, this._layers);
    const layer = this._layers?.find(e => e.id === id)
    return layer
  }
}
export default LayerCollection