/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:56:31
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import TileLayer from 'ol/layer/Tile'
import TileArcGISRest from 'ol/source/TileArcGISRest'

class ArcGISRestLayer extends BaseLayer {
  layer: any;
  constructor (options: BaseLayerOptions) {
    const { data } = options
    super(options)
    this.init(data as string)
  }
  
  init (data:string) {
    this.layer = new TileLayer({
      source: new TileArcGISRest({
        url: data
      })
    })
  }
  getLayer () {
    return this.layer
  }
}
export default ArcGISRestLayer