/*
 * @Description: Point点图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 10:39:30
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { Fill, Stroke, Text, Image, Style, Icon, Circle  } from 'ol/style'
import { FillType, ImageType, StrokeType, TextType } from "../../type";
import { commomProps } from "../../defaultProps";
import VectorSource from 'ol/source/Vector'
import {Vector as VectorLayer} from 'ol/layer';
import { Feature } from "ol";
import { Point } from "ol/geom";
import { definedProperties } from '../../../utils/PropertyDescriptor'


interface PointLayerOptions extends BaseLayerOptions  {
  fill?: FillType;
  image?: ImageType;
  stroke?: StrokeType;
  text?: TextType;
}
const defaultProps = {
  ...commomProps,
  data: { type: 'array', value: []},
  fill: { type: 'object', value: {}},
  image: { type: 'object', value: {}},
  stroke: { type: 'object', value: {}},
  text: { type: 'object', value: {}},
}
class PointLayer extends BaseLayer {
  _layer:any;
  _source: any;
  fill?: FillType;
  image?: ImageType;
  stroke?: StrokeType;
  text?: TextType;
  constructor (options: PointLayerOptions) {
    const { fill, image, stroke, text } = options
    super(options)
    this.fill = fill
    this.image = image
    this.stroke = stroke
    this.text = text
    this.init(options)
  }

  init (options: PointLayerOptions) {
    const { fill, image, stroke, text, data, show, minZoom, maxZoom, opacity } = options

    // 保存source以便后面修改feature操作
    this._source = new VectorSource({
      features: this.getFeatures(data as any[])
    })
    // 图层
    this._layer = new VectorLayer({
      style: new Style({
        ...image ? {image: new Icon(image)} : {},
        text: new Text({
          ...text,
          fill: new Fill(fill),
          stroke: new Stroke(stroke)
        })
      }),
      visible: show,
      minZoom,
      maxZoom,
      opacity,
      source: this._source
    })
    
    // 设置各个属性值
    definedProperties(this, defaultProps, options, (name:string, value:any, classInstance:any) => {
      const style = {
        ...classInstance.image ? {image: new Icon(classInstance.image)} : {},
        text: new Text({
          ...classInstance.text,
          fill: new Fill(classInstance.fill),
          stroke: new Stroke(classInstance.stroke)
        })
      }
      switch (name) {
        case 'show':
          typeof value === 'boolean' && this._layer.setVisible(value)
          break;
        case 'opacity':
          typeof value === 'number' && this._layer.setOpacity(value)
          break;
        case 'minZoom':
          typeof value === 'number' && this._layer.setMinZoom(value)
          break;
        case 'maxZoom':
          typeof value === 'number' && this._layer.setMaxZoom(value)
          break;
        case 'fill':
          this._layer.setStyle(new Style({
            ...style,
            text: new Text({
              ...classInstance.text,
              fill: new Fill(value),
              stroke: new Stroke(classInstance.stroke)
            })
          }))
          break;
        case 'image':
          this._layer.setStyle(new Style({
            ...style,
            ...value ? {image: new Icon(value)} : {},
          }))
          break;
        case 'stroke':
          this._layer.setStyle(new Style({
            ...style,
            text: new Text({
              ...classInstance.text,
              fill: new Fill(classInstance.fill),
              stroke: new Stroke(value)
            })
          }))
          break;
        case 'text':
          this._layer.setStyle(new Style({
            ...style,
            text: new Text({
              fill: new Fill(classInstance.fill),
              stroke: new Stroke(classInstance.stroke),
              ...value,
            })
          }))
          break;
        case 'data':
          const features = this.getFeatures(value)
          this._source.clear()
          this._source.addFeatures(features)
          break;
      
        default:
          break;
      }
    })
  }

  // 多点或单点
  getFeatures (points:any[]) {
    const isSecondArr = points.every(e => Array.isArray(e))
    const noSecondArr = points.every(e => !Array.isArray(e))
    if (isSecondArr) {
      return points.map(e => {
        const feature = new Feature({
          geometry: new Point(e as number[]),
        })
        return feature
      })
    }
    if (noSecondArr) {
        const feature = new Feature({
          geometry: new Point(points as number[]),
        })
        return [feature]
    }
  }
  
  // 设置Point数据
  setData (data: any[]) {
    const features = this.getFeatures(data as any[])
    this._source.clear()
    this._source.addFeatures(features)

  }
  // 获取图层
  getLayer () {
    return this._layer
  }
}
export default PointLayer