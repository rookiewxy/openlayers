import { ReactElement } from "react";

/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-21 11:32:46
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 14:01:07
 */
class CanvasLayer {
  canvas: any;
  ctx: any;
  timeoutID: any;
  options: any;
  zIndex: number | undefined;
  paneName: string;
  _lastDrawTime: any;
  _map: any;
  constructor (options:any) {
    this.options = options || {};
    this.paneName = this.options.paneName || 'labelPane';
    this.zIndex = this.options.zIndex || 0;
    this._map = options.map;
    this._lastDrawTime = null;
    this.show();
  }

  initialize () {
    const canvas = this.canvas = document.createElement('canvas');
    const ctx = this.ctx = this.canvas.getContext('2d');
    canvas.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;' + 'z-index:' + this.zIndex + ';';
    this.adjustSize();
    this.adjustRatio(ctx);
    this._map.getViewport().appendChild(canvas);
    const that = this;
    this._map.getView().on('propertychange',function(){
      //   $(canvas).hide();
    });
    this._map.on("moveend",function(){
      //   $(canvas).show();
        that.adjustSize();
        that._draw();
    });
    return this.canvas;
  }

  adjustSize () {
    const size = this._map.getSize();
    const canvas = this.canvas;
    canvas.width = size[0];
    canvas.height = size[1];
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
  }

  adjustRatio (ctx:any) {
    const backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    const pixelRatio = (window.devicePixelRatio || 1) / backingStore;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.canvas.width = canvasWidth * pixelRatio;
    ctx.canvas.height = canvasHeight * pixelRatio;
    ctx.canvas.style.width = canvasWidth + 'px';
    ctx.canvas.style.height = canvasHeight + 'px';
    ctx.scale(pixelRatio, pixelRatio);
  }

  draw () {
    const self = this;
    const args = arguments;
    clearTimeout(self.timeoutID);
    self.timeoutID = setTimeout(function () {
        self._draw();
    }, 15);
  }

  _draw () {
    const map = this._map;
    const size = map.getSize();
    const center = map.getView().getCenter();
    if (center) {
        const pixel = map.getPixelFromCoordinate(center);
        this.canvas.style.left = pixel[0] - size[0] / 2 + 'px';
        this.canvas.style.top = pixel[1] - size[1] / 2 + 'px';
        this.options.update && this.options.update.call(this);
    }
  }

  getContainer () {
    return this.canvas
  }

  show () {
    this.initialize();
    this.canvas.style.display = 'block';
  }

  hide () {
    this.canvas.style.display = 'none';
  }

  setZIndex (zIndex:number) {
    this.canvas.style.zIndex = zIndex;
  }

  getZIndex () {
    return this.zIndex;
  }
}
export default CanvasLayer