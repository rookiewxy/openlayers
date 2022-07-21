/*
 * @Description: ODLine图层
 * @Autor: ljw
 * @Date: 2022-07-19 11:12:45
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 14:19:14
 */
import BaseLayer, { BaseLayerOptions } from "../../BaseLayer";
import { commomProps } from "../../../defaultProps";
import { definedProperties } from '../../../../utils/PropertyDescriptor'
import CanvasLayer from "./CanvasLayer";
import Marker from "./Marker";
import MarkLine from "./MarkLine";

const global = window;

const requestAnimationFrame = global.requestAnimationFrame || function (callback: any) {
    return global.setTimeout(callback, 1000 / 60);
};

const defaultProps = {
  ...commomProps,
  data: { type: 'array', value: []},
  markerRadius: { type: 'number', value: 0},
  markerColor: { type: 'string', value: ''},
  lineType: { type: 'string', value: 'solid'},
  lineWidth: { type: 'number', value: 1},
  colors: { type: 'array', value: []},
  moveRadius: { type: 'number', value: 0},
  fillColor: { type: 'string', value: ''},
  shadowColor: { type: 'string', value: ''},
  shadowBlur: { type: 'number', value: 0},
}
const options = {
  //marker点半径
  markerRadius: 3,
  //marker点颜色,为空或null则默认取线条颜色
  markerColor: '#fff',
  //线条类型 solid、dashed、dotted
  lineType: 'solid',
  //线条宽度
  lineWidth: 1,
  //线条颜色
  colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
  //移动点半径
  moveRadius: 2,
  //移动点颜色
  fillColor: '#fff',
  //移动点阴影颜色
  shadowColor: '#fff',
  //移动点阴影大小
  shadowBlur: 5,
  data: []
};

type LineType = 
  'solid' |
  'dashed'|
  'dotted'

interface ODLineLayerOptions extends BaseLayerOptions  {
  markerRadius?: number;
  markerColor?: string;
  lineType?: LineType;
  lineWidth?: number;
  colors?: string[];
  moveRadius?: number;
  fillColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
}
//全局变量
let baseLayer:any,
animationLayer:any,
width: any,
height: any,
animationFlag:boolean = true,
markLines:any[];

class ODLineLayer extends BaseLayer {
  _layer: any;
  _source: any;
  markerRadius?: number;
  markerColor?: string;
  lineType?: LineType;
  lineWidth?: number;
  colors?: string[];
  moveRadius?: number;
  fillColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
  _map: any;
  options: any;

  constructor (map:any, userOptions: ODLineLayerOptions) {
    const { markerRadius, markerColor, lineType, lineWidth, colors, moveRadius, fillColor, shadowColor, shadowBlur } = userOptions
    super(userOptions)
    this.markerRadius = markerRadius
    this.markerColor = markerColor
    this.lineType = lineType
    this.lineWidth = lineWidth
    this.colors = colors
    this.moveRadius = moveRadius
    this.fillColor = fillColor
    this.shadowColor = shadowColor
    this.shadowBlur = shadowBlur
    this.init(map, userOptions)
    this.options = options
    this._map = map
    width = map.getSize()[0]
    height = map.getSize()[1]
  }

  init (map:any, userOptions:ODLineLayerOptions) {
    const { markerRadius, markerColor, lineType, lineWidth, colors, moveRadius, fillColor, shadowColor, shadowBlur } = this.options
    this.merge(userOptions, options);

    baseLayer = new CanvasLayer({
        map: map,
        update: this.brush
    });

    animationLayer = new CanvasLayer({
        map: map,
        update: this.render
    });
    
    const that = this;
    (function drawFrame() {
        requestAnimationFrame(drawFrame);
        that.render();
    })();
  }

  // update (resetOpts:any) {
  //   for (var key in resetOpts) {
  //     this.options[key] = resetOpts[key];
  //   }
  // }

  render () {
    const animationCtx = animationLayer.canvas.getContext('2d');
    if (!animationCtx) {
        return;
    }

    if (!animationFlag) {
        animationCtx.clearRect(0, 0, width, height);
        return;
    }

    animationCtx.fillStyle = 'rgba(0,0,0,.93)';
    const prev = animationCtx.globalCompositeOperation;
    animationCtx.globalCompositeOperation = 'destination-in';
    animationCtx.fillRect(0, 0, width, height);
    animationCtx.globalCompositeOperation = prev;

    for (let i = 0; i < markLines.length; i++) {
        const markLine = markLines[i];
        markLine.drawMoveCircle(animationCtx); //移动圆点
    }
  }

  addMarkLine () {
    markLines = [];
    const that = this
    const dataset = this.options.data as any[];
    dataset.forEach(function (line:any, i:number) {
        markLines.push(new MarkLine({
            id: i,
            map: that._map,
            options: that.opacity,
            from: new Marker({
              map: that._map,
              options: that.opacity,
                city: line.from.city,
                location: [line.from.lnglat[0], line.from.lnglat[1]],
                color: that.options.colors[i]
            }),
            to: new Marker({
              map: that._map,
              options: that.opacity,
                city: line.to.city,
                location: [line.to.lnglat[0], line.to.lnglat[1]],
                color: that.options.colors[i]
            })
        }));
    });
  }

  brush () {
    var baseCtx = baseLayer.canvas.getContext('2d');
    if (!baseCtx) {
        return;
    }

    this.addMarkLine();

    baseCtx.clearRect(0, 0, width, height);

    markLines.forEach(function (line) {
        line.drawMarker(baseCtx);
        line.drawLinePath(baseCtx);
    });
  }

  //参数合并
  merge (userOptions:any, options:any) {
    Object.keys(userOptions).forEach(function (key) {
        options[key] = userOptions[key];
    });
  };
}
export default ODLineLayer
