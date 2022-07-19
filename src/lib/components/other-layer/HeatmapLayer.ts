/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:55:26
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Heatmap } from 'ol/layer';
import VectorSource from 'ol/source/Vector';

interface HeatmapLayerOptions extends BaseLayerOptions {
  gradient: string[];
  radius: number;
  blur: number;
}
class HeatmapLayer extends BaseLayer {
  layer:any;
  constructor (options: HeatmapLayerOptions) {
    super(options)
    this.init(options)
  }

  init(options: HeatmapLayerOptions) {
    const { gradient, radius, blur, data } = options
    this.layer = new Heatmap({
      source: new VectorSource({
        url: data as string
      }),
      blur,
      radius,
      gradient
    })
  }
}
export default HeatmapLayer