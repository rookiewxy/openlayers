/*
 * @Description: GeoJSON突出
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 10:39:59
 */
import BaseLayer, { BaseLayerOptions } from "../BaseLayer";
import { FillType, ImageType, StrokeType, TextType } from "../../type";
import { commomProps } from "../../defaultProps";
import { Fill, Stroke, Text, Style, Icon } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector'
import { Vector as VectorLayer } from 'ol/layer';
import { definedProperties } from '../../../utils/PropertyDescriptor'
import { Feature } from "ol";

interface GeoJSONLayerOptions extends BaseLayerOptions {
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
class GeoJSONLayer extends BaseLayer {
  _layer: any;
  _source: any;
  fill?: FillType;
  image?: ImageType;
  stroke?: StrokeType;
  text?: TextType;
  constructor (options: GeoJSONLayerOptions) {
    const { fill, image, stroke, text } = options
    super(options)
    this.fill = fill
    this.image = image
    this.stroke = stroke
    this.text = text
    this.init(options)
  }

  // 初始化
  init (options:GeoJSONLayerOptions) {
    const { fill, image, stroke, text, data, show, minZoom, maxZoom, opacity } = options
    // 读取geoJSON数据
    const features = new GeoJSON().readFeatures(data)
    // 保存source
    this._source = new VectorSource({
      features: this.transform(features)
    })

    // 图层
    this._layer = new VectorLayer({
      source: this._source,
      visible: show,
      minZoom,
      maxZoom,
      opacity,
      style: (feature) => this.styleFunction(feature, {
        fill: new Fill(fill),
        ...image ? {image: new Icon(image)} : {},
        stroke: new Stroke(stroke),
        text: new Text(text)
      })
    })
    // 设置各个属性值
    definedProperties(this, defaultProps, options, (name:string, value:any, classInstance:any) => {
      const style = {
        ...classInstance.stroke ? {stroke: new Stroke(classInstance.stroke)} : {},
        ...classInstance.text ? {text: new Text(classInstance.text)} : {},
        ...classInstance.image ? {image: new Icon(classInstance.image)} : {},
        ...classInstance.fill ? {fill: new Fill(classInstance.fill)} : {},
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
          this._layer.setStyle((feat:Feature) => this.styleFunction(feat, {
            ...style,
            ...value ? {fill: new Fill(value)} : {}
          }))
          break;
        case 'image':
          this._layer.setStyle((feat:Feature) => this.styleFunction(feat, {
            ...style,
            ...value ? {image: new Icon(value)} : {}
          }))
          break;
        case 'stroke':
          this._layer.setStyle((feat:Feature) => this.styleFunction(feat, {
            ...style,
            ...value ? {stroke: new Stroke(value)} : {}
          }))
          break;
        case 'text':
          this._layer.setStyle((feat:Feature) => this.styleFunction(feat, {
            ...style,
            ...value ? {text: new Text(value)} : {}
          }))
          break;
        case 'data':
          // 读取geoJSON数据
          const features = new GeoJSON().readFeatures(value)
          this._source.clear()
          this._source.addFeatures(this.transform(features))
          // value && this._layer.setSource({
          //   source: new VectorSource({
          //     features: new GeoJSON().readFeatures(value)
          //   })
          // })
          break;
      
        default:
          break;
      }
    })
  }

  // 设置样式方法
  styleFunction (feature:any, styles:any) {
    const { fill, image, stroke, text } = styles
    const type = feature.getGeometry()?.getType()
    console.log(type);
    
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
  // 3857 转 4326
  transform (features:Feature[]) {
    features.forEach((e:Feature) => {
      const geometry = e.getGeometry()
      const newGeometry = geometry?.transform('EPSG:3857', 'EPSG:4326')
      e.setGeometry(newGeometry)
    })
    return features
  }

  // 设置GeoJSON数据
  setData (data: string) {
    // 读取geoJSON数据
    const features = new GeoJSON().readFeatures(data)
    this._source.clear()
    this._source.addFeatures(this.transform(features))
    // data && this._layer.setSource({
    //   source: new VectorSource({
    //     features: new GeoJSON().readFeatures(data)
    //   })
    // })
  }
  // 获取图层
  getLayer () {
    return this._layer
  }

}
export default GeoJSONLayer