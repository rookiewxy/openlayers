/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 18:35:12
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Fill, Stroke, Text, Style } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector'
import {Vector as VectorLayer} from 'ol/layer';

interface GeoJSONLayerOptions extends BaseLayerOptions {
  fill: {
    color: string;
  };
  image: {
    src: string;
    size: Array<any>;
    opacity: number;
    rotation: number;
    scale: number;
  };
  stroke: {
    color: string;
    width: number;
  };
  text: {
    font: string;
    offsetX: number;
    offsetY: number;
    scale: number;
    rotation: number;
    text: string;
  };
}
class GeoJSONLayer extends BaseLayer {
  layer: any;
  constructor (options: GeoJSONLayerOptions) {
    super(options)
    this.init(options)
  }
  init (options:GeoJSONLayerOptions) {
    const { fill, image, stroke, text, data } = options
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(data as string)
      }),
      style: (feature) => this.styleFunction(feature, {
        fill: new Fill(fill),
        // image,
        stroke: new Stroke(stroke),
        text: new Text(text)
      })
    })
  }

  styleFunction (feature:any, styles:any) {
    console.log(feature, styles);
    
    const {fill, image, stroke, text } = styles
    const type = feature.getGeometry()?.getType()
    let style = {}
    switch (type) {
      case 'Point':
        style = {
          fill,
          image,
          stroke,
          text
        }
        break;
    
      case 'LineString':
        style = {
          stroke
        }
        break;
    
      case 'MultiLineString':
        style = {
          stroke
        }
        break;
    
      case 'Polygon':
        style = {
          fill,
          stroke,
        }
        break;
    
      case 'MultiPolygon':
        style = {
          fill,
          stroke,
        }
        break;
    
      default:
        break;
    }
    return new Style(style)
  }

  getLayer () {
    return this.layer
  }
}
export default GeoJSONLayer