/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 10:50:40
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 17:58:15
 */
import Map from "./components/map";
import BaseLayer from "./components/BaseLayer";
import LayerCollection from "./components/LayerCollection";
import {
  XYZTileLayer,
  ArcGISRestLayer,
  WMTSLayer,
  PointLayer,
  HeatmapLayer,
  ODLineLayer,
  GeoJSONLayer
} from './components/other-layer'
const XTOL = {
  Map,
  BaseLayer,
  LayerCollection,
  XYZTileLayer,
  ArcGISRestLayer,
  WMTSLayer,
  PointLayer,
  HeatmapLayer,
  ODLineLayer,
  GeoJSONLayer
}
export default XTOL