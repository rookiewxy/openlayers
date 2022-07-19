/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 10:55:54
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:54:02
 */
export interface BaseLayerOptions {
  data: string | any[];
  show: boolean;
  minZoom?: number;
  maxZoom?: number;
  opacity?: number;
}

class BaseLayer {
  data: string | any[];
  show: boolean;
  minZoom?: number;
  maxZoom?: number;
  opacity?: number;
  constructor (options:BaseLayerOptions) {
    const {data, show, minZoom, maxZoom, opacity} = options
    this.data = data
    this.show = show
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this.opacity = opacity
  }

  setData () {
    
  }
}
export default BaseLayer