/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:25:56
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Fill, Stroke, Text, Image, Style } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import {Vector as VectorLayer} from 'ol/layer';
import { Feature } from "ol";
import { Point } from "ol/geom";


interface PointLayerOptions extends BaseLayerOptions  {
  fill: Fill;
  image: Image;
  stroke: Stroke;
  text: Text;
}

class PointLayer extends BaseLayer {
  layer:any;
  constructor (options: PointLayerOptions) {
    super(options)
    this.init(options)
  }

  init (options: PointLayerOptions) {
    const { fill, image, stroke, text } = options
    this.layer = new VectorLayer({
      style: new Style({
        image,
        fill,
        stroke,
        text
      }),
      source: new VectorSource({
        features: [new Feature(new Point([0, 0]))]
      })
    })
  }
}
export default PointLayer