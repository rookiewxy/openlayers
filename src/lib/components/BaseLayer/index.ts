/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 10:55:54
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 16:09:26
 */
import { guid } from '../../../utils/guid'
export interface BaseLayerOptions {
  data?: string | any[];
  show?: boolean;
  minZoom?: number;
  maxZoom?: number;
  opacity?: number;
  id?: number | string;
}

class BaseLayer {
  data?: string | any[];
  show?: boolean;
  minZoom?: number;
  maxZoom?: number;
  opacity?: number;
  id?: string | number;
  constructor (options:BaseLayerOptions) {
    const {data, show, minZoom, maxZoom, opacity, id} = options
    this.data = data
    this.show = show
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this.opacity = opacity
    this.id = id || guid()
  }

  setData (data:any) {
  }
}
export default BaseLayer