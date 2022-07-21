/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-21 11:51:23
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 14:08:59
 */

class Marker {
  city: string;
  location: string;
  color: string;
  pixel:any;
  _map: any;
  options: any;
  constructor (opts:any) {
    this.city = opts.city;
    this.location = opts.location;
    this.color = opts.color;
    this._map = opts.map
    this.options = opts.options
    
  }

  draw (context:any) {
    const pixel = this.pixel = this._map.getPixelFromCoordinate(this.location);

    context.save();
    context.beginPath();
    context.fillStyle = this.options.markerColor || this.color;
    context.arc(pixel[0], pixel[1], this.options.markerRadius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '12px Microsoft YaHei';
    context.fillStyle = this.color;
    context.fillText(this.city, pixel[0], pixel[1] - 10);
    context.restore();
  }
}
export default Marker