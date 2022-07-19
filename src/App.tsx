/*
 * @Description: 
 * @Autor: ljw
 * @Date: 2022-07-19 10:48:55
 * @LastEditors: ljw
 * @LastEditTime: 2022-07-19 18:31:52
 */
import React, { useEffect, useState, useRef } from 'react';
import XT from './lib';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import geojson from './geo.json'
import './App.css';
const osm = new TileLayer({
  source: new OSM()
})
function App() {
  let [map, setMap] = useState<any>()
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    if (map) return
    console.log(map,'12');
    
    console.log(ref);
    const newMap = new XT.Map({
      target: 'app',
      center: [120, 30],
      zoom: 5,
      layers: [osm]
    })
    setMap(map = newMap)
    return () => {
      newMap.destory()
    }
  }, [ref.current])

  const XYZ = new XT.GeoJSONLayer({
    data: JSON.stringify(geojson),
    show: true,
    fill: {
      color: 'red'
    },
    image: {
      src: '',
      size: [],
      opacity: 1,
      rotation: 0,
      scale: 1
    },
    stroke: {
      color: 'red',
      width: 100
    },
    text: {
      font: '18px',
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      rotation: 0,
      text: '123'
    }
  })
  const addLayer = () => {
    map.layers.add(XYZ)
  }
  const removeLayer = () => {
    map.layers.remove(XYZ)
  }
  return (
    <>
      <div ref={ref as any} id="app" style={{width: 1000, height: 600}}>
      <button onClick={() => map.layers?.getLayerById('1')}>获得图层</button>
      <button onClick={addLayer}>添加图层</button>
      <button onClick={removeLayer}>删除图层</button>
      </div>
    </>
  );
}

export default App;
