/*
 * @Description: 图层管理类
 * @Autor: ljw
 * @Date: 2022-07-19 10:55:51
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:13:20
 */
import { Map as OlMap } from 'ol'
class LayerCollection {
  _map: OlMap;
  constructor (options:any) {
    this._map = options
  }
  // 添加图层
  add (layer:any) {
    if ('layer' in layer) {
      this._map.addLayer(layer.getLayer() || [])
    } else {
      this._map.addLayer(layer)
    }
  }
  // 删除图层
  remove (layer:any) {
    if ('layer' in layer) {
      this._map.removeLayer(layer.getLayer() || [])
    } else {
      this._map.removeLayer(layer)
    }
  }
  // 根据id获取图层
  getLayerById (id:string|number) {
    const layers = this._map.getLayers()
    console.log(layers);
    
    return this._map.getLayers()
  }
}
export default LayerCollection