/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-21 11:40:53
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 14:09:12
 */
class MarkLine {
  from: any;
  to: any;
  id: string;
  step: number;
  path:any;
  _map: any;
  options: any;
  constructor (opts:any) {
    this.from = opts.from;
    this.to = opts.to;
    this.id = opts.id;
    this.step = 0;
    this._map = opts.map
    this.options = opts.options
  }

  getPointList(from:any, to:any) {
    let points = [[from[0], from[1]], [to[0], to[1]]];
    const ex = points[1][0];
    const ey = points[1][1];
    points[3] = [ex, ey];
    points[1] = this.getOffsetPoint(points[0], points[3]);
    points[2] = this.getOffsetPoint(points[3], points[0]);
    points = this.smoothSpline(points, false);
    //修正最后一点在插值产生的偏移
    points[points.length - 1] = [ex, ey];
    return points;
  }

  getOffsetPoint (start:number[],end:number[]) {
    const distance = this.getDistance(start, end) / 3; //除以3？
    let angle, dX, dY;
    const mp = [start[0], start[1]];
    const deltaAngle = -0.2; //偏移0.2弧度
    if (start[0] != end[0] && start[1] != end[1]) {
        //斜率存在
        const k = (end[1] - start[1]) / (end[0] - start[0]);
        angle = Math.atan(k);
    } else if (start[0] == end[0]) {
        //垂直线
        angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
    } else {
        //水平线
        angle = 0;
    }
    if (start[0] <= end[0]) {
        angle -= deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] += dX;
        mp[1] += dY;
    } else {
        angle += deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] -= dX;
        mp[1] -= dY;
    }
    return mp;
  }

  smoothSpline (points: any, isLoop: any) {
    var len = points.length;
    var ret = [];
    var distance = 0;
    for (var i = 1; i < len; i++) {
        distance += this.getDistance(points[i - 1], points[i]);
    }
    var segs = distance / 2;
    segs = segs < len ? len : segs;
    for (var i = 0; i < segs; i++) {
        var pos = i / (segs - 1) * (isLoop ? len : len - 1);
        var idx = Math.floor(pos);
        var w = pos - idx;
        var p0;
        var p1 = points[idx % len];
        var p2;
        var p3;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len - 2 ? len - 1 : idx + 1];
            p3 = points[idx > len - 3 ? len - 1 : idx + 2];
        } else {
            p0 = points[(idx - 1 + len) % len];
            p2 = points[(idx + 1) % len];
            p3 = points[(idx + 2) % len];
        }
        var w2 = w * w;
        var w3 = w * w2;

        ret.push([this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
    }
    return ret;
  }

  interpolate (p0:number, p1:number, p2:number, p3:number, t:number, t2:number, t3:number) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
  }

  getDistance (p1:number[], p2:number[]) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  }

  drawMarker (context:any) {
    this.from.draw(context);
    this.to.draw(context);
  }

  drawLinePath (context:any) {
    var pointList = this.path = this.getPointList(this._map.getPixelFromCoordinate(this.from.location), this._map.getPixelFromCoordinate(this.to.location));
    var len = pointList.length;
    context.save();
    context.beginPath();
    context.lineWidth = this.options.lineWidth;
    context.strokeStyle = this.options.colors[this.id as any];

    if (!this.options.lineType || this.options.lineType == 'solid') {
        context.moveTo(pointList[0][0], pointList[0][1]);
        for (var i = 0; i < len; i++) {
            context.lineTo(pointList[i][0], pointList[i][1]);
        }
    } else if (this.options.lineType == 'dashed' || this.options.lineType == 'dotted') {
        for (var i = 1; i < len; i += 2) {
            context.moveTo(pointList[i - 1][0], pointList[i - 1][1]);
            context.lineTo(pointList[i][0], pointList[i][1]);
        }
    }
    context.stroke();
    context.restore();
    this.step = 0; //缩放地图时重新绘制动画
  }

  drawMoveCircle (context:any) {
    var pointList = this.path || this.getPointList(this._map.getPixelFromCoordinate(this.from.location), this._map.getPixelFromCoordinate(this.to.location));

    context.save();
    context.fillStyle = this.options.fillColor;
    context.shadowColor = this.options.shadowColor;
    context.shadowBlur = this.options.shadowBlur;
    context.beginPath();
    context.arc(pointList[this.step][0], pointList[this.step][1], this.options.moveRadius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    context.restore();
    this.step += 1;
    if (this.step >= pointList.length) {
        this.step = 0;
    }
  }
}
export default MarkLine