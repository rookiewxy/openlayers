/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 10:48:55
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-21 17:56:29
 */
import React, { useEffect, useState, useRef } from 'react';
import XT from './lib';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import geojson from './geo.json'
import MoveLine from './moveline';
import './App.css';
import XTOL from './lib';
const osm = new TileLayer({
  source: new OSM()
})
let map:any
function App() {
  // let [map, setMap] = useState<any>()
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    if (map) return
    map = new XT.Map('app',{
      center: [120, 30],
      zoom: 5,
      // layers: [osm]
    })
    // setMap(newMap)
    // console.log(newMap);

  }, [ref.current])
  const layer = new XT.ODLineLayer({
    //marker点半径
    markerRadius: 2,
    //marker点颜色,为空或null则默认取线条颜色
    markerColor: undefined,
    //线条类型 solid、dashed、dotted
    lineType: 'solid',
    //线条宽度
    lineWidth: 2,
    //线条颜色
    colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
    //移动点半径
    moveRadius: 3,
    //移动点颜色
    fillColor: '#fff',
    //移动点阴影颜色
    shadowColor: '#fff',
    //移动点阴影大小
    shadowBlur: 6,
    data: [{
      from: {
          city: '广州',
          lnglat: [113.270793, 23.135308]
      },
      to: {
          city: '衡山',
          lnglat: [112.612787, 27.317599]
      }
  }, {
    from: {
        city: '杭州',
        lnglat: [120, 30]
    },
    to: {
        city: '衡山',
        lnglat: [112.612787, 27.317599]
    }
}]
})
  const addLayer = () => {
    map.layers.add(layer)
    map.layers.add(new XT.GeoJSONLayer({
      data: JSON.stringify(geojson)
    }))
    console.log(layer);
    
    
  }
  const removeLayer = () => {
    map.layers.remove(layer)
  }
  
  const editLayer = () => {
    layer.setData([{
      from: {
        city: '杭州',
        lnglat: [120, 30]
      },
      to: {
        city: '衡山',
        lnglat: [112.612787, 27.317599]
      }
    }])
    layer.fillColor = 'red'
    layer.lineType = 'dashed'
  }

  const getLayer = () => {
    const newLayer = map.layers.getLayerById(layer.id)
    console.log(newLayer);
    
  }
  return (
    <>
      <div ref={ref as any} id="app" style={{width: 1000, height: 600}}>
      <button onClick={getLayer}>获得图层</button>
      <button onClick={addLayer}>添加图层</button>
      <button onClick={removeLayer}>删除图层</button>
      <button onClick={editLayer}>修改</button>
      </div>
    </>
  );
}

export default App;
